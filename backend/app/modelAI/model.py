from uuid_extensions import uuid7
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Enum, DateTime, Integer, ForeignKey, String
from datetime import datetime
from config.database import Base


class Model(Base):
    __tablename__ = "model"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    name = Column(String(), nullable=False)
    version = Column(String(), nullable=False)
    created_at = Column(DateTime, default=datetime.today())

    # Relasi one-to-many dengan AssistantMessage
    assistant_messages = relationship("AssistantMessage", backref="model")
