from pydantic import BaseModel
from typing import List, Optional


class CustomErrorSchema(BaseModel):
    type: str
    title: str
    status: int
    detail: str
    validation_problems: Optional[List[str]]
