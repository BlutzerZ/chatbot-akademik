from sqlalchemy import Column, Enum, DateTime, Float, Integer, ForeignKey, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
from uuid_extensions import uuid7
from config.database import Base
from datetime import datetime


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    user_message_id = Column(UUID(as_uuid=True), ForeignKey("message.id"), unique=True)
    bot_message_id = Column(UUID(as_uuid=True), ForeignKey("message.id"), unique=True)
    score = Column(Boolean(), nullable=False)
    content = Column(String(), nullable=True)  # we can change this later
    created_at = Column(DateTime, default=datetime.today())
    updated_at = Column(DateTime, default=datetime.today(), onupdate=datetime.today())
