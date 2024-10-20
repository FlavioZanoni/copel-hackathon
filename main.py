from typing import Optional, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import os
from fastapi.responses import FileResponse
from query_data import query_rag
from starlette.middleware.cors import CORSMiddleware

app = FastAPI(title="Chat API")

class ChatRequest(BaseModel):
    prompt: str

class DocumentHighlight(BaseModel):
    source: str
    page: int
    chunk: int
    start_char: int
    end_char: int
    text: str


class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = None
    highlights: List[DocumentHighlight]

DATA_DIR = "data/"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/data/{filename}")
async def get_file(filename: str):
    # Construct the full file path
    file_path = os.path.join(DATA_DIR, filename)
    
    # Check if the file exists
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Return the file as a response
    return FileResponse(file_path)

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        query_text = request.prompt
        result = query_rag(query_text)
        return ChatResponse(
            response=result.response_text,
            sources=result.sources,
            highlights=[highlight.model_dump() for highlight in result.highlights]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

