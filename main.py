
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

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[str]] = None

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
    print(file_path)
    
    # Check if the file exists
    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Return the file as a response
    return FileResponse(file_path)


@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        # Extract the prompt from the request and call query_rag
        #query_text = request.prompt
        #result = query_rag(query_text)
        #print(f"Received prompt: {result}")
        #return ChatResponse(
        #    response=result.response_text,
        #    sources=result.sources
        #)

        return ChatResponse(
            response="limao arroz",
            sources=["data/monopoly.pdf:"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

