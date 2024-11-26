from datetime import datetime
from sqlalchemy.orm import Session
from app.conversation.service import ConversationService
from app.feedback import model
from app.conversation.model import (
    Conversation as ModelConversation,
    Message as ModelMessage,
    RoleEnum,
)
from helper.role import is_admin


class FeedbackService:
    def __init__(self, session: Session):
        self.session = session
        self.cs = ConversationService(session)

    def get_all_feedback(self, jwtData, filterData) -> list[Exception, model.Feedback]:
        if is_admin(jwtData):
            try:
                # Start
                query = self.session.query(model.Feedback)

                # Search
                if filterData.search_query:
                    query = query.filter(
                        model.Feedback.content.ilike(f"%{filterData.search_query}%")
                    )

                # Deleted
                if filterData.include_deleted:
                    query = query.filter(
                        model.Feedback.deleted_at.isnot(None)
                    )

                # Date
                if filterData.start_date:
                    query = query.filter(model.Feedback.created_at >= filterData.start_date)
                if filterData.end_date:
                    query = query.filter(model.Feedback.created_at <= filterData.end_date)

                # order_by
                field = (
                    getattr(model.Feedback, filterData.sort_by)
                    if filterData.sort_by and hasattr(model.Feedback, filterData.sort_by)
                    else model.Feedback.id
                )

                # sort
                if filterData.order and filterData.order.lower() == "desc":
                    query = query.order_by(field.desc())
                else:
                    query = query.order_by(field.asc())

                # Pagination
                if filterData.page and filterData.limit:
                    offset = (filterData.page - 1) * filterData.limit
                    query = query.offset(offset).limit(filterData.limit)
                elif filterData.limit:
                    query = query.limit(filterData.limit)

                # Execute
                users = query.all()

                return None, users
            except Exception as e:
                return e, None
            
            # try:
            #     feedbacks = (
            #         self.session.query(model.Feedback)
            #         .order_by(model.Feedback.created_at.desc())
            #         .all()
            #     )
            #     return None, feedbacks

            # except Exception as e:
            #     return e, None
        else:
            return Exception("User Not Allowed"), None

    def get_feedback_by_id(
        self, jwtData, feedback_id
    ) -> list[Exception, model.Feedback]:
        if is_admin(jwtData):
            try:
                feedback = (
                    self.session.query(model.Feedback).filter_by(id=feedback_id).first()
                )
                return None, feedback
            except Exception as e:
                return e, None
        else:
            return Exception("User Not Allowed"), None
        

    def change_feedback_status(
        self, jwtData, feedbackID, payload
    ) -> list[Exception, model.Feedback]:
        if is_admin(jwtData):
            e, feedback = self.get_feedback_by_id(jwtData, feedbackID)
            if e:
                return e, None

            print(payload.status)

            if payload.status.lower() == "valid":
                try:
                    feedback.status = model.FeedbackStatus.valid
                    self.session.add(feedback)

                    feedbackCorrection = model.FeedbackCorrection(
                        feedback_id=feedback.id,
                        content=payload.correction,
                    )
                    self.session.add(feedbackCorrection)
                    self.session.commit()
                    self.session.refresh(feedback)
                    self.session.refresh(feedbackCorrection)
                except Exception as e:
                    self.session.rollback()
                    return e, None
                    
                return None, feedback

            else:
                try:
                    feedback.status = model.FeedbackStatus.invalid
                    self.session.add(feedback)
                    self.session.commit()
                    self.session.refresh(feedback)

                    if payload.delete:
                        e, feedback = self.delete_by_id(jwtData, feedback.id)
                        if e:
                            return None, feedback

                    return None, feedback
                except Exception as e:
                    self.session.rollback()
                    return e, None    
        
        else:
            return Exception("User Not Allowed"), None

    # def feedback_correction(
    #     self, jwtData, payload
    # ) -> list[Exception, model.Feedback]:
        
        

    def feedback_by_message(
        self, jwtData, message_id, data
    ) -> list[Exception, model.Feedback]:
        # Get Message
        e, message = self.cs.get_message_by_id(jwtData, message_id)

        if e:
            return e, None

        if not message:
            errorMsg = "Error maybe message not found or message not generated by bot"
            return Exception(errorMsg), None

        # Get Feedback Data
        try:
            feedback = (
                self.session.query(model.Feedback)
                .filter_by(bot_message_id=message.id)
                .first()  # or .all() depending on what you need
            )
        except Exception as e:
            print(e)
            return f"Error Find Data | {str(e)}", None

        if feedback:  # Feedback is found
            try:
                feedback.score = data.score
                feedback.content = data.content
                self.session.add(feedback)
                self.session.commit()
                self.session.refresh(feedback)
            except Exception as e:
                self.session.rollback()
                return f"Error Update Data | {str(e)}", None

        else:  # Feedback not found, create it
            try:

                previous_message = (
                    self.session.query(ModelMessage.id)
                    .join(
                        ModelConversation,
                        ModelMessage.conversation_id == ModelConversation.id,
                    )
                    .filter(
                        ModelMessage.conversation_id == message.conversation_id,
                        ModelMessage.id < message.id,
                        ModelMessage.role == RoleEnum.user,
                        ModelConversation.user_id == jwtData["id"],
                    )
                    .order_by(ModelMessage.id.desc())
                    .first()
                )
                feedback = model.Feedback(
                    bot_message_id=message_id,
                    user_message_id=previous_message.id,
                    score=data.score,
                    content=data.content,
                )
                self.session.add(feedback)
                self.session.commit()
                self.session.refresh(feedback)
            except Exception as e:
                self.session.rollback()
                return f"Error Create Data | {str(e)}", None

        return None, feedback

    def delete_by_id(
        self,
        jwtData,
        feedbackID
    ) -> list[Exception, model.Feedback]:
        e, feedback = self.get_feedback_by_id(jwtData, feedbackID)
        if e:
            return e, None
        
        try:
            feedback.deleted_at = datetime.today()
            self.session.add(feedback)
            self.session.commit()
            self.session.refresh(feedback)

            return None, feedback
        except:
            self.session.rollback()
            return e, None