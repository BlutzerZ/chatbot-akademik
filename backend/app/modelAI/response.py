from datetime import date, datetime
from pydantic import BaseModel

class ModelDetail(BaseModel):
    # id: UUID
    username: str
    created_at: datetime
    updated_at: datetime

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