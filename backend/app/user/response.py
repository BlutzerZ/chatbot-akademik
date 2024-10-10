from datetime import date
from pydantic import BaseModel # type: ignore


class UserAuthResponse(BaseModel):
    token: str
    
    class Config:
        orm_mode = True 