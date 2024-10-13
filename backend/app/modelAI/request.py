from datetime import date
from pydantic import BaseModel


class CreateModelRequest(BaseModel):
    name: str
    version: str
    
    class Config:
        from_attributes = True 
