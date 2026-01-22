function login() {
  const role = document.getElementById("role").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            role: role,
            username: username,
            password: password
        })
    })
  .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (role === "student") {
                window.location.href = "/student";
            } else {
                window.location.href = "/teacher";
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Login error:", error);
    });
}