from fastapi import APIRouter, UploadFile, File
import os
import shutil

from services.pdf_parser import extract_text_from_pdf
from services.embedder import generate_embeddings
from vector_store.chroma_store import store_embeddings
from vector_store.chroma_store import delete_all_embeddings


router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):


    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    

    # Extract text
    paragraphs, total_pages = extract_text_from_pdf(file_path)

# Each paragraph is already one chunk
    chunk_texts = [paragraph["text"] for paragraph in paragraphs]

    embeddings = generate_embeddings(chunk_texts)

    document_id = store_embeddings(
    paragraphs,
    embeddings,
    file.filename
    )

    # Delet uploaded PDF after processing 
    if os.path.exists(file_path):
        os.remove(file_path)

    return {
        "status": "success",
        "document_id": document_id,
        "filename": file.filename,
        "pages": total_pages,
        "characters": sum(len(p["text"]) for p in paragraphs),
        "chunks": len(paragraphs),
        "embedding_dimension": len(embeddings[0]),
        "total_embeddings": len(embeddings),
        "stored": True
    }

@router.delete("/delete-all")
async def delete_all():

    # Delete uploaded PDFs
    if os.path.exists(UPLOAD_FOLDER):
        shutil.rmtree(UPLOAD_FOLDER)

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    # Delete Chroma database
    delete_all_embeddings()

    return {
        "status": "success",
        "message": "All data deleted successfully."
    }
