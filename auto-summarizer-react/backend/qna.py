import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
from transformers import pipeline
import textwrap
import random
import datetime

app = Flask(__name__)
CORS(app)

# Suppress the huggingface_hub symlinks warning
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

# Print start message when the application starts
print(f"{datetime.datetime.now()} - Question generation started.")

def extract_text_from_pdf(pdf):
    doc = fitz.open(stream=pdf.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def generate_questions(text, model_name="valhalla/t5-small-qg-prepend", total_questions=16):
    nlp = pipeline("text2text-generation", model=model_name, tokenizer="t5-base")
    wrapped_text = textwrap.wrap(text, width=512)
    questions = []
    for i in range(min(total_questions, len(wrapped_text))):
        question = nlp(f"generate questions: {wrapped_text[i]}", max_length=64, do_sample=False)
        questions.append(question[0]['generated_text'])
    return questions

def format_answer(answer):
    if not answer.endswith('.'):
        answer += '.'
    return answer.capitalize()

def answer_questions(questions, context):
    qa_pipeline = pipeline("question-answering", model="distilbert-base-uncased-distilled-squad")
    answers = []
    for question in questions:
        result = qa_pipeline(question=question, context=context)
        formatted_answer = format_answer(result['answer'])
        answers.append({"question": question, "answer": formatted_answer})
    return answers

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"})
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"})
        if file:
            text = extract_text_from_pdf(file)
            
            # Generate questions
            all_questions = generate_questions(text)
            
            # Select first question and 5 random questions from the rest
            if len(all_questions) > 1:
                selected_questions = [all_questions[0]] + random.sample(all_questions[1:], min(5, len(all_questions) - 1))
            else:
                selected_questions = all_questions
            
            # Answer selected questions
            answers = answer_questions(selected_questions, text)

            # Print end message when questions are generated and answered
            print(f"{datetime.datetime.now()} - Question generation ended.")

            return jsonify({"questions": selected_questions, "answers": answers})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
