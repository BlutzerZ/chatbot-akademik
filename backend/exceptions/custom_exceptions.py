from typing import List, Optional
from fastapi import HTTPException


class CustomHTTPException(HTTPException):
    def __init__(
        self,
        type_: str,
        title: str,
        status: int,
        detail: Optional[str] = None,
        validation_problems: Optional[List[str]] = None,
    ):
        super().__init__(status_code=status, detail=detail)
        self.type_ = type_
        self.title = title
        self.status = status
        self.detail = detail
        self.validation_problems = validation_problems or []
