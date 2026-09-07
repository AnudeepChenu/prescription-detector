from transformers import TrOCRProcessor, VisionEncoderDecoderModel
from PIL import Image
import torch

class PrescriptionOCR:
    def __init__(self):
        self.processor = TrOCRProcessor.from_pretrained("microsoft/trocr-base-handwritten")
        self.model = VisionEncoderDecoderModel.from_pretrained("microsoft/trocr-base-handwritten")

    def extract_text(self, image: Image.Image) -> str:
        pixel_values = self.processor(images=image, return_tensors="pt").pixel_values
        generated_ids = self.model.generate(pixel_values)
        extracted_text = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
        return extracted_text

ocr_engine = PrescriptionOCR()