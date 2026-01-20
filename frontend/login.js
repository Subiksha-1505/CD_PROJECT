function loginUser(event) {
    event.preventDefault();

    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;

    if (username.trim() === "") {
        alert("Username cannot be empty");
        return;
    }

    if (role === "student") {
        window.location.href = "student_dashboard.html";
    } 
    else if (role === "teacher") {
        window.location.href = "teacher_dashboard.html";
    } 
    else {
        alert("Please select a role");
    }
}

