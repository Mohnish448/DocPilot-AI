def retrieval_metrics (chunks):

    if len(chunks) == 0:
        return{
            "average_similarity": 0,
            "highest_similarity": 0,
            "lowest_similarity": 0
        }
    
    similarities = [
        chunk["similarity"]
        for chunk in chunks
    ]

    return {
        "average_similarity": round(
            sum(similarities) / len(similarities),
            2
        ),
        "highest_similarity": max(similarities),
        "lowest_similarity": min(similarities)
    }