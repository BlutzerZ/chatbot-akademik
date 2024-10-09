import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Integer, String, Text, Date, Uuid # type: ignore
from datetime import date
from config.database import Base

class User(Base):
    __tablename__ = 'user'
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    username = Column(String(255), nullable=False)
    token = Column(String(255), nullable=False)
    createdAt = Column(Date, default=date.today())
    updatedAt = Column(Date, default=date.today(), onupdate=date.today())