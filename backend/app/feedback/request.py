from datetime import date
from typing import Literal, Optional
from pydantic import BaseModel


class FeedbackRequest(BaseModel):
    score: int
    content: str

class FeedbackStatusRequest(BaseModel):
    status: Literal["invalid", "valid"]
    delete: Optional[bool] = False
    correction: Optional[str] = None


class FeedbackFiltersRequest(BaseModel):
    page: int | None = None
    limit: int | None = None
    search_query: str | None = None
    sort_by: str | None = None
    order: Literal["asc", "desc"] | None = "asc"
    include_deleted: bool = False
    start_date: date | None = None
    end_date: date | None = None
