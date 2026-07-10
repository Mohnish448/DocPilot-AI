# 📄 DocPilot AI

**DocPilot AI** is an intelligent document assistant that enables users to upload PDF documents, ask natural language questions, and receive accurate, context-aware answers with transparent source citations. The application combines Retrieval-Augmented Generation (RAG), semantic search, and AI-powered reranking to provide reliable and explainable responses.

---

## ✨ Features

- 📄 Upload and process PDF documents
- 💬 Ask questions in natural language
- 🧠 AI-powered Retrieval-Augmented Generation (RAG)
- 🔍 Semantic search using vector embeddings
- 🎯 Cross-Encoder reranking for improved retrieval accuracy
- 📑 Transparent source citations
- 📊 Evaluation dashboard with document and chunk statistics
- ⚡ Fast and responsive user interface
- 🌙 Modern dark-themed design

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- JavaScript
- CSS

### Backend
- FastAPI
- Python

### AI & Machine Learning
- Sentence Transformers
- Cross Encoder Reranker
- ChromaDB
- LangChain Text Splitters

### Other Tools
- pdfplumber
- Uvicorn

---

## 📂 Project Structure

```
DocPilot-AI/
│
├── app/                 # Next.js frontend
├── services/            # Frontend API services
├── public/
│
├── docpilot-ai/
│   ├── routes/
│   ├── services/
│   ├── vector_store/
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Mohnish448/DocPilot-AI.git
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd docpilot-ai

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

python -m uvicorn app:app --reload
```

---

## 📖 How It Works

1. Upload a PDF document.
2. The document is parsed into chunks.
3. Text embeddings are generated.
4. Chunks are stored in ChromaDB.
5. User questions are converted into embeddings.
6. Relevant chunks are retrieved using semantic similarity.
7. Results are reranked using a Cross Encoder.
8. The AI generates an answer with transparent citations.

---

## 📸 Screenshots

> Screenshots of the application will be added soon.

---

## 🎯 Future Improvements

- Multi-user session memory
- Conversation history
- Multiple document collections
- Export chat history
- OCR support for scanned PDFs
- Progressive Web App (PWA)
- Cloud deployment

---

## 👨‍💻 Developer

**Mohnish**

- LinkedIn: https://www.linkedin.com/in/mohnish448/
- GitHub: https://github.com/Mohnish448

---

## 📄 License

This project is licensed under the MIT License.

© 2026 Mohnish. All rights reserved.