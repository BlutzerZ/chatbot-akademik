from datetime import date, datetime
from pydantic import BaseModel
from uuid import UUID


class ModelDetail(BaseModel):
    id: UUID
    name: str
    version: str
    created_at: datetime

    class Config:
        from_attributes = True


class GetAllModelResponse(BaseModel):
    code: int
    message: str
    data: list[ModelDetail]


class GetModelResponse(BaseModel):
    code: int
    message: str
    data: ModelDetail
