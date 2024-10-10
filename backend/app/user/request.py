from datetime import date
from pydantic import BaseModel # type: ignore


class UserAuthRequest(BaseModel):
    username: str
    password: str
    
    class Config:
        orm_mode = True 