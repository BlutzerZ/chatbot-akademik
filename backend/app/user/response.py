from datetime import date, datetime
from pydantic import BaseModel
from uuid import UUID


class DetailResponse(BaseModel):
    token: str


class UserAuthResponse(BaseModel):
    code: int
    message: str
    data: DetailResponse


class ErrorResponse(BaseModel):
    error: str


class UserDetail(BaseModel):
    id: UUID
    username: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True      



class UserDetailResponse(BaseModel):
    code: int
    message: str
    data: UserDetail
