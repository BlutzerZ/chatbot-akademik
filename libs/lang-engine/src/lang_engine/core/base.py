from abc import ABC, abstractmethod
from typing import Optional, Generic, TypeVar

from haystack import Pipeline
from haystack.dataclasses import ChatMessage

TContext = TypeVar("TContext")


class BaseAgent(ABC, Generic[TContext]):
    """Base class for all agents in the Lang Engine.

    This class provides the basic structure and interface that all agents
    should implement.

    Attributes:
        name (str): The name of the agent
    """

    def __init__(self, name: str):
        """Initialize the base agent.

        Args:
            name (str): The name to give to this agent instance
        """
        self.name = name
        self.pipeline = self._build_pipeline()

    @abstractmethod
    def _build_pipeline(self) -> Pipeline:
        """Build and return the Haystack pipeline for this agent.

        This method should be implemented by each agent to define its specific
        pipeline architecture using Haystack components.

        Returns:
            Pipeline: A configured Haystack pipeline ready for processing
        """
        pass

    @abstractmethod
    def generate_response(
        self,
        message: str,
        context: TContext,
        conversation_messages: Optional[list[ChatMessage]] = None,
    ) -> str:
        """Generate a response given the latest message and context.

        Args:
            message: The latest message from the user that needs a response
            context: Context information specific to this agent type
            conversation_messages: Optional list of previous messages in the conversation,
                                 enabling agents to maintain conversation context

        Returns:
            str: The generated response text
        """
        pass
