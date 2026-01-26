// 1️⃣ Fetch quiz
fetch("http://127.0.0.1:5000/generate-quiz", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    class: "4",
    subject: "Math"
  })
})
.then(res => res.json())
.then(data => {
  questions = data.questions;     // ✅ store globally
  renderQuiz(questions);
  setupFatigueTracking();         // ✅ start tracking AFTER render
})
.catch(err => console.error(err));

// ================= QUESTIONS =================
const questions = [
    {
        question: "What does AI stand for?",
        options: ["Artificial Intelligence", "Automated Input", "Advanced Internet", "Applied Innovation"],
        answer: 0
    },
    {
        question: "Which language is widely used for AI?",
        options: ["Python", "HTML", "CSS", "SQL"],
        answer: 0
    },
    {
        question: "What is Machine Learning?",
        options: ["Subset of AI", "Programming language", "Database", "Operating System"],
        answer: 0
    },
    {
        question: "Which is an AI application?",
        options: ["Face Recognition", "Calculator", "Notepad", "MS Paint"],
        answer: 0
    },
    {
        question: "What does NLP stand for?",
        options: ["Natural Language Processing", "Neural Logic Program", "Network Learning Process", "None"],
        answer: 0
    }
];

// ================= FATIGUE DATA =================
const fatigueData = {
    startTime: Date.now(),
    answerTimes: [],
    mouseMoves: 0
};

// Mouse movement tracking
document.addEventListener("mousemove", () => {
    fatigueData.mouseMoves++;
});

// ============= Render quiz ==================
function renderQuiz(questions) {
  const container = document.getElementById("quiz-container");
  
  if (!container) {
    console.error("quiz-container not found");
    return;
}

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

// Track answer timing
  document.querySelectorAll("input[type='radio']").forEach(radio => {
      radio.addEventListener("change", () => {
          fatigueData.answerTimes.push(
              (Date.now() - fatigueData.startTime) / 1000
          );
      });
  });
}

// ========== Fatigue analysis =============
function analyzeFatigue(score, total) {
  const mouse = fatigueData.mouseMoves;
  const answers = fatigueData.answerTimes.length;

  if (mouse === 0 && answers === 0) {
    return "⚠️ Not enough activity to detect fatigue.";
  }

  const avgSpeed = answers > 0
    ? fatigueData.answerTimes[answers - 1] / answers
    : 0;

  if (score < total / 2 && mouse < 80) {
    return "😴 You seem tired. Take a short break.";
  }

  if (score < total / 2 && avgSpeed > 4) {
    return "📘 You need more practice. Slow down.";
  }

  if (score >= total / 2 && mouse > 80) {
    return "👍 Good focus! Keep it up.";
  }

  return "⚠️ Try again with better concentration.";
}

// ================= SUBMIT =================
function submitQuiz() {
    let score = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.answer) {
            score++;
        }
    });

    const totalTime = (Date.now() - fatigueData.startTime) / 1000;
    const fatigueMessage = analyzeFatigue(score, questions.length);

    document.getElementById("fatigueResult").innerText = fatigueMessage;

    alert(`Your Score: ${score}/${questions.length}`);
}

// ================= LOAD =================
window.addEventListener("DOMContentLoaded", renderQuiz);
