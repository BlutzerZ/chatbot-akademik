from typing import List, Optional

class CustomHTTPException(Exception):
    def __init__(
        self,
        type_: str,
        title: str,
        status: int,
        detail: Optional[str] = None,
        validation_problems: Optional[List[str]] = None,
    ):
        self.type_ = type_
        self.title = title
        self.status = status
        self.detail = detail
        self.validation_problems = validation_problems or []