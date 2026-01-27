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

const questionBank = {
  "4" : {
    "tamil" : [
      {
          question: "உயிரெழுத்துகள் எத்தனை?",
          options: ["10","12","21","18"],
          answer: 1
      },
      {
          question: "மெய்யெழுத்துகள் எத்தனை?",
          options: ["12","18","81","24"],
          answer: 2
      },
      {
          question: "பெயர்ச்சொல் எது?",
          options: ["ஓடு", "மரம்", "நட", "படி"],
          answer: 1
      },
      {
          question: "வினைச்சொல் எது?",
          options: ["புத்தகம்", "பள்ளி", "ஓடுதல்", "மரம்"],
          answer: 2
      },
      {
          question: "“நல்ல” என்பதற்கான எதிர்ச்சொல்?",
          options: ["அழகு", "பெரிய", "கெட்ட", "சிறிய"],
          answer: 2
      }
    ],
    "english": [
      {
        question: "What is a noun?",
        options: ["A naming word", "An action word", "A describing word", "A joining word"],
        answer: 0
      },
      {
        question: "Which is a vowel?",
        options: ["B", "C", "A", "D"],
        answer: 2
      },
      {
        question: "What is a verb?",
        options: ["Name", "Place", "Action", "Thing"],
        answer: 2
      },
      {
        question: "Plural of 'child' is?",
        options: ["childs", "childes", "children", "childrens"],
        answer: 2
      },
      {
        question: "Opposite of 'big'?",
        options: ["large", "small", "tall", "fat"],
        answer: 1
      }
    ],
    "math" : [
      {
        question: "What is 5 + 3?",
        options: ["6", "7", "8", "9"],
        answer: 2
        },
        {
        question: "What is 10 − 4?",
        options: ["5", "6", "7", "8"],
        answer: 1
        },
        {
          question: "2 × 4 = ?",
          options: ["6", "8", "10", "12"],
          answer: 1
        },
        {
          question: "12 ÷ 3 = ?",
          options: ["2", "3", "4", "5"],
          answer: 2
        },
        {
          question: "How many sides does a square have?",
          options: ["3", "4", "5", "6"],
          answer: 1
        }
      ],
      "evs" : [
        {
          question: "Which is a domestic animal?",
          options: ["Lion", "Tiger", "Cow", "Elephant"],
          answer: 2
        },
        {
          question: "Why do we need food?",
          options: ["To play", "To grow and get energy", "To sleep", "To read"],
          answer: 1
        },
        {
          question: "Which is a source of water?",
          options: ["Road", "River", "Chair", "Book"],
          answer: 1
        },
        {
          question: "Who is a helper?",
          options: ["Doctor", "Thief", "Robber", "Cheater"],
          answer: 0
        },
        {
          question: "What do plants need to grow?",
          options: ["Water", "Plastic", "Stone", "Paper"],
          answer: 0
        }
      ]
  }
}
  
// ================= SELECT QUESTIONS =================
const selectedClass = String(studentClass).replace(/[^0-9]/g, "");   // example: "4"
const selectedSubject = subject.trim().toLowerCase();      // example: "english"

const questions =
  questionBank[selectedClass]?.[selectedSubject] || [];

console.log("Class:", selectedClass);
console.log("Subject:", selectedSubject);
console.log("Questions:", questions);
if (questions.length === 0) {
  alert("No questions found for this class & subject");
}

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

// =========== Track answer timing ===========
  document.querySelectorAll("input[type='radio']").forEach(radio => {
      radio.addEventListener("change", () => {
          fatigueData.answered.size(radio.name);
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