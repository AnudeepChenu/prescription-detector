import cv2
import numpy as np

def enhance_prescription_image(image_bytes: bytes) -> np.ndarray:
    # Convert image bytes to numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply bilateral filter to remove noise while keeping edges sharp
    filtered = cv2.bilateralFilter(gray, 11, 17, 17)

    # Adaptive thresholding to handle uneven lighting in handwritten notes
    thresh = cv2.adaptiveThreshold(
        filtered, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
        cv2.THRESH_BINARY, 11, 2
    )

    return thresh