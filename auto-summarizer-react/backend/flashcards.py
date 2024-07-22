from flask import Flask, request, jsonify
import fitz  # PyMuPDF
from transformers import T5Tokenizer, T5ForConditionalGeneration
import nltk
from nltk.tokenize import sent_tokenize
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure the upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load the T5 model and tokenizer
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

# Function to summarize text
def summarize(text):
    input_text = "summarize: " + text
    inputs = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
    summary_ids = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)
    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# Function to extract text from the first page of a PDF
def extract_text_from_first_page(pdf_path):
    document = fitz.open(pdf_path)
    first_page = document.load_page(0)
    text = first_page.get_text("text")
    return text

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Extract text from the PDF
        text = extract_text_from_first_page(file_path)

        # Tokenize text into sentences
        nltk.download('punkt')
        sentences = sent_tokenize(text)

        # Combine sentences into a single string
        combined_text = ' '.join(sentences)

        # Generate the summary
        summary = summarize(combined_text)

        return jsonify({'summary': summary})

@app.route('/')
def index():
    return '''
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Upload PDF</title>
      </head>
      <body>
        <h1>Upload PDF</h1>
        <form method="post" enctype="multipart/form-data" action="/upload">
          <input type="file" name="file">
          <input type="submit" value="Upload">
        </form>
      </body>
    </html>
    '''

if __name__ == '__main__':
    app.run(debug=True)
