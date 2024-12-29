import argparse
from typing import Optional

from lang_engine.agents.rag.agent import RagAgent
from lang_engine.agents.rag.context import RagContext


def main(persist_path: Optional[str] = None):
    # Initialize the Rag agent with default or provided persist_path
    agent = RagAgent(
        persist_path=persist_path or "./chroma",
    )

    print("Rag Agent CLI (Press Ctrl+C to exit)")
    print("-" * 50)

    try:
        while True:
            # Get user input
            user_input = input("\nYou: ").strip()

            if not user_input:
                continue

            # Generate response
            response = agent.generate_response(
                message=user_input,
                context=RagContext(),
            )

            print("\nAgent:", response)

    except KeyboardInterrupt:
        print("\n\nGoodbye!")
    except Exception as e:
        print(f"\nError: {str(e)}")


def run_cli():
    parser = argparse.ArgumentParser(description="Rag Agent CLI")
    parser.add_argument(
        "--persist-path",
        type=str,
        help="Path to persist the Chroma database (default: ./chroma)",
    )

    args = parser.parse_args()
    main(persist_path=args.persist_path)
