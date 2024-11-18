from uuid_extensions import uuid7
import enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Enum, DateTime, Float, Integer, ForeignKey, String
from datetime import datetime
from config.database import Base


class Conversation(Base):
    __tablename__ = "conversation"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    created_at = Column(DateTime, default=datetime.today())
    updated_at = Column(DateTime, default=datetime.today(), onupdate=datetime.today())

    messages = relationship("Message", backref="conversation")
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"))


class RoleEnum(str, enum.Enum):  # Ganti StrEnum dengan Enum
    assistant = "ASSISTANT"
    system = "SYSTEM"
    user = "USER"


class Message(Base):
    __tablename__ = "message"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    role = Column(Enum(RoleEnum), nullable=False)
    content = Column(String())
    created_at = Column(DateTime, default=datetime.today())
    updated_at = Column(DateTime, default=datetime.today(), onupdate=datetime.today())

    assistant_message = relationship(
        "AssistantMessage", backref="message", uselist=False
    )
    generation_log = relationship("GenerationLog", backref="message", uselist=False)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversation.id"))


class GenerationStatusEnum(enum.Enum):  # Ganti StrEnum dengan Enum
    pending = "PENDING"
    generating = "GENERATING"
    stopped = "STOPPED"


class AssistantMessage(Base):
    __tablename__ = "assistant_message"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    generation_status = Column(
        Enum(GenerationStatusEnum), nullable=True
    )  # maybe i will change
    generation_amount = Column(Integer(), nullable=False)

    model_id = Column(UUID(as_uuid=True), ForeignKey("model.id"))
    message_id = Column(UUID(as_uuid=True), ForeignKey("message.id"), unique=True)


class GenerationLog(Base):
    __tablename__ = "generation_log"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    message_id = Column(UUID(as_uuid=True), ForeignKey("message.id"), unique=True)
    data = Column(String())
