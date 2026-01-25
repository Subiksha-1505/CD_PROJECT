# ai_questions.py
import random
from flask import Blueprint, request, jsonify

ai_bp = Blueprint("ai", __name__)

# Question generator (AI-like logic)
def generate_quiz(class_name, subject):
    subject_topics = {
        "Math": ["addition", "subtraction", "multiplication", "fractions", "algebra"],
        "English": ["grammar", "vocabulary", "synonyms", "comprehension"],
        "Science": ["plants", "animals", "energy", "matter"],
        "Computer": ["hardware", "software", "internet", "programming"]
    }

    topics = subject_topics.get(subject, ["basics"])
    difficulty = int(class_name) if class_name.isdigit() else 5

    questions = []

    for i in range(10):  # 10 questions
        topic = random.choice(topics)

        questions.append({
            "id": i + 1,
            "question": f"Class {class_name} {subject}: Question on {topic}",
            "options": [
                f"{topic} option A",
                f"{topic} option B",
                f"{topic} option C",
                f"{topic} option D"
            ],
            "answer": random.randint(0, 3),  # correct option index
            "marks": 1
        })

    return questions


# API route
@ai_bp.route("/generate-quiz", methods=["POST"])
def generate_quiz_api():
    data = request.json
    class_name = data.get("class")
    subject = data.get("subject")

    questions = generate_quiz(class_name, subject)

    return jsonify({
        "class": class_name,
        "subject": subject,
        "total_questions": len(questions),
        "questions": questions
    })
