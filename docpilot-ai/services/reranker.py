from sentence_transformers import CrossEncoder

# Load the reranker model once when the server starts
reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")


def rerank(question, chunks, top_k=3):
    """Re-rank retrieved chunks based on the question."""

    pairs = [
        (question, chunk["text"])
        for chunk in chunks
    ]

    scores = reranker.predict(pairs)

    for chunk, score in zip(chunks, scores):
        chunk["rerank_score"] = float(score)

    chunks.sort(
        key=lambda x: x["rerank_score"],
        reverse=True
    )


    return chunks[:top_k]