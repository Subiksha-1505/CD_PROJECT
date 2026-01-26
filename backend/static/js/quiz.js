// 1️⃣ Fetch quiz
/***fetch("http://127.0.0.1:5000/generate-quiz", {
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
***/
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
    answered : new Set() };
    /** answerTimes: [],
    mouseMoves: 0 
};

// Mouse movement tracking
document.addEventListener("mousemove", () => {
    fatigueData.mouseMoves++;
}); **/

// ============= Render quiz ==================
function renderQuiz() {
  const container = document.getElementById("quiz-container");
  
  /** if (!container) {
    console.error("quiz-container not found");
    return;
  }**/

  container.innerHTML = "";

  questions.forEach((q, index) => {
    container.innerHTML += `
      <div class="question-card">
        <p><b>Q${index + 1}.</b> ${q.question}</p>
        <div class="options">
          ${q.options.map((opt, i) => `
            <label>
              <input type="radio" name="q${index}" value="${i}">
              ${opt}
            </label><br>
          `).join("")}
        </div>
      </div><br>
    `;
  });

// Track answer timing
  document.querySelectorAll("input[type='radio']").forEach(radio => {
      radio.addEventListener("change", () => {
          fatigueData.answered.add(radio.name);
      });
  });
}

// ========== Fatigue analysis =============
function analyzeFatigue(totalTime, answeredCount) {
  if (answeredCount === 0) {
    return "⚠️ No answers detected. Fatigue cannot be measured.";
  }
  const avgTime = totalTime / answeredCount;

  if (avgTime > 15) {
    return `😴 You seem tired. Avg time: ${avgTime.toFixed(1)}s`;
  } else if (avgTime > 8) {
    return `😐 Slight fatigue detected. Avg time: ${avgTime.toFixed(1)}s`;
  } else {
    return `💪 Active & focused! Avg time: ${avgTime.toFixed(1)}s`;
  }
}

// ================= SUBMIT =================
function submitQuiz() {
    let score = 0;

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && Number(selected.value) === q.answer) {
            score++;
        }
    });

    const totalTime = (Date.now() - fatigueData.startTime) / 1000;
    const fatigueMsg = analyzeFatigue(
      totalTime,
      fatigueData.answeredQuestions.size
    );
  
    // ✅ DISPLAY FATIGUE RESULT
    document.getElementById("fatigueResult").innerText = fatigueMsg;

    alert(`Score: ${score}/${questions.length}`);
}

// ================= LOAD =================
window.onload = renderQuiz;