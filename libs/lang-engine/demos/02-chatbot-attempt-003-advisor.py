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
    host="0.0.0.0",
    port=27261,
    collection_name="knowledge-general-001",
)

retriever = ChromaEmbeddingRetriever(document_store=document_store)


# %%
from haystack.components.joiners import BranchJoiner

question_joiner = BranchJoiner(str)
transcript_joiner = BranchJoiner(str)
available_courses_joiner = BranchJoiner(str)

# %%
from haystack.components.builders import PromptBuilder, ChatPromptBuilder
from haystack.dataclasses import ChatMessage

template = [
    ChatMessage.from_system(
        """
Anda adalah chatbot akademik Universitas Dian Nuswantoro yang melayani konsultasi mahasiswa dalam memilih SKS (satuan kredit semester).

Daftar nilai mahasiswa:
```
{{student_transcript}}
```

IPK mahasiswa: 3.92

Nama-nama mata kuliah yang dapat diambil mahasiswa semester berikut:
```
{{available_courses}}
```

Bantulah mahasiswa memilih mata kuliah yang akan diambil semester ini.

Pesan mahasisa terbaru:
{{question}}
"""
    )
]

prompt_builder = ChatPromptBuilder(
    template=template,
    required_variables=["student_transcript", "available_courses", "question"],
)

# %%
from haystack_integrations.components.generators.google_ai import (
    GoogleAIGeminiGenerator,
    GoogleAIGeminiChatGenerator,
)

generator = GoogleAIGeminiGenerator(model="gemini-1.5-flash")

gemini_chat = GoogleAIGeminiChatGenerator(model="gemini-1.5-flash")

# %%
from haystack import Pipeline
from haystack.core.pipeline.draw import _to_mermaid_text

pipeline = Pipeline()

# Add components to your pipeline
pipeline.add_component("question_joiner", question_joiner)
pipeline.add_component("transcript_joiner", transcript_joiner)
pipeline.add_component("available_courses_joiner", available_courses_joiner)
pipeline.add_component("prompt_builder", prompt_builder)
pipeline.add_component("chat", gemini_chat)

# Now, connect the components to each other
pipeline.connect("question_joiner.value", "prompt_builder.question")
pipeline.connect("transcript_joiner.value", "prompt_builder.student_transcript")
pipeline.connect("available_courses_joiner.value", "prompt_builder.available_courses")
pipeline.connect("prompt_builder.prompt", "chat.messages")

if SHOW_MERMAID_TEXT:
    print(_to_mermaid_text(pipeline.graph))
else:
    pipeline.show()

# %%
STUDENT_TRANSCRIPT = """
Mata kuliah, Persentase nilai
KALKULUS 1, 100
DASAR PEMROGRAMAN, 100
MATEMATIKA DISKRIT, 85
PEMROGRAMAN BERBASIS WEB, 100
ORGANISASI DAN ARSITEKTUR KOMPUTER, 100
DASAR DASAR KOMPUTASI, 100
PENGANTAR TEKNOLOGI INFORMASI, 100
FISIKA, 100
ALGORITMA DAN PEMROGRAMAN, 100
RANGKAIAN LOGIKA DIGITAL, 85
BASIS DATA, 100
REKAYASA PERANGKAT LUNAK, 100
LOGIKA INFORMATIKA, 100
PEMROGRAMAN WEB LANJUT, 100"""

AVAILABLE_COURSES = """
JARINGAN KOMPUTER
PEMROGRAMAN BERORIENTASI OBJEK
PEMBELAJARAN MESIN
SISTEM BASIS DATA
PENAMBANGAN DATA
SISTEM INFORMASI
KECERDASAN BUATAN
KRIPTOGRAFI
REKAYASA KEBUTUHAN PERANGKAT LUNAK
OTOMATA DAN TEORI BAHASA
SISTEM OPERASI
REKAYASA PERANGKAT LUNAK
MATRIKS DAN RUANG VEKTOR
INTERAKSI MANUSIA DAN KOMPUTER
PROBABILITAS DAN STATISTIK"""


def get_pipeline_response(pipeline: Pipeline, question: str):
    response = pipeline.run(
        {
            "question_joiner": {"value": question},
            "transcript_joiner": {"value": STUDENT_TRANSCRIPT},
            "available_courses_joiner": {"value": AVAILABLE_COURSES},
        },
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
    print(response["prompt_builder"]["prompt"][0].content)
    print()
    print("# Answer")
    print()
    print(response["chat"]["replies"][0].content)
    print()


# %%
response = get_pipeline_response(pipeline, "Boleh minta tolong memilih SKS?")

# %%
print_pipeline_response(response, "Boleh minta tolong memilih SKS?")
