from datetime import datetime
from enum import Enum
from typing import List, Optional, Union
from pydantic import BaseModel
from uuid import UUID
from app.feedback import model
from app.conversation.request import MessageDetail

class FeedbackCorrectionDetail(BaseModel):
    content: str

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class FeedbackDetailUser(BaseModel):
    id: UUID
    user_message_id: UUID
    bot_message_id: UUID
    score: int
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

# class FeedbackDetailAdmin(BaseModel):
#     id: UUID
#     user_message: MessageDetail
#     bot_message: MessageDetail
#     score: int
#     content: str
#     status: model.FeedbackStatus
#     correction: Optional[FeedbackCorrectionDetail] 
#     created_at: datetime
#     updated_at: datetime
#     deleted_at: datetime | None
    
#     class Config:
#         from_attributes = True
#         arbitrary_types_allowed = True


class FeedbackDetailAdmin(BaseModel):
    id: UUID
    # user_message_id: UUID
    # bot_message_id: UUID
    score: int
    content: str
    status: model.FeedbackStatus
    # correction: Optional[FeedbackCorrectionDetail] 
    created_at: datetime
    updated_at: datetime
    deleted_at: datetime | None

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


class FeedbackMessageResponse(BaseModel):
    code: int
    message: str
    data: FeedbackDetailUser


class GetAllFeedbackResponse(BaseModel):
    code: int
    message: str
    data: list[FeedbackDetailAdmin]
