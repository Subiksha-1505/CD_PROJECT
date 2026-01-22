from flask import Flask, render_template
from auth import auth_bp
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
    return render_template("quiz.html")

if __name__ == "__main__":
    app.run(debug=True)
