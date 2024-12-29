# %% [markdown]
# https://haystack.deepset.ai/tutorials/27_first_rag_pipeline

# %%
import os
from pprint import pprint
from getpass import getpass

if not os.environ.get("GOOGLE_API_KEY", None):
    os.environ["GOOGLE_API_KEY"] = getpass("Enter your Google API key: ")

SHOW_MERMAID_TEXT = True

# %%
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
from haystack.components.builders import PromptBuilder

template = """
Anda adalah chatbot akademik Universitas Dian Nuswantoro yang melayani mahasiswa.
Jawablah pertanyaan mahasiswa di bawah.

Informasi relevan:
{% for document in documents %}
    {{ document.content }}
{% endfor %}


Pertanyaan mahasiswa: {{question}}
Jawaban:
"""

prompt_builder = PromptBuilder(template=template)

# %%
from haystack_integrations.components.generators.google_ai import (
    GoogleAIGeminiGenerator,
)

generator = GoogleAIGeminiGenerator(model="gemini-1.5-flash")

# %%
from haystack import Pipeline
from haystack.core.pipeline.draw import _to_mermaid_text

pipeline = Pipeline()
# Add components to your pipeline
pipeline.add_component("text_embedder", text_embedder)
pipeline.add_component("retriever", retriever)
pipeline.add_component("prompt_builder", prompt_builder)
pipeline.add_component("llm", generator)

# Now, connect the components to each other
pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
pipeline.connect("retriever", "prompt_builder.documents")
pipeline.connect("prompt_builder", "llm")


if SHOW_MERMAID_TEXT:
    print(_to_mermaid_text(pipeline.graph))
else:
    pipeline.show()


# %%
def get_pipeline_response(pipeline: Pipeline, question: str):
    response = pipeline.run(
        {"text_embedder": {"text": question}, "prompt_builder": {"question": question}},
        include_outputs_from={"prompt_builder"},
    )

    return response


def print_pipeline_response(response, question):
    print("# Question")
    print()
    print(question)
    print()
    print("# Prompt")
    print()
    print(response["prompt_builder"]["prompt"])
    print()
    print("# Answer")
    print()
    print(response["llm"]["replies"][0])
    print()


# %%
questions = [
    # "Apa aktivitas yang berkaitan dengan seni di panggung?"
    "Jika saya ingin menjadi mahasiswa unggulan di udinus, bagaimana caranya?"
]
question = questions[0]
response = get_pipeline_response(pipeline, questions[0])

# %%
print_pipeline_response(response, question)
