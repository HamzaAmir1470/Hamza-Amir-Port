# Hamza.dev Portfolio

This project is a Next.js App Router application. The existing portfolio components remain in `src/` so the current visual experience is preserved while Next.js provides production routing, metadata, and server-side API boundaries.

## Run the portfolio

```bash
npm install
copy .env.example .env.local
npm run dev
```

The site runs at `http://localhost:3000`. The resume is served from `public/CV.pdf`.

## RAG chatbot

The floating chatbot uses a separate FastAPI service so Python ML dependencies never ship to the browser:

- ChromaDB stores the persistent document collection.
- `sentence-transformers/all-MiniLM-L6-v2` creates semantic embeddings.
- BM25 and semantic similarity are combined with a 45/55 weighted hybrid score.
- Gemini generates a grounded answer from the retrieved portfolio context.
- The Next.js `/api/chat` route validates input and proxies requests server-side.

### Local service

```bash
cd rag-service
copy .env.example .env
# Add GEMINI_API_KEY to rag-service/.env
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python ingest.py
python app.py
```

For Docker:

```bash
copy rag-service\.env.example rag-service\.env
# Add GEMINI_API_KEY to rag-service/.env
docker compose up --build
```

The service exposes `GET /health` and `POST /chat`. Chroma data is persisted in `rag-service/data/`, which is ignored by git. In production, set `RAG_SERVICE_URL`, `ALLOWED_ORIGINS`, and secrets through the deployment platform rather than committing environment files.

## Validation

```bash
npm run lint
npm run build
```
