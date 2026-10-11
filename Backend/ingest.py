import chromadb
from sentence_transformers import SentenceTransformer

from app import settings
from knowledge import KNOWLEDGE

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
