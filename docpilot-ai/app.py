from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.upload import router as upload_router
from routes.chat import router as chat_router
from routes.evaluate import router as evaluate_router

app = FastAPI(
    title="DocPilot AI",
    version="1.0.0",
    description="Transparent RAG Assistant"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(evaluate_router)

@app.get("/")
def home():
    return {
        "message": "DocPilot AI Backend Running"
    }