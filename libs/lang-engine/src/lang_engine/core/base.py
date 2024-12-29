from abc import ABC, abstractmethod
from typing import Optional, Generic, TypeVar

from haystack import Pipeline
from haystack.dataclasses import ChatMessage

TContext = TypeVar("TContext")


class BaseAgent(ABC, Generic[TContext]):
    """Base class for all conversational agents in the system.
    
    This abstract class defines the core interface that all agents must implement.
    It provides a structured way to build agents that use Haystack pipelines for
    natural language processing tasks.

    Each agent implementation should:
    1. Define its specific context type (TContext)
    2. Implement the pipeline building logic in _build_pipeline()
    3. Implement the response generation logic in generate_response()

    The class uses a generic type parameter TContext to ensure type safety when
    working with different types of context objects for different agents.

    Type Parameters:
        TContext: The type of context object used by this agent. Different agents
                 may require different types of context information.
    """

    def __init__(self):
        """Initialize the agent by building its pipeline."""
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
