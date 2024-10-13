from datetime import datetime
from enum import Enum
from pydantic import BaseModel 
from sqlalchemy.dialects.postgresql import UUID


class RoleEnum(str, Enum):
    assistant = "ASSISTANT"
    system = "SYSTEM"
    user = "USER"

class GenerationStatusEnum(str, Enum):
    pending = "PENDING"
    generating = "GENERATING"
    stopped = "STOPPED"


class AssistantMessasgeDetail(BaseModel):
    # id: UUID
    generation_status: GenerationStatusEnum
    generation_amount: int

    # model_id: UUID
    # message_id: UUId


class MessageDetail(BaseModel):
    # id: UUID
    role: RoleEnum
    content: str
    created_at: datetime
    updated_at: datetime


class ConversationDetail(BaseModel):
    username: str
    messages: list[MessageDetail]
    # user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


