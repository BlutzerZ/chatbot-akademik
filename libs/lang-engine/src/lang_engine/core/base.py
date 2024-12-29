from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any, Generic, TypeVar

from haystack import Pipeline
from haystack.dataclasses import ChatMessage

TContext = TypeVar('TContext')

class BaseAgent(ABC, Generic[TContext]):
    """Base class for all chat agents
    
    Type Parameters:
        TContext: The type of the context object used by this agent
    """

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
        context: TContext,
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
