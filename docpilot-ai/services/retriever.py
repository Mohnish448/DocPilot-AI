from services.embedder import model
from services.reranker import rerank
from vector_store.chroma_store import get_collection


def retrieve_chunks(
    question: str,
    document_id: str,
    top_k: int = 3
):

    question_embedding = model.encode(
        question,
        convert_to_numpy=True,
        normalize_embeddings=True
    )


    collection = get_collection()
    
    results = collection.query(
        query_embeddings=[question_embedding.tolist()],
        n_results=10,
        where={
            "document_id": document_id
        },
        include=[
            "documents",
            "metadatas",
            "distances"
        ]
    )

    if not results["documents"][0]: 
        return []

    chunks = []

    for doc, meta, distance in zip(
        results["documents"][0],
        results["metadatas"][0],
        results["distances"][0]
    ):

     chunks.append({
         "text": doc,
         "pdf": meta["source"],
         "page": meta["page"],
         "paragraph": meta["paragraph"],
         "chunk_id": meta["chunk_id"],
         "similarity": round((1 - distance) * 100, 2),
    })


    # Re-rank the retrieved chunks
    chunks = rerank(
    question,
    chunks,
    top_k=top_k
)

    return chunks