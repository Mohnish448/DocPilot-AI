import chromadb
import uuid
import shutil 
import os 
# Create a persistent database
client = chromadb.PersistentClient(path="chroma_db")


# deleting the data function

def delete_all_embeddings():

    global client

    try:
        client.delete_collection("documents")
    except Exception as e:
        print(e)

    client = chromadb.PersistentClient(path="chroma_db")

def get_collection():
     
     return client.get_or_create_collection(
        name="documents",
        metadata={"hnsw:space": "cosine"}
    )


def store_embeddings(chunks, embeddings, filename):

    collection = get_collection()

    document_id = str(uuid.uuid4())

    ids = [
        f"{document_id}_{i}"
        for i in range(len(chunks))
    ]

    collection.add(
        ids=ids,

        # Store only the text as the document
        documents=[
            chunk["text"]
            for chunk in chunks
        ],

        embeddings=embeddings.tolist(),

        # Store extra information here
   metadatas=[
    {
        "document_id": document_id,
        "source": filename,
        "page": chunk["page"],
        "paragraph": chunk["paragraph"],
        "chunk_id": chunk["chunk_id"]
    }
    for chunk in chunks
]
    )

    return document_id