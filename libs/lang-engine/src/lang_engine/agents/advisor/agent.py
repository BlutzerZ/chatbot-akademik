from typing import Optional

from haystack import Pipeline
from haystack.dataclasses import ChatMessage
from haystack.components.builders import ChatPromptBuilder
from haystack.components.joiners import BranchJoiner
from haystack_integrations.components.generators.google_ai import (
    GoogleAIGeminiChatGenerator,
)

from lang_engine.core.base import BaseAgent
from .context import AdvisorContext
from .prompts import ADVISOR_TEMPLATE


class AdvisorAgent(BaseAgent[AdvisorContext]):
    """Academic advisor agent that helps students make course selections.
    
    This agent analyzes a student's academic history (transcript), GPA, and available courses
    to provide personalized course recommendations. It considers prerequisites, academic performance,
    and course availability to suggest suitable academic paths.

    Args:
        llm_model (str): Name of the Google AI model to use. Defaults to "gemini-1.5-flash"
    """

    def __init__(
        self,
        llm_model: str = "gemini-1.5-flash",
    ):
        self.llm_model = llm_model
        super().__init__()

    def _build_pipeline(self) -> Pipeline:
        # Initialize components
        question_joiner = BranchJoiner(str)
        transcript_joiner = BranchJoiner(str)
        available_courses_joiner = BranchJoiner(str)
        gpa_joiner = BranchJoiner(str)

        prompt_builder = ChatPromptBuilder(
            template=ADVISOR_TEMPLATE,
            required_variables=[
                "student_transcript",
                "available_courses",
                "question",
                "gpa",
            ],
        )
        generator = GoogleAIGeminiChatGenerator(model=self.llm_model)

        # Build pipeline
        pipeline = Pipeline()
        pipeline.add_component("question_joiner", question_joiner)
        pipeline.add_component("transcript_joiner", transcript_joiner)
        pipeline.add_component("available_courses_joiner", available_courses_joiner)
        pipeline.add_component("gpa_joiner", gpa_joiner)
        pipeline.add_component("prompt_builder", prompt_builder)
        pipeline.add_component("chat", generator)

        # Connect components
        pipeline.connect("question_joiner.value", "prompt_builder.question")
        pipeline.connect("transcript_joiner.value", "prompt_builder.student_transcript")
        pipeline.connect(
            "available_courses_joiner.value", "prompt_builder.available_courses"
        )
        pipeline.connect("gpa_joiner.value", "prompt_builder.gpa")
        pipeline.connect("prompt_builder.prompt", "chat.messages")

        return pipeline

    def generate_response(
        self,
        message: str,
        context: AdvisorContext,
        conversation_messages: Optional[list[ChatMessage]] = None,
    ) -> str:
        """Generate academic advice based on student context.
        
        Args:
            message: Student's question or request for advice
            context: Student's academic context including transcript, GPA, and available courses
            conversation_messages: Previous conversation history (not used in current implementation)
            
        Returns:
            str: Generated academic advice or course recommendations
        """
        response = self.pipeline.run(
            {
                "question_joiner": {"value": message},
                "transcript_joiner": {"value": context.student_transcript},
                "available_courses_joiner": {"value": context.available_courses},
                "gpa_joiner": {"value": str(context.gpa)},
            }
        )
        return response["chat"]["replies"][0].content
