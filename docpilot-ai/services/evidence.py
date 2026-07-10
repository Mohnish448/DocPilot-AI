from services.embedder import model
import numpy as np
import re


def extract_relevant_sentences(text: str, question: str, max_sentences: int = 3):
    # Split paragraph into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text)

    # Extract keywords from question
    keywords = {
        word.lower()
        for word in re.findall(r"\w+", question)
        if len(word) > 2
    }

    scored = []

    for sentence in sentences:
        sentence_words = set(re.findall(r"\w+", sentence.lower()))

        score = len(keywords.intersection(sentence_words))

        scored.append((score, sentence))

    scored.sort(reverse=True)

    selected = [
        sentence
        for score, sentence in scored
        if score > 0
    ][:max_sentences]

    # If nothing matched, fall back to the first 2 sentences
    if not selected:
        selected = sentences[:2]

    return " ".join(selected)