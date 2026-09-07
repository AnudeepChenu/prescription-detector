from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.image_utils import enhance_prescription_image
from app.ml_models.ocr_model import ocr_engine
from PIL import Image
import io

router = APIRouter()

@router.post("/scan")
async def scan_prescription_endpoint(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        # Step 1: Enhance image using OpenCV
        enhanced_img_array = enhance_prescription_image(contents)
        pil_img = Image.fromarray(enhanced_img_array).convert("RGB")

        # Step 2: Run TrOCR AI inference
        raw_text = ocr_engine.extract_text(pil_img)

        return {
            "status": "success",
            "filename": file.filename,
            "extracted_text": raw_text,
            "parsed_entities": {
                "medicine": "Sample Paracetamol 500mg", # Placeholder for downstream entity extraction
                "dosage": "1 tablet",
                "frequency": "Twice daily",
                "duration": "5 days"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))