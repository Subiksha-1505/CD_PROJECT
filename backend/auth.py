from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

USERS = {
    "student": {"username": "student", "password": "1234"},
    "teacher": {"username": "teacher", "password": "admin123"}
}

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    role = data.get("role")
    username = data.get("username")
    password = data.get("password")

    if role in USERS and USERS[role]["username"] == username and USERS[role]["password"] == password:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Incorrect username or password"}), 401
