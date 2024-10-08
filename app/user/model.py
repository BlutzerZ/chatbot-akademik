from sqlalchemy import Column, Integer, String, Text, Date, Uuid # type: ignore
from datetime import date
from config.database import Base

class User(Base):
    # __tablename__ = 'anatomi'
    
    # uuid = Column(Uuid, primary_key=True, )
    # nama = Column(String(255), nullable=False)
    # foto = Column(String(255))
    # deskripsi = Column(Text)
    # createdAt = Column(Date, default=date.today())
    # updatedAt = Column(Date, default=date.today(), onupdate=date.today())