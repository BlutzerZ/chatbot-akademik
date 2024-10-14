from sqlalchemy.orm import Session
from app.conversation import request, response, model
from password_generator import PasswordGenerator


class ConversationService:
    def __init__(self, session: Session):
        self.session = session

    def get_all_conversations(self, jwtData, limit) -> list[model.Conversation]:
        conversations = self.session.query(model.Conversation).filter_by(user_id=jwtData['id']).all()[:limit]

        return conversations
    
    def create_conversation(self, jwtData, messsage) -> tuple[Exception, list[model.Message]]:
        # Try save message of user
        try:
            newConversation = model.Conversation(
                user_id=jwtData['id']
            )
            self.session.add(newConversation)
            self.session.flush()

            # User Message
            newMessage = model.Message(
                role=model.RoleEnum.user,
                content=messsage,
                conversation_id = newConversation.id,
            )
            self.session.add(newMessage)
            self.session.commit()
            self.session.refresh(newConversation)
        except Exception as e:
            self.session.rollback()
            return e, []

        #Try Generate AI response
        try:
            responseMessage = "bla bla bla bbla blaa"
            newAssistantMessage = model.Message(
                role=model.RoleEnum.assistant,
                content=responseMessage,
                conversation_id = newConversation.id,
            )
            self.session.add(newAssistantMessage)
            self.session.commit()
            self.session.refresh(newConversation)
        except Exception as e:
            self.session.rollback()
            return e, []

        e = None
        return e, [newMessage, newAssistantMessage]
    
    def get_conversation_by_id(self, jwtData, id) -> tuple[Exception, list[model.Conversation]]:
        try:
            conversation = self.session.query(model.Conversation).filter_by(id=id, user_id=jwtData['id']).first()
        except Exception as e:
            return e, []

        print("=====================")
        print(conversation)
        print("=====================")


        return None, conversation