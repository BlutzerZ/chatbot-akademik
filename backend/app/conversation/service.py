from sqlalchemy.orm import Session
from app.conversation import request, response, model
from password_generator import PasswordGenerator
import google.generativeai as genai
import os
from helper.role import is_admin, is_user
import json
import random
from app.conversation.model import Message
from app.conversation.model import GenerationLog
from uuid import UUID, uuid4
from sqlalchemy.exc import IntegrityError
from datetime import datetime

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

modelAiConfig = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)


class ConversationService:
    def __init__(self, session: Session):
        self.session = session

    def get_query_from_user_prompt(self, prompt):
        chat_session = modelAiConfig.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": [
                        f"Anda adalah chatbot akademik Universitas Dian Nuswantoro yang melayani mahasiswa. Jawablah pertanyaan mahasiswa di bawah. Pertanyaan mahasiswa: {prompt}"
                    ],
                }
            ]
        )
        response = chat_session.send_message(prompt)
        return response.text

    def generate_text_from_ai_model(
        self, message, conversation
    ) -> tuple[Exception, model.Message]:
        try:
            # staticAIResponse = "Loh Gak Bahaya Ta?"
            aiResponse = self.get_query_from_user_prompt(message).strip()

            newAssistantMessage = model.Message(
                role=model.RoleEnum.assistant,
                content=aiResponse,
                conversation_id=conversation.id,
            )
            self.session.add(newAssistantMessage)
            self.session.flush()

            # Tambahkan log ke `GenerationLog` dengan data kosong
            newGenerationLog = GenerationLog(
                message_id=newAssistantMessage.id,
                data=json.dumps({}),
            )
            self.session.add(newGenerationLog)

            self.session.commit()
            self.session.refresh(conversation)

            return None, newAssistantMessage
        except Exception as e:
            self.session.rollback()
            return e, []

    def get_all_conversations(self, jwtData, limit) -> list[model.Conversation]:
        try:
            conversations = (
                self.session.query(model.Conversation)
                .filter_by(user_id=jwtData["id"])
                .order_by(model.Conversation.updated_at.desc())
                .all()[:limit]
            )
            return None, conversations
        except Exception as e:
            return e, None

    def create_conversation(
        self, jwtData, message
    ) -> tuple[Exception, list[model.Message]]:
        # Try save message of user
        try:
            newConversation = model.Conversation(user_id=jwtData["id"])
            self.session.add(newConversation)
            self.session.flush()

            # User Message
            newMessage = model.Message(
                role=model.RoleEnum.user,
                content=message,
                conversation_id=newConversation.id,
            )
            self.session.add(newMessage)
            self.session.commit()
            self.session.refresh(newConversation)
        except Exception as e:
            self.session.rollback()
            return e, []

        # Generate AI response
        e, newAssistantMessage = self.generate_text_from_ai_model(
            message, newConversation
        )

        return e, [newMessage, newAssistantMessage]

    def get_conversation_by_id(
        self, jwtData, id
    ) -> tuple[Exception, list[model.Conversation]]:
        try:
            conversation = (
                self.session.query(model.Conversation)
                .filter(
                    model.Conversation.id == id,
                    model.Conversation.user_id == jwtData["id"],
                )
                .order_by(model.Conversation.updated_at.desc())
                .first()
            )
        except Exception as e:
            return e, []

        return None, conversation

    def create_message_by_conversation_id(
        self, jwtData, message, id
    ) -> tuple[Exception, list[model.Message]]:
        try:
            conversation = (
                self.session.query(model.Conversation)
                .filter_by(
                    id=id,
                    user_id=jwtData["id"],
                )
                .order_by(model.Conversation.updated_at.desc())
                .first()
            )
        except Exception as e:
            return e, []

        try:
            newMessage = model.Message(
                role=model.RoleEnum.user,
                content=message,
                conversation_id=conversation.id,
            )
            self.session.add(newMessage)
            self.session.commit()
            self.session.refresh(conversation)
        except Exception as e:
            self.session.rollback()
            return e, []

        e, newAssistantMessage = self.generate_text_from_ai_model(message, conversation)

        return e, [newMessage, newAssistantMessage]

    def get_message_by_id(self, jwtData, messageID) -> model.Message:
        if is_admin(jwtData):
            try:
                message = (
                    self.session.query(model.Message)
                    .filter_by(
                        id=messageID,
                    )
                    .first()
                )
            except Exception as e:
                return e, []
        elif is_user(jwtData):
            try:
                message = (
                    self.session.query(model.Message)
                    .join(
                        model.Conversation,
                        model.Message.conversation_id == model.Conversation.id,
                    )
                    .filter(
                        model.Message.id == messageID,
                        model.Conversation.user_id == jwtData["id"],
                    )
                    .first()
                )
                return None, message
            except Exception as e:
                return e, None
        else:
            return Exception("User Not Allowed"), None

    def get_generation_logs(
        self, jwt_data: dict = None, message_id: UUID = None
    ) -> tuple[Exception, dict]:
        try:
            query = self.session.query(GenerationLog).join(
                Message, GenerationLog.message_id == Message.id
            )

            if message_id:
                query = query.filter(GenerationLog.message_id == message_id)

            log = query.first()
            if not log:
                return None, {}

            log_data = {
                "id": str(log.id),
                "message_id": str(log.message_id),
                "data": log.data,
            }
            return None, log_data
        except Exception as e:
            return e, {}

    def create_or_update_log(
        self, jwt_data: dict, message_id: UUID, log_data: dict
    ) -> tuple[Exception, dict]:
        try:
            if not self.session.query(Message).filter_by(id=message_id).first():
                return (
                    Exception(
                        "Invalid message_id: Foreign key not found in 'message' table"
                    ),
                    {},
                )

            log = (
                self.session.query(GenerationLog)
                .filter_by(message_id=message_id)
                .first()
            )
            if log:
                log.data = json.dumps(log_data)
            else:
                log = GenerationLog(
                    id=uuid4(),
                    message_id=message_id,
                    data=json.dumps(log_data),
                )
                self.session.add(log)

            self.session.commit()
            self.session.refresh(log)

            log_data = {
                "id": str(log.id),
                "message_id": str(log.message_id),
                "data": json.loads(log.data),
            }
            return None, log_data
        except IntegrityError as e:
            self.session.rollback()
            return Exception("Database integrity error: " + str(e)), {}
        except Exception as e:
            self.session.rollback()
            return e, {}
