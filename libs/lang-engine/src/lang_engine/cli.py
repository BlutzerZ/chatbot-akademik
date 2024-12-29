import argparse
from typing import Optional, Protocol
import sys

from lang_engine.agents.advisor.agent import AdvisorAgent
from lang_engine.agents.advisor.context import AdvisorContext
from lang_engine.agents.rag.agent import RagAgent
from lang_engine.agents.rag.context import RagContext


class Agent(Protocol):
    def generate_response(self, message: str, context: any) -> str: ...


def get_multiline_input(prompt: str) -> str:
    """Get multiline input from user. Empty line to finish."""
    print(prompt)
    print("(Enter an empty line to finish)")
    lines = []
    while True:
        line = input().strip()
        if not line:
            break
        lines.append(line)
    return "\n".join(lines)


def get_gpa_input() -> float:
    """Get and validate GPA input from user."""
    while True:
        try:
            gpa = float(input("\nEnter student GPA: ").strip())
            if 0 <= gpa <= 4.0:
                return gpa
            print("GPA must be between 0 and 4.0")
        except ValueError:
            print("Please enter a valid number")


def setup_advisor_context() -> AdvisorContext:
    """Setup and return AdvisorContext with user inputs."""
    print("\nAdvisor Agent Setup")
    print("-" * 50)

    transcript = get_multiline_input("\nEnter student transcript (courses and grades):")
    available_courses = get_multiline_input("\nEnter available courses:")
    gpa = get_gpa_input()

    return AdvisorContext(
        student_transcript=transcript, available_courses=available_courses, gpa=gpa
    )


def run_agent_loop(agent: Agent, context: any):
    """Generic agent interaction loop."""
    print("\nAgent Ready!")
    print("-" * 50)

    try:
        while True:
            user_input = input("\nYou: ").strip()
            if not user_input:
                continue

            response = agent.generate_response(
                message=user_input,
                context=context,
            )
            print("\nAgent:", response)

    except KeyboardInterrupt:
        print("\n\nGoodbye!")
    except Exception as e:
        print(f"\nError: {str(e)}")


def create_agent(
    agent_type: str, persist_path: Optional[str] = None
) -> tuple[Agent, any]:
    """Create and return appropriate agent and context based on type."""
    if agent_type == "rag":
        return RagAgent(persist_path=persist_path or "./chroma"), RagContext()
    elif agent_type == "advisor":
        return AdvisorAgent(), setup_advisor_context()
    else:
        print(f"Unknown agent type: {agent_type}")
        sys.exit(1)


def main(agent_type: str, persist_path: Optional[str] = None):
    print(f"\n{agent_type.upper()} Agent CLI (Press Ctrl+C to exit)")
    agent, context = create_agent(agent_type, persist_path)
    run_agent_loop(agent, context)


def run_cli():
    parser = argparse.ArgumentParser(description="Chat Agent CLI")
    parser.add_argument(
        "--agent",
        type=str,
        choices=["rag", "advisor"],
        default="rag",
        help="Type of agent to use (default: rag)",
    )
    parser.add_argument(
        "--persist-path",
        type=str,
        help="Path to persist the Chroma database for RAG agent (default: ./chroma)",
    )

    args = parser.parse_args()
    main(agent_type=args.agent, persist_path=args.persist_path)
