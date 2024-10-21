from datetime import datetime
from enum import Enum
from typing import Union
from pydantic import BaseModel 
from uuid import UUID


class RoleEnum(str, Enum):
    assistant = "ASSISTANT"
    system = "SYSTEM"
    user = "USER"


class ConversationDetail(BaseModel):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True



class MessageDetail(BaseModel):
    id: UUID
    role: RoleEnum
    content: str
    conversation_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True



class GetAllConversationResponse(BaseModel):
    code: int
    message: str
    data: list[ConversationDetail]


class CreateConversationOrMessageResponse(BaseModel):
    code: int
    message: str
    data: MessageDetail

class ConversationDetailWithMessage(BaseModel):
    id: UUID
    messages: list[MessageDetail]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True

class GetConversationByIDResponse(BaseModel):
    code: int
    message: str
    data: ConversationDetail

class GetConversationByIDWithMessageResponse(BaseModel):
    code: int
    message: str
    data: list[MessageDetail]


class GetMessageByIDResponse(BaseModel):
    code: int
    message: str
    data: MessageDetail