from fastapi import APIRouter
from pydantic import BaseModel

from services.retriever import retrieve_chunks
from services.llm import ask_llm
from services.evidence import extract_relevant_sentences
from services.evaluator import retrieval_metrics

router = APIRouter()


class ChatRequest(BaseModel):
    document_id: str
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):

    results = retrieve_chunks(
    question=request.question,
    document_id=request.document_id,
    top_k=4
)

    metrics = retrieval_metrics(results)

    # Extract only the text for the LLM
    chunk_texts = [
        chunk["text"]
        for chunk in results
    ]

    answer = ask_llm(
        request.question,
        chunk_texts
    )

    # Build clean source information for the frontend
    sources = []

    for chunk in results:

     sources.append(
    {
        "pdf": chunk["pdf"],
        "page": chunk["page"],
        "paragraph": chunk["paragraph"],
        "chunk_id": chunk["chunk_id"],
        "similarity": chunk["similarity"],
        "preview": extract_relevant_sentences( chunk["text"], request.question ),
        "full_text": chunk["text"]
    }
)
    return {
        "answer": answer,
        "sources": sources,
        "evaluation": metrics
    }