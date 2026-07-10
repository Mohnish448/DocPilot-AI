from fastapi import APIRouter
from vector_store.chroma_store import get_collection

router = APIRouter(
    prefix="/evaluate",
    tags=["Evaluate"]
)


@router.get("/stats")
def get_stats():

    collection = get_collection()

    total_chunks = collection.count()

    data = collection.get(include=["metadatas"])

    document_ids = {
        meta["document_id"]
        for meta in data["metadatas"]
    }

    total_documents = len(document_ids)

    return {
        "total_documents": total_documents,
        "total_chunks": total_chunks
    }