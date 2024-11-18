from sqlalchemy.orm import Session
from app.conversation import request, response, model
from password_generator import PasswordGenerator


class ConversationService:
    def __init__(self, session: Session):
        self.session = session

    def generate_text_from_ai_model(
        self, message, conversation
    ) -> tuple[Exception, model.Message]:
        try:
            staticAIResponse = "Loh Gak Bahaya Ta?"
            newAssistantMessage = model.Message(
                role=model.RoleEnum.assistant,
                content=staticAIResponse,
                conversation_id=conversation.id,
            )
            self.session.add(newAssistantMessage)
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
                .filter_by(
                    id=id,
                    user_id=jwtData["id"],
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

    def get_message_by_id(self, jwtData, messageID, conversationID) -> model.Message:
        e, conversation = self.get_conversation_by_id(jwtData, conversationID)

        try:
            message = (
                self.session.query(model.Message)
                .filter_by(
                    id=messageID,
                    conversation=conversation,
                )
                .first()
            )
        except Exception as e:
            return e, []

        return e, message

    def get_message_by_id_pure(self, jwtData, messageID) -> model.Message:
        try:
            message = (
                self.session.query(model.Message)
                .join(model.Conversation, model.Message.conversation_id == model.Conversation.id)
                .filter(
                    model.Message.id == messageID,
                    model.Conversation.user_id == jwtData["id"]
                )
                .first()
            )
            return None, message
        except Exception as e:
            return e, None
