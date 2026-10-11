import chromadb
from sentence_transformers import SentenceTransformer

from app import settings


KNOWLEDGE = [
    ("about", "Hamza Amir is a Full-Stack Engineer based in Lahore, Pakistan. He builds responsive interfaces and cloud-scalable backend architectures with a focus on clean code and open source."),
    ("stack", "Hamza works with React, Node.js, MongoDB, Express, TypeScript, REST APIs, Next.js, Docker, AWS, and GitHub."),
    ("opensource", "Hamza contributes to voiceyBill projects, including frontend CSV and PDF export work, shared download utilities, mobile sidebar improvements, and backend ExcelJS CSV export."),
    ("portfolio", "Hamza's portfolio includes featured projects across full-stack web development, e-commerce, learning management, currency tools, and AI-enabled experiences."),
]

client = chromadb.PersistentClient(path=settings.chroma_persist_directory)
collection = client.get_or_create_collection("portfolio", metadata={"hnsw:space": "cosine"})
model = SentenceTransformer(settings.embedding_model)
collection.upsert(
    ids=[item[0] for item in KNOWLEDGE],
    documents=[item[1] for item in KNOWLEDGE],
    metadatas=[{"source": item[0]} for item in KNOWLEDGE],
    embeddings=model.encode([item[1] for item in KNOWLEDGE]).tolist(),
)
print(f"Ingested {len(KNOWLEDGE)} documents into {settings.chroma_persist_directory}")
