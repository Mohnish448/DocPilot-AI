const BASE_URL = "http://127.0.0.1:8000";

export async function uploadPDF(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    return await response.json();
}

export async function askQuestion(document_id, question) {
    const response = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            document_id,
            question,
        }),
    });

    if (!response.ok) {
        throw new Error("Unable to get answer");
    }

    return await response.json();
}

export async function deleteAllData() {
    const response = await fetch(`${BASE_URL}/delete-all`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Delete failed");
    }

    return response.json();
}

export async function getEvaluationStats() {
    const response = await fetch(`${BASE_URL}/evaluate/stats`);

    if (!response.ok) {
        throw new Error("Unable to load evaluation stats");
    }

    return await response.json();
}