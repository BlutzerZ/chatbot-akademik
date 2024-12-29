from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any

from haystack import Pipeline
from haystack.dataclasses import ChatMessage


class BaseAgent(ABC):
    """Base class for all chat agents"""

    def __init__(self):
        self.pipeline = self._build_pipeline()

    @abstractmethod
    def _build_pipeline(self) -> Pipeline:
        """Build and return the Haystack pipeline for this agent"""
        pass

    @abstractmethod
    def generate_response(
        self,
        message: str,
        context: Dict[str, Any],
        conversation_messages: Optional[List[ChatMessage]] = None,
    ) -> str:
        """Generate a response given the latest message and context

        Args:
            message: The latest message from the user
            context: Context information for this agent
            conversation_messages: All messages in the conversation including the latest message

        Returns:
            The generated response
        """
        pass
