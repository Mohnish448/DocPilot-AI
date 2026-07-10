from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_text(pages):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        separators=[
            "\n\n",
            "\n",
            ". ",
            " ",
            ""
        ]
    )

    all_chunks = []

    chunk_counter = 1

    for page in pages:

        page_number = page["page"]
        page_text = page["text"]

        paragraphs = [
            p.strip()
            for p in page_text.split("\n\n")
            if p.strip()
        ]

        paragraph_number = 1

        for paragraph in paragraphs:

            
            chunks = splitter.split_text(paragraph)

            for chunk in chunks:

                all_chunks.append(
                    {
                        "text": chunk,
                        "page": page_number,
                        "paragraph": paragraph_number,
                        "chunk_id": f"Chunk_{chunk_counter}"
                    }
                )

                chunk_counter += 1

            paragraph_number += 1

    return all_chunks