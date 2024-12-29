import argparse
from typing import Optional
import sys

from lang_engine.agents.advisor.agent import AdvisorAgent
from lang_engine.agents.advisor.context import AdvisorContext
from lang_engine.agents.rag.agent import RagAgent
from lang_engine.agents.rag.context import RagContext


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


def run_advisor_agent():
    """Run the advisor agent CLI"""
    print("\nAdvisor Agent Setup")
    print("-" * 50)

    # Get context information
    transcript = get_multiline_input("\nEnter student transcript (courses and grades):")
    available_courses = get_multiline_input("\nEnter available courses:")

    while True:
        try:
            gpa = float(input("\nEnter student GPA: ").strip())
            if 0 <= gpa <= 4.0:
                break
            print("GPA must be between 0 and 4.0")
        except ValueError:
            print("Please enter a valid number")

    agent = AdvisorAgent()
    context = AdvisorContext(
        student_transcript=transcript, available_courses=available_courses, gpa=gpa
    )

    print("\nAdvisor Agent Ready!")
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


def run_rag_agent(persist_path: str):
    """Run the RAG agent CLI"""
    agent = RagAgent(persist_path=persist_path)

    print("\nRAG Agent Ready!")
    print("-" * 50)

    try:
        while True:
            user_input = input("\nYou: ").strip()
            if not user_input:
                continue

            response = agent.generate_response(
                message=user_input,
                context=RagContext(),
            )
            print("\nAgent:", response)

    except KeyboardInterrupt:
        print("\n\nGoodbye!")
    except Exception as e:
        print(f"\nError: {str(e)}")


def main(agent_type: str, persist_path: Optional[str] = None):
    print(f"\n{agent_type.upper()} Agent CLI (Press Ctrl+C to exit)")

    if agent_type == "rag":
        run_rag_agent(persist_path or "./chroma")
    elif agent_type == "advisor":
        run_advisor_agent()
    else:
        print(f"Unknown agent type: {agent_type}")
        sys.exit(1)


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
