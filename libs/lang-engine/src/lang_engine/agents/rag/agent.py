from typing import Any

from haystack import Pipeline
from haystack_integrations.document_stores.chroma import ChromaDocumentStore
from haystack_integrations.components.retrievers.chroma import ChromaEmbeddingRetriever
from haystack.components.embedders import SentenceTransformersTextEmbedder
from haystack_integrations.components.generators.google_ai import (
    GoogleAIGeminiGenerator,
)
from haystack.components.builders import PromptBuilder

from lang_engine.core.base import BaseAgent
from .prompts import RAG_TEMPLATE
from .context import RagContext


class RagAgent(BaseAgent[RagContext]):
    """Agent that uses Rag to generate responses based on a knowledge base"""

    def __init__(
        self,
        persist_path: str = "./chroma",
        collection_name: str = "knowledge-general-001",
        embedding_model: str = "LazarusNLP/all-indo-e5-small-v4",
        llm_model: str = "gemini-1.5-flash",
    ):
        self.persist_path = persist_path
        self.collection_name = collection_name
        self.embedding_model = embedding_model
        self.llm_model = llm_model
        super().__init__()

    def _build_pipeline(self) -> Pipeline:
        # Initialize components
        text_embedder = SentenceTransformersTextEmbedder(model=self.embedding_model)

        document_store = ChromaDocumentStore(
            persist_path=self.persist_path,
            collection_name=self.collection_name,
        )

        retriever = ChromaEmbeddingRetriever(document_store=document_store)
        prompt_builder = PromptBuilder(template=RAG_TEMPLATE)
        generator = GoogleAIGeminiGenerator(model=self.llm_model)

        # Build pipeline
        pipeline = Pipeline()
        pipeline.add_component("text_embedder", text_embedder)
        pipeline.add_component("retriever", retriever)
        pipeline.add_component("prompt_builder", prompt_builder)
        pipeline.add_component("llm", generator)

        # Connect components
        pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
        pipeline.connect("retriever", "prompt_builder.documents")
        pipeline.connect("prompt_builder", "llm")

        return pipeline

    def generate_response(
        self,
        message,
        context,
        conversation_messages=None,
    ) -> str:
        response = self.pipeline.run(
            {
                "text_embedder": {"text": message},
                "prompt_builder": {"question": message},
            }
        )
        return response["llm"]["replies"][0]
