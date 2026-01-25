function startClass() {
    const selectedClass = document.getElementById("classSelect").value;
    const selectedSubject = document.getElementById("subjectSelect").value;

    if (selectedClass === "" || selectedSubject === "") {
        alert("Please select both class and subject");
        return;
    }

    // Store selections for next page (quiz)
    localStorage.setItem("class", selectedClass);
    localStorage.setItem("subject", selectedSubject);

    // Redirect to quiz page
    function startQuiz() {
    window.location.href = "/quiz";
}

}
function startQuiz() {
    const cls = document.getElementById("class").value;
    const subject = document.getElementById("subject").value;

    // pass data to quiz page
    window.location.href = `/quiz?class=${cls}&subject=${subject}`;
}