from __future__ import annotations

import os
import re
from functools import lru_cache
from typing import Any

import chromadb
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from rank_bm25 import BM25Okapi
from sentence_transformers import SentenceTransformer


class Settings(BaseSettings):
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.5-flash-lite"
    chroma_persist_directory: str = "./data/chroma"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    allowed_origins: str = "http://localhost:3000"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)


settings = Settings()
app = FastAPI(title="Portfolio RAG Service", version="1.0.0")
origins = [origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["POST", "GET"], allow_headers=["*"])


def tokens(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


@lru_cache(maxsize=1)
def resources() -> tuple[Any, SentenceTransformer, BM25Okapi, list[dict[str, Any]]]:
    client = chromadb.PersistentClient(path=settings.chroma_persist_directory)
    collection = client.get_or_create_collection("portfolio", metadata={"hnsw:space": "cosine"})
    records = collection.get(include=["documents", "metadatas"])
    documents = records.get("documents") or []
    metadatas = records.get("metadatas") or [{} for _ in documents]
    entries = [{"id": str(index), "document": doc, "metadata": meta or {}} for index, (doc, meta) in enumerate(zip(documents, metadatas))]
    model = SentenceTransformer(settings.embedding_model)
    return collection, model, BM25Okapi([tokens(entry["document"]) for entry in entries] or [["portfolio"]]), entries


def hybrid_search(query: str, limit: int = 5) -> list[dict[str, Any]]:
    collection, model, bm25, entries = resources()
    if not entries:
        return []
    lexical_scores = bm25.get_scores(tokens(query))
    semantic = collection.query(query_embeddings=[model.encode(query).tolist()], n_results=min(limit * 3, len(entries)), include=["documents", "metadatas", "distances"])
    semantic_scores = {document: 1 - distance for document, distance in zip(semantic["documents"][0], semantic["distances"][0])}
    maximum = max(lexical_scores) or 1
    ranked = []
    for index, entry in enumerate(entries):
        lexical = lexical_scores[index] / maximum
        semantic_score = semantic_scores.get(entry["document"], 0)
        ranked.append((0.45 * lexical + 0.55 * semantic_score, entry))
    return [entry | {"score": round(score, 4)} for score, entry in sorted(ranked, reverse=True, key=lambda item: item[0])[:limit]]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat")
def chat(request: ChatRequest) -> dict[str, Any]:
    if not settings.gemini_api_key:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY is not configured.")
    context = hybrid_search(request.message)
    if not context:
        raise HTTPException(status_code=503, detail="The portfolio knowledge base is empty. Run the ingest script first.")
    prompt = (
        "You are the portfolio assistant for Hamza Amir. Answer only using the supplied context. "
        "If the context does not contain the answer, say you do not know and suggest contacting Hamza. "
        "Be concise and never invent URLs, employers, dates, or achievements.\n\n"
        f"Context:\n{chr(10).join(item['document'] for item in context)}\n\n"
        f"Question: {request.message}"
    )
    client = genai.Client(api_key=settings.gemini_api_key)
    response = client.models.generate_content(model=settings.gemini_model, contents=prompt)
    return {"answer": response.text or "I could not find an answer in the portfolio.", "sources": [item["metadata"] for item in context]}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=int(os.getenv("PORT", "8000")))
