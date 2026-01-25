fetch("http://127.0.0.1:5000/generate-quiz", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    class: "4",
    subject: "Math"
  })
})
.then(res => res.json())
.then(data => {
  renderQuiz(data.questions);
})
.catch(err => console.error(err));

function renderQuiz(questions) {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  questions.forEach((q, index) => {
    container.innerHTML += `
      <div class="question">
        <p><b>Q${index + 1}.</b> ${q.question}</p>
        <div class="options">
          ${q.options.map((opt, i) => `
            <label>
              <input type="radio" name="q${index}" value="${i}">
              ${opt}
            </label>
          `).join("")}
        </div>
      </div>
    `;
  });
}
function submitQuiz() {
let score = 0;


questions.forEach((q, index) => {
const selected = document.querySelector(`input[name="q${index}"]:checked`);
if (selected && parseInt(selected.value) === q.answer) {
score++;
}
});


document.querySelector(".quiz-container").innerHTML = `
<h2>Result</h2>
<p>Your Score: ${score} / ${questions.length}</p>
<button class="submit-btn" onclick="location.reload()">Retry</button>
`;
}
