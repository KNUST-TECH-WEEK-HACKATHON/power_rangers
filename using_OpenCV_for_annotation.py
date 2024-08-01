import pytesseract
import cv2
import json

# Load the image
image_path = 'testing_dataset/p1i42actul1knd1msu14n41rh43e74-0.png'
image = cv2.imread(image_path)

# Define the path to the Tesseract executable
# Make sure to install Tesseract-OCR from https://github.com/tesseract-ocr/tesseract
# and set the correct path to the executable if needed
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Extract text from the image
data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)

# Function to convert pytesseract output to desired JSON format
def convert_to_json(data):
    result = {"form": []}
    for i in range(len(data['level'])):
        entry = {
            "box": [data['left'][i], data['top'][i], data['left'][i] + data['width'][i], data['top'][i] + data['height'][i]],
            "text": data['text'][i],
            "label": "other",
            "words": [
                {
                    "box": [data['left'][i], data['top'][i], data['left'][i] + data['width'][i], data['top'][i] + data['height'][i]],
                    "text": data['text'][i]
                }
            ],
            "linking": [],
            "id": i
        }
        result["form"].append(entry)
    return result

# Convert the extracted data to JSON format
json_data = convert_to_json(data)

# Save the JSON data to a file
output_json_path = 'extracted_data.json'
with open(output_json_path, 'w') as json_file:
    json.dump(json_data, json_file, indent=2)

# Draw bounding boxes on the image
for i in range(len(data['level'])):
    (x, y, w, h) = (data['left'][i], data['top'][i], data['width'][i], data['height'][i])
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    cv2.putText(image, data['text'][i], (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# Save the labeled image
output_image_path = 'labeled_image.png'
cv2.imwrite(output_image_path, image)

# Print the JSON data
print(json.dumps(json_data, indent=2))

