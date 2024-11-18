from pydantic import BaseModel

class FeedbackRequest(BaseModel):
    score: int
    content: str
