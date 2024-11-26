import enum
from sqlalchemy import (
    Column,
    DateTime,
    Enum,
    ForeignKey,
    String,
    Boolean,
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from uuid_extensions import uuid7
from config.database import Base
from datetime import datetime


class FeedbackStatus(enum.Enum):
    valid = "VALID"
    invalid = "INVALID"
    in_review = "IN_REVIEW"


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    user_message_id = Column(UUID(as_uuid=True), ForeignKey("message.id"), unique=True)
    bot_message_id = Column(UUID(as_uuid=True), ForeignKey("message.id"), unique=True)
    score = Column(Boolean(), nullable=False)
    content = Column(String(), nullable=True)
    status = Column(
        Enum(FeedbackStatus), default=FeedbackStatus.in_review, nullable=True
    )
    deleted_at = Column(DateTime)
    created_at = Column(DateTime, default=datetime.today())
    updated_at = Column(DateTime, default=datetime.today(), onupdate=datetime.today())

    user_message = relationship("Message", foreign_keys=[user_message_id], uselist=False)
    bot_message = relationship("Message", foreign_keys=[bot_message_id], uselist=False)

    correction = relationship("FeedbackCorrection", backref="feedback", uselist=False)


class FeedbackCorrection(Base):
    __tablename__ = "feedback_correction"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    content = Column(String(), nullable=False)
    created_at = Column(DateTime, default=datetime.today())
    updated_at = Column(DateTime, default=datetime.today(), onupdate=datetime.today())

    feedback_id = Column(UUID(as_uuid=True), ForeignKey("feedback.id"), unique=True)
