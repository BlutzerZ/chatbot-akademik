from dataclasses import dataclass
from typing import Optional


@dataclass
class AdvisorContext:
    """Context for the advisor agent containing student information"""

    student_transcript: str
    available_courses: str
    gpa: float
