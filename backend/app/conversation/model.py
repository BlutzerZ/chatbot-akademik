from uuid_extensions import uuid7
import enum
from sqlalchemy.dialects.postgresql import UUID # type: ignore
from sqlalchemy.orm import relationship # type: ignore
from sqlalchemy import Column, Enum, DateTime, Float, Integer, ForeignKey, String, Boolean # type: ignore
from datetime import date
from config.database import Base


class Model(Base):
    __tablename__ = 'model'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False)
    name = Column(String(), nullable=False)
    version = Column(String(), nullable=False)
    created_at = Column(DateTime, default=date.today())

    AssistantMessage = relationship('AssistantMessage', backref='model')


class Conversation(Base):
    __tablename__ = 'conversation'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False)
    created_at = Column(DateTime, default=date.today())
    updated_at = Column(DateTime, default=date.today(), onupdate=date.today())

    message = relationship('Message', backref='conversation')


class RoleEnum(enum.StrEnum):
    assistant = "ASSISTANT"
    system = "SYSTEM"
    user = "USER"

class Message(Base):
    __tablename__ = 'message'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    content = Column(String())
    created_at = Column(DateTime, default=date.today())
    updated_at = Column(DateTime, default=date.today(), onupdate=date.today())
    
    assistant_message = relationship('AssistantMessage', backref='message', uselist=False)
    message_log = relationship('MessageLog', backref='message', uselist=False)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey('conversation.id'))


class GenerationStatusEnum(enum.StrEnum):
    pending = "PENDING"
    generating = "GENERATING",
    stopped = "STOPPED"

class AssistantMessage(Base):
    __tablename__ = 'assistant_message'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False)
    generation_status = Column(Enum(GenerationStatusEnum), nullable=True) # maybe i will change
    generation_amount = Column(Integer(), nullable=False)
    
    model_id = Column(UUID(as_uuid=True), ForeignKey('model.id'))
    message_id = Column(UUID(as_uuid=True), ForeignKey('message.id'), unique=True)


class GenerationLog(Base):
    __tablename__ = 'generation_log'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False)
    message_id = Column(UUID(as_uuid=True), ForeignKey('message.id'), unique=True)
    data = Column(String())


class Feedback(Base):
    __tablename__ = 'generation_log'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False)
    score = Column(Float(), nullable=False)
    content = Column(String(), nullable=True) # we can change this later
    created_at = Column(DateTime, default=date.today())
    updated_at = Column(DateTime, default=date.today(), onupdate=date.today())