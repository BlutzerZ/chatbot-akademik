from datetime import date
from fastapi import Form
from pydantic import BaseModel, Field  # type: ignore
from typing import Literal, Optional, Union


class UserCreateRequest(BaseModel):
    username: str
    password: str


class UserAuthRequest(BaseModel):
    username: str
    password: str

    class Config:
        from_attributes = True


class RefreshTokenRequest(BaseModel):
    token: str


class UserEditRequest(BaseModel):
    new_username: Optional[str] = None
    new_role: Optional[str] = None


class UserFiltersRequest(BaseModel):
    page: int | None = None
    limit: int | None = None
    search_query: str | None = None
    sort_by: str | None = None
    order: Literal["asc", "desc"] | None = "asc"
    include_deleted: bool = (False,)
    start_date: date | None = None
    end_date: date | None = None
