import enum
from uuid_extensions import uuid7
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column, Enum, ForeignKey, String, DateTime, CHAR
from datetime import datetime
from sqlalchemy.orm import relationship
from config.database import Base


class User(Base):
    __tablename__ = "user"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    username = Column(String(255), nullable=False)
    token = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.today())
    updated_at = Column(DateTime, default=datetime.today(), onupdate=datetime.today())

    conversations = relationship("Conversation", backref="user")
    role = relationship("Role", uselist=False, backref="user")


class RoleType(enum.Enum):
    user = "USER"
    admin = "ADMIN"


class Role(Base):
    __tablename__ = "role"

    id = Column(
        UUID(as_uuid=True), primary_key=True, default=uuid7, unique=True, nullable=False
    )
    name = Column(Enum(RoleType), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), unique=True)

    @property
    def name_str(self):
        return self.name.value
