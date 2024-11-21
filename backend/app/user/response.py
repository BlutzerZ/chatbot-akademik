from datetime import date, datetime
from pydantic import BaseModel
from uuid import UUID
from app.user import model


class DetailResponse(BaseModel):
    token: str


class RoleDetail(BaseModel):
    id: UUID
    name: model.RoleType

    class Config:
        from_attributes = True


class UserAuthResponse(BaseModel):
    code: int
    message: str
    data: DetailResponse


class ErrorResponse(BaseModel):
    error: str


class UserDetail(BaseModel):
    id: UUID
    username: str
    deleted_at: datetime | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


class UserDetailResponse(BaseModel):
    code: int
    message: str
    data: UserDetail


class User(BaseModel):
    id: UUID
    username: str

    class Config:
        from_attributes = True
        arbitrary_types_allowed = True


class GetAllUsersResponse(BaseModel):
    code: int
    message: str
    data: list[UserDetail]
