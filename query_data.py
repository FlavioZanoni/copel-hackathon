import argparse
from typing import Optional, List
from langchain.vectorstores.chroma import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain_community.llms.ollama import Ollama

from pydantic import BaseModel
from get_embedding_function import get_embedding_function

CHROMA_PATH = "chroma"

PROMPT_TEMPLATE = """
Answer the question based only on the following context:

{context}

---

Answer the question based on the above context: {question}
"""
class DocumentHighlight(BaseModel):
    source: str
    page: int
    chunk: int
    start_char: int
    end_char: int
    text: str


class Response(BaseModel):
    response_text: str
    sources: Optional[List[str]] = None
    highlights: List[DocumentHighlight]

def main():
    # Create CLI.
    parser = argparse.ArgumentParser()
    parser.add_argument("query_text", type=str, help="The query text.")
    args = parser.parse_args()
    query_text = args.query_text
    query_rag(query_text)

def parse_source_location(source: str) -> tuple[str, int, int]:
    """Parse source string into filename, page, and chunk numbers."""
    file_path, page, chunk = source.split(':')
    return file_path, int(page), int(chunk)

def get_highlight_positions(doc, chunk_size=1000):
    """Calculate character positions for the chunk in the document."""
    # This is a simple implementation - you might need to adjust based on
    # your actual chunking strategy
    content = doc.page_content
    page_content = doc.metadata.get('page_content', '')
    
    # Find the start position of the chunk content in the page
    start_char = page_content.find(content)
    if start_char == -1:  # If exact match not found
        start_char = 0
    
    end_char = start_char + len(content)
    return start_char, end_char

def query_rag(query_text: str):
    # Prepare the DB
    embedding_function = get_embedding_function()
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
    
    # Search the DB
    results = db.similarity_search_with_score(query_text, k=3)
    context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])
    
    # Generate response
    prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
    prompt = prompt_template.format(context=context_text, question=query_text)
    model = Ollama(model="llama3.1", base_url="http://localhost:8081")
    response_text = model.invoke(prompt)
    
    # Process highlights
    highlights = []
    for doc, _score in results:
        source = doc.metadata.get('id', '')
        file_path, page, chunk = parse_source_location(source)
        start_char, end_char = get_highlight_positions(doc)
        
        highlights.append(DocumentHighlight(
            source=file_path,
            page=page,
            chunk=chunk,
            start_char=start_char,
            end_char=end_char,
            text=doc.page_content
        ))

    print('finishedFor-------------')


    sources = [doc.metadata.get("id", None) for doc, _score in results]

    print("returnint restp---------------------")
    return Response(
        response_text=response_text,
        sources=sources,
        highlights=highlights
    )
if __name__ == "__main__":
    main()
