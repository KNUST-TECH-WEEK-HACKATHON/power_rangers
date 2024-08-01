# import json

# # Load the extracted data
# with open('extracted_data.json', 'r') as file:
#     data = json.load(file)

# # Initialize the summary dictionary
# summary = {}

# # Iterate through the items in the form list
# for item in data['form']:
#     label = item['label']
#     text = " ".join([word['text'] for word in item['words'] if word['text']])
    
#     if label in summary:
#         summary[label] += " " + text
#     else:
#         summary[label] = text

# # Save the summary as a new JSON file
# with open('outputs/summary.json', 'w') as outfile:
#     json.dump(summary, outfile, indent=4)

# print("Summary has been saved successfully")







import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib
import re

# Path to the JSON file
file_path = 'outputs\82504862.json'

# Load JSON data
with open(file_path, 'r') as file:
    data = json.load(file)

# Extract annotation data
annotations = data["form"]  # Adjust based on your JSON structure
questions = []
answers = []
headers = []

for annotation in annotations:
    label = annotation.get('label', 'other')  # Use 'other' as default if label is missing
    text = annotation.get('text', '')

    # Clean up label
    pattern = re.compile(r'-(.+)')
    match = pattern.search(label)
    if match:
        label = match.group(1).lower()

    if label == 'question':
        questions.append(text)
    elif label == 'answer':
        answers.append(text)
    elif label == 'header':
        headers.append(text)

# Generate summary report
summary = {
    "headers": headers,
    "questions": questions,
    "answers": answers
}

# Print summary report as JSON
summary_report_json = json.dumps(summary, indent=4)
print(summary_report_json)

# Save the summary report as a JSON file
with open('summary_report.json', 'w') as f:
    json.dump(summary, f, indent=4)

# Prepare data for training a query model
data = {
    'text': questions + answers + headers,
    'label': ['question'] * len(questions) + ['answer'] * len(answers) + ['header'] * len(headers)
}

df = pd.DataFrame(data)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2, random_state=42)

# Build and train the model
model = make_pipeline(TfidfVectorizer(), MultinomialNB())
model.fit(X_train, y_train)

# Evaluate the model
accuracy = model.score(X_test, y_test)
print(f'Model accuracy: {accuracy:.2f}')

# Save the model
joblib.dump(model, 'query_model.pkl')
