from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field
from typing import Any
from sqlalchemy.dialects.postgresql import UUID


class RoleEnum(str, Enum):
    assistant = "ASSISTANT"
    system = "SYSTEM"
    user = "USER"


class GenerationStatusEnum(str, Enum):
    pending = "PENDING"
    generating = "GENERATING"
    stopped = "STOPPED"


class AssistantMessageDetail(BaseModel):
    id: UUID
    generation_status: GenerationStatusEnum
    generation_amount: int

    model_id: UUID
    message_id: UUID

    class Config:
        arbitrary_types_allowed = True
        # Menonaktifkan perlindungan namespace untuk field yang diawali dengan 'model_'
        protected_namespaces = ()
        from_attributes = True


class MessageDetail(BaseModel):
    id: UUID
    role: RoleEnum
    content: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


class ConversationDetail(BaseModel):
    username: str
    messages: list[MessageDetail]
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


class CreateConversationOrMessageRequest(BaseModel):
    message: str


class CreateOrUpdateLogRequest(BaseModel):
    data: Any = Field(..., description="Payload containing any JSON structure")
