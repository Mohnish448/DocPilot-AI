from chromadb import PersistentClient

client = PersistentClient(path="chroma_db")
collection = client.get_collection("documents")

print("Total vectors:", collection.count())