from datetime import date, datetime
from pydantic import BaseModel # type: ignore

class DetailResponse(BaseModel):
    token: str

class UserAuthResponse(BaseModel):
    code: int
    message: str
    data: list[DetailResponse]
     

class ErrorResponse(BaseModel):
    error: str


class UserDetail(BaseModel):
    username: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserDetailResponse(BaseModel):
    code: int
    message: str
    data: list[UserDetail]
