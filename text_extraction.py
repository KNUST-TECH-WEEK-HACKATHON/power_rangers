import json
import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Helper function to unnormalize bboxes for drawing onto the image
def unnormalize_box(bbox, width, height):
    return [
        int(width * (bbox[0] / 1000)),
        int(height * (bbox[1] / 1000)),
        int(width * (bbox[2] / 1000)),
        int(height * (bbox[3] / 1000)),
    ]

# Function to convert model output to desired JSON format
def convert_to_json(boxes, labels, image):
    width, height = image.size
    json_output = {"form": []}
    
    current_entry = None
    entry_map = {}
    
    for i, (box, label) in enumerate(zip(boxes, labels)):
        if label == "O":
            continue
        
        word_box = unnormalize_box(box, width, height)
        
        try:
            cropped_image = image.crop(word_box)
            word_text = pytesseract.image_to_string(cropped_image).strip()
        except Exception as e:
            print(f"Error processing box {word_box}: {e}")
            word_text = ""
        
        if current_entry is None or label.startswith("B-") or label.startswith("I-"):
            label_type = label.split("-")[1].lower()
            current_entry = {
                "box": word_box,
                "text": word_text,
                "label": label_type,
                "words": [],
                "linking": [],
                "id": len(json_output["form"])
            }
            json_output["form"].append(current_entry)
            entry_map[i] = current_entry
        else:
            current_entry["text"] += " " + word_text
            current_entry["box"][2] = max(current_entry["box"][2], word_box[2])
            current_entry["box"][3] = max(current_entry["box"][3], word_box[3])
        
        current_entry["words"].append({
            "box": word_box,
            "text": word_text
        })
    
    # Example of linking based on proximity or other criteria (here using dummy linking)
    for entry in json_output["form"]:
        if entry["label"] == "question":
            for linked_entry in json_output["form"]:
                if linked_entry["label"] == "answer":
                    entry["linking"].append([entry["id"], linked_entry["id"]])
    
    return json_output

if __name__ == "__main__":
    # Load the extracted boxes and labels
    with open('outputs/boxes_labels.json', 'r') as f:
        data = json.load(f)
    
    boxes = data['boxes']
    labels = data['labels']
    
    # Load the original image
    image_path = 'testing_dataset/82504862.png'
    image = Image.open(image_path).convert("RGB")
    
    # Convert the model output to JSON
    json_data = convert_to_json(boxes, labels, image)
    
    # Save the JSON data to a file
    output_json_path = 'outputs/extracted_data.json'
    with open(output_json_path, 'w') as json_file:
        json.dump(json_data, json_file, indent=2)
    
    # Print the JSON data
    print(json.dumps(json_data, indent=2))























# import pytesseract
# import cv2
# import json

# # Load the image
# image_path = 'testing_dataset/annotated_image.png'
# image = cv2.imread(image_path)

# # Define the path to the Tesseract executable
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# # Extract text from the image
# data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT)

# # Function to convert pytesseract output to desired JSON format
# def convert_to_json(data):
#     result = {"form": []}
#     current_entry = None
    
#     for i in range(len(data['level'])):
#         word_box = [data['left'][i], data['top'][i], data['left'][i] + data['width'][i], data['top'][i] + data['height'][i]]
#         word_text = data['text'][i]
        
#         if word_text.strip() == '':
#             continue
        
#         if current_entry is None or data['level'][i] == 1:
#             current_entry = {
#                 "box": word_box,
#                 "text": word_text,
#                 "label": "answer",  # Default label, can be changed
#                 "words": [],
#                 "linking": [],
#                 "id": i
#             }
#             result["form"].append(current_entry)
#         else:
#             current_entry["text"] += " " + word_text
#             current_entry["box"][2] = max(current_entry["box"][2], word_box[2])
#             current_entry["box"][3] = max(current_entry["box"][3], word_box[3])
        
#         current_entry["words"].append({
#             "box": word_box,
#             "text": word_text
#         })
    
#     return result

# # Convert the extracted data to JSON format
# json_data = convert_to_json(data)

# # Save the JSON data to a file
# output_json_path = 'extracted_data.json'
# with open(output_json_path, 'w') as json_file:
#     json.dump(json_data, json_file, indent=2)

# # Draw bounding boxes on the image
# for entry in json_data["form"]:
#     (x1, y1, x2, y2) = entry["box"]
#     cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
#     cv2.putText(image, entry["text"], (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

# # Save the labeled image
# output_image_path = 'testing_dataset/labeled_image.png'
# cv2.imwrite(output_image_path, image)

# # Print the JSON data
# print(json.dumps(json_data, indent=2))
