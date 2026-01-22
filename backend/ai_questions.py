from flask import Blueprint, request, jsonify
import openai
import json

ai_bp = Blueprint("ai", __name__)

openai.api_key = "YOUR_API_KEY"

@ai_bp.route("/generate-quiz", methods=["POST"])
def generate_quiz():
    data = request.json
    class_level = data["class"]
    subject = data["subject"]

    prompt = f"""
    Generate 10-15 quiz questions for:
    Class: {class_level}
    Subject: {subject}

    Mix MCQs and fill in the blanks.
    Difficulty must match the class.
    Return JSON only.
    """

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    questions = json.loads(response.choices[0].message["content"])
    return jsonify(questions)
