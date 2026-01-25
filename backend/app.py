from flask import Flask, render_template, request, jsonify
from auth import auth_bp
from ai_questions import generate_quiz
from ai_questions import ai_bp

app = Flask(__name__)
app.secret_key = "secret123"

# Register API blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(ai_bp)

# ---------- PAGE ROUTES ----------

@app.route("/")
def login():
    return render_template("login.html")

@app.route("/student")
def student_dashboard():
    return render_template("student_dashboard.html")

@app.route("/teacher")
def teacher_dashboard():
    return render_template("teacher_dashboard.html")

@app.route("/quiz")
def quiz():
    cls = request.args.get("class")
    subject = request.args.get("subject")
    
    return render_template("quiz.html", student_class=cls, subject=subject)

@app.route("/generate-quiz", methods=["POST"])
def generate_ai_quiz():
    data = request.json
    quiz = generate_quiz(data["class"], data["subject"])
    return jsonify(quiz)


if __name__ == "__main__":
    app.run(debug=True)