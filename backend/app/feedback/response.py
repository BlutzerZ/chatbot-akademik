from datetime import datetime
from enum import Enum
from typing import Union
from pydantic import BaseModel
from uuid import UUID


class FeedbackDetail(BaseModel):
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


class FeedbackMessageResponse(BaseModel):
    code: int
    message: str
    data: FeedbackDetail


class GetAllFeedbackResponse(BaseModel):
    code: int
    message: str
    data: list[FeedbackDetail]
