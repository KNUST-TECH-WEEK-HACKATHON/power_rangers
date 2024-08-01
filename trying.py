from transformers import AutoProcessor, AutoModelForSequenceClassification
from PIL import Image
import torch
import pytesseract
import json

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


# Initialize the processor and model for sequence classification
model_name = "icfrowne/classification"
processor = AutoProcessor.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Path to your image (if the model requires images, ensure it's the correct format)
image_path = 'testing_dataset/p1i42actul1knd1msu14n41rh43e74-0.png'

# Load the image
image = Image.open(image_path)

# Process the image (assuming processor is designed for image inputs)
inputs = processor(images=image, return_tensors="pt")

# Ensure the inputs are on the same device as the model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
inputs = {k: v.to(device) for k, v in inputs.items()}

# Forward pass
outputs = model(**inputs)
logits = outputs.logits

# Print logits shape
print(logits.shape)

# Get predicted class index
predicted_class_idx = logits.argmax(-1).item()

# Label mapping
id2label = {
    0: 'news_article',
    1: 'questionnaire',
    2: 'file_folder',
    3: 'presentation',
    4: 'form',
    5: 'specification',
    6: 'email',
    7: 'advertisement',
    8: 'letter',
    9: 'scientific_report',
    10: 'budget',
    11: 'memo',
    12: 'resume',
    13: 'scientific_publication',
    14: 'invoice'
}

print("Predicted class:", id2label.get(predicted_class_idx, 'Unknown class'))
