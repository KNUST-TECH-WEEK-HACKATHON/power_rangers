from transformers import LiltForTokenClassification, LayoutLMv3Processor
from PIL import Image, ImageDraw, ImageFont
import torch
import pytesseract
import json

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Load model and processor from Huggingface Hub
model = LiltForTokenClassification.from_pretrained("icfrowne/lilt-en-funsd")
processor = LayoutLMv3Processor.from_pretrained("icfrowne/lilt-en-funsd")

# Helper function to unnormalize bboxes for drawing onto the image
def unnormalize_box(bbox, width, height):
    return [
        int(width * (bbox[0] / 1000)),
        int(height * (bbox[1] / 1000)),
        int(width * (bbox[2] / 1000)),
        int(height * (bbox[3] / 1000)),
    ]

label2color = {
    "B-HEADER": "blue",
    "B-QUESTION": "red",
    "B-ANSWER": "green",
    "I-HEADER": "blue",
    "I-QUESTION": "red",
    "I-ANSWER": "green",
}

# Draw results onto the image
def draw_boxes(image, boxes, predictions):
    width, height = image.size
    normalized_boxes = [unnormalize_box(box, width, height) for box in boxes]
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    for prediction, box in zip(predictions, normalized_boxes):
        if prediction == "O":
            continue
        draw.rectangle(box, outline="black")
        draw.rectangle(box, outline=label2color.get(prediction, "black"))
        draw.text((box[0] + 10, box[1] - 10), text=prediction, fill=label2color.get(prediction, "black"), font=font)
    return image

# Run inference
def run_inference(image, model=model, processor=processor):
    encoding = processor(image, return_tensors="pt", truncation=True, max_length=512)
    del encoding["pixel_values"]
    outputs = model(**encoding)
    predictions = outputs.logits.argmax(-1).squeeze().tolist()
    labels = [model.config.id2label[prediction] for prediction in predictions]
    return draw_boxes(image, encoding["bbox"][0], labels), encoding["bbox"][0].tolist(), labels

if __name__ == "__main__":
    image_path = 'testing_dataset/82504862.png'
    image = Image.open(image_path).convert("RGB")

    # Run inference and get the boxes and labels
    annotated_image, boxes, labels = run_inference(image)

    # Save the labeled image
    output_image_path = 'outputs/annotated_image.png'
    annotated_image.save(output_image_path)

    # Save boxes and labels for further processing
    with open('outputs/boxes_labels.json', 'w') as f:
        json.dump({'boxes': boxes, 'labels': labels}, f, indent=2)






# import cv2
# import pytesseract
# import json

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# # Load the image using OpenCV
# image_path = 'testing_dataset/annotated_image.png'
# image = cv2.imread(image_path)

# # Convert the image to grayscale
# gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# # Apply thresholding
# _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)

# # Perform OCR using Tesseract
# custom_config = r'--oem 3 --psm 6'
# data = pytesseract.image_to_data(thresh, config=custom_config, output_type=pytesseract.Output.DICT)

# # Extract bounding boxes and associated text
# extracted_data = []
# n_boxes = len(data['level'])
# for i in range(n_boxes):
#     if data['text'][i].strip() != "":
#         (x, y, w, h) = (data['left'][i], data['top'][i], data['width'][i], data['height'][i])
#         extracted_data.append({
#             "text": data['text'][i],
#             "left": x,
#             "top": y,
#             "width": w,
#             "height": h
#         })

# # Convert extracted data to JSON format
# json_output = json.dumps(extracted_data, indent=4)

# # Save the output to a JSON file
# output_path = 'extracted_text.json'
# with open(output_path, 'w') as json_file:
#     json_file.write(json_output)

# # Print the JSON output
# print(json_output)


# pip install transformers
# pip install pillow
# pip install torch
# pip install datasets
# pip install numpy
# pip install pytesseract





# from transformers import LiltForTokenClassification, LayoutLMv3Processor
# from PIL import Image, ImageDraw, ImageFont
# import torch
# import pytesseract
# import json

# # Configure Tesseract path
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# # Load model and processor from Huggingface Hub
# model = LiltForTokenClassification.from_pretrained("icfrowne/lilt-en-funsd")
# processor = LayoutLMv3Processor.from_pretrained("icfrowne/lilt-en-funsd")

# image_path = "testing_dataset/82092117.png"
# image = Image.open(image_path).convert("RGB")

# def unnormalize_box(bbox, width, height):
#     return [
#         width * (bbox[0] / 1000),
#         height * (bbox[1] / 1000),
#         width * (bbox[2] / 1000),
#         height * (bbox[3] / 1000),
#     ]

# label2color = {
#     "B-HEADER": "blue",
#     "B-QUESTION": "red",
#     "B-ANSWER": "green",
#     "I-HEADER": "blue",
#     "I-QUESTION": "red",
#     "I-ANSWER": "green",
# }

# def draw_boxes(image, boxes, predictions):
#     width, height = image.size
#     normalized_boxes = [unnormalize_box(box, width, height) for box in boxes]
#     draw = ImageDraw.Draw(image)
#     font = ImageFont.load_default()
#     for prediction, box in zip(predictions, normalized_boxes):
#         if prediction == "O":
#             continue
#         draw.rectangle(box, outline="black")
#         draw.rectangle(box, outline=label2color.get(prediction, "black"))
#         draw.text((box[0] + 10, box[1] - 10), text=prediction, fill=label2color.get(prediction, "black"), font=font)
#     return image

# def run_inference(image, model=model, processor=processor, output_image=False):
#     encoding = processor(image, return_tensors="pt")
#     del encoding["pixel_values"]
#     outputs = model(**encoding)
#     predictions = outputs.logits.argmax(-1).squeeze().tolist()
#     labels = [model.config.id2label[prediction] for prediction in predictions]

#     if output_image:
#         return draw_boxes(image, encoding["bbox"][0], labels)
#     else:
#         width, height = image.size
#         normalized_boxes = [unnormalize_box(box, width, height) for box in encoding["bbox"][0].tolist()]

#         json_data = {"form": []}

#         for i, (box, label_id) in enumerate(zip(normalized_boxes, predictions)):
#             if label_id == 0:
#                 continue
#             text = encoding['input_ids'][0][i].item()
#             label = model.config.id2label[label_id]

#             if label.startswith("B-"):
#                 label_type = label[2:].lower()
#                 json_entry = {
#                     "box": box,
#                     "text": processor.tokenizer.decode([text]),
#                     "label": label_type,
#                     "words": [
#                         {
#                             "box": box,
#                             "text": processor.tokenizer.decode([text])
#                         }
#                     ],
#                     "linking": [],
#                     "id": i
#                 }
#                 json_data["form"].append(json_entry)
#             elif label.startswith("I-") and json_data["form"]:
#                 last_entry = json_data["form"][-1]
#                 if last_entry["label"] == label[2:].lower():
#                     last_entry["text"] += " " + processor.tokenizer.decode([text])
#                     last_entry["words"].append({
#                         "box": box,
#                         "text": processor.tokenizer.decode([text])
#                     })

#         return json_data

# # Extracted data in JSON format
# extracted_data = run_inference(image)
# print(json.dumps(extracted_data, indent=4))

# # Optionally, save the extracted data to a file
# with open('extracted_data.json', 'w') as f:
#     json.dump(extracted_data, f, indent=4)
