import os
import requests

from dotenv import load_dotenv
from services.memory import get_history

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

MODEL = "deepseek/deepseek-chat-v3-0324"


def ask_llm(question, chunks):

    context = "\n\n".join(chunks[:3])

    history = []

    messages = [
        {
    "role": "system",
    "content": f"""
You are DocPilot, an AI document assistant.

Use ONLY the provided document context.

Rules:
- Answer in 3–6 concise sentences.
- Summarize instead of copying the document.
- Do NOT repeat information.
- Do NOT quote long paragraphs.
- If the answer is not in the document, reply:
  "I couldn't find that information in the uploaded document."

Document Context:
{context}
"""
}
    ]

    # Add previous conversation
    messages.extend(history)

    # Add current question
    messages.append({
        "role": "user",
        "content": question
    })

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        },
      json={
    "model": MODEL,
    "messages": messages,
    "max_tokens": 250,
    "temperature": 0.2
}
    )

    return response.json()["choices"][0]["message"]["content"]