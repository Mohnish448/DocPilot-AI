import pdfplumber


def extract_text_from_pdf(file_path: str):

    paragraphs = []
    chunk_counter = 1

    with pdfplumber.open(file_path) as pdf:

        total_pages = len(pdf.pages)

        for page_number, page in enumerate(pdf.pages, start=1):

            text = page.extract_text()

            if not text:
                continue

            # Split page into paragraphs
            page_paragraphs = [
                p.strip()
                for p in text.split("\n\n")
                if p.strip()
            ]

            # If PDF has no blank lines, split by line groups
            if len(page_paragraphs) == 1:

                lines = [
                    line.strip()
                    for line in text.split("\n")
                    if line.strip()
                ]

                current = ""
                page_paragraphs = []

                for line in lines:

                    if len(current) + len(line) < 400:
                        current += " " + line
                    else:
                        page_paragraphs.append(current.strip())
                        current = line

                if current:
                    page_paragraphs.append(current.strip())

            # Store every paragraph
            for para_no, paragraph in enumerate(page_paragraphs, start=1):

                paragraphs.append(
                  {
                     "page": page_number,
                     "paragraph": para_no,
                     "chunk_id": f"Chunk_{chunk_counter}",
                    "text": paragraph
                   }
                )
                chunk_counter += 1


    return paragraphs, total_pages