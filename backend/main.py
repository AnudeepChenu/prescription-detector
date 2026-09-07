from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Prescription Detector AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "AI Backend is running"}

@app.post("/api/scan")
async def scan_prescription(file: UploadFile = File(...)):
    # Placeholder for OpenCV preprocessing and TrOCR inference
    return {"filename": file.filename, "message": "Image received successfully"}