# %% [markdown]
# https://haystack.deepset.ai/tutorials/27_first_rag_pipeline

# %%
# API KEYS
import os
from pprint import pprint
from getpass import getpass

if not os.environ.get("GOOGLE_API_KEY", None):
    os.environ["GOOGLE_API_KEY"] = getpass("Enter your Google API key: ")

# %%
# Chroma document store embedder
from haystack_integrations.document_stores.chroma import ChromaDocumentStore
from haystack_integrations.components.retrievers.chroma import ChromaEmbeddingRetriever

from haystack.components.embedders import SentenceTransformersTextEmbedder

text_embedder = SentenceTransformersTextEmbedder(
    model="LazarusNLP/all-indo-e5-small-v4"
)

document_store = ChromaDocumentStore(
    # host="0.0.0.0",
    # port=27261,
    persist_path="./chroma",
    collection_name="knowledge-general-001",
)

retriever = ChromaEmbeddingRetriever(document_store=document_store)


# %%
# Emotion
from enum import StrEnum
from haystack_integrations.components.generators.google_ai import (
    GoogleAIGeminiGenerator,
)
from haystack import component


class Emotion(StrEnum):
    HAPPY = "HAPPY"
    SAD = "SAD"
    ANGRY = "ANGRY"
    NEUTRAL = "NEUTRAL"


@component
class EmotionClassfier:
    @component.output_types(emotion=Emotion)
    def run(self, text: str):
        return {
            "emotion": Emotion.NEUTRAL,
        }


# %%
# advisor prompt builder
from haystack.components.builders import ChatPromptBuilder
from haystack.dataclasses import ChatMessage

advisor_prompt_builder = ChatPromptBuilder(
    template=[
        ChatMessage.from_user(
            """
Anda adalah chatbot akademik Universitas Dian Nuswantoro yang melayani mahasiswa.
Jawablah pertanyaan mahasiswa di bawah.

Informasi relevan:
{% for document in documents %}
    {{ document.content }}
{% endfor %}

{% if emotion == "SAD" %}
Mahasiswa terlihat sedih. Berikan dukungan dan bantuan yang diperlukan.
Kampus UDINUS juga menyediakan layanan konseling bagi mahasiswa yang membutuhkan.
{% endif %}

Pertanyaan mahasiswa: {{question}}
"""
        )
    ]
)

from haystack_integrations.components.generators.google_ai import (
    GoogleAIGeminiChatGenerator,
)

chat_generator = GoogleAIGeminiChatGenerator(model="gemini-1.5-flash")


# %%
# logging
import logging
from haystack import tracing
from haystack.tracing.logging_tracer import LoggingTracer

# logging.basicConfig(format="%(levelname)s - %(name)s -  %(message)s", level=logging.WARNING)
haystack_logger = logging.getLogger("haystack")
haystack_logger.setLevel(logging.DEBUG)
haystack_logger.handlers.clear()
haystack_logger.addHandler(logging.FileHandler("haystack.log"))

# %%
# pipeline
from haystack import Pipeline
from haystack.components.joiners import BranchJoiner

branch_joiner = BranchJoiner(str)

pipe = Pipeline()
pipe.add_component("branch_joiner", BranchJoiner(str))
pipe.add_component("emotion_classifier", EmotionClassfier())
pipe.add_component("text_embedder", text_embedder)
pipe.add_component("retriever", retriever)
pipe.add_component("advisor_prompt_builder", advisor_prompt_builder)
# pipe.add_component("chat_generator", chat_generator)

pipe.connect("branch_joiner", "emotion_classifier.text")
pipe.connect("branch_joiner", "text_embedder.text")
pipe.connect("emotion_classifier", "advisor_prompt_builder.emotion")
pipe.connect("text_embedder.embedding", "retriever.query_embedding")
pipe.connect("retriever", "advisor_prompt_builder.documents")
# pipe.connect("advisor_prompt_builder.prompt", "chat_generator.messages")

pipe.show()

# %%
response = pipe.run({"branch_joiner": {"value": "halo"}})
# print(response["advisor_prompt_builder"]["prompt"][0].content)

# %%
print("PROMPT: ")
print(response["advisor_prompt_builder"]["prompt"][0].content)
print()
print("RESPONSE: ")
print(response["advisor_prompt_builder"]["prompt"][0].content)
