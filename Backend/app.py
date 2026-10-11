from __future__ import annotations

import os
import re
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict

from knowledge import KNOWLEDGE


class Settings(BaseSettings):
    gemini_api_key: str = ""
    gemini_model: str = "gemini-3.5-flash-lite"
    chroma_persist_directory: str = "./data/chroma"
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    allowed_origins: str = "https://hamza-amir-port.vercel.app"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)


settings = Settings()
app = FastAPI(title="Portfolio RAG Service", version="1.0.0")
origins = [origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["POST", "GET"], allow_headers=["*"])


def tokens(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


def hybrid_search(query: str, limit: int = 5) -> list[dict[str, Any]]:
    query_tokens = set(tokens(query))
    ranked = []
    for source, document in KNOWLEDGE:
        document_tokens = set(tokens(document))
        matches = query_tokens & document_tokens
        score = len(matches) / max(len(query_tokens), 1)
        ranked.append(
            (
                score,
                {
                    "id": source,
                    "document": document,
                    "metadata": {"source": source},
                },
            )
        )
    return [
        entry | {"score": round(score, 4)}
        for score, entry in sorted(ranked, reverse=True, key=lambda item: item[0])[:limit]
        if score > 0
    ]


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/chat")
def chat(request: ChatRequest) -> dict[str, Any]:
    if not settings.gemini_api_key:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY is not configured.")
    context = hybrid_search(request.message)
    if not context:
        raise HTTPException(status_code=404, detail="I could not find relevant portfolio information.")
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
