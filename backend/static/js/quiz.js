// ================== GLOBAL VARIABLES ==================
let mouseMoveCount = 0;
let lastMouseMoveTime = Date.now();
let fatigueAlertShown = false;

let keyPressCount = 0;
let typingStartTime = null;

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let startTime;

// ================== TRACK MOUSE ==================
document.addEventListener("mousemove", () => {
    mouseMoveCount++;
    lastMouseMoveTime = Date.now();
});

// ================== TRACK TYPING ==================
document.addEventListener("keydown", () => {
    if (!typingStartTime) {
        typingStartTime = Date.now();
    }
    keyPressCount++;
});

// ================== LOAD CLASS & SUBJECT ==================
const className = localStorage.getItem("class");
const subject = localStorage.getItem("subject");

document.getElementById("quizTitle").innerText =
    `Class ${className} - ${subject} Quiz`;

// ================== LOAD AI QUESTIONS ==================
async function loadQuiz() {
    const response = await fetch("http://127.0.0.1:5000/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class: className, subject })
    });

    questions = await response.json();
    startQuiz();
}

window.onload = loadQuiz;

// ================== START QUIZ ==================
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// ================== SHOW QUESTION ==================
function showQuestion() {
    clearInterval(timerInterval);

    if (currentQuestionIndex >= questions.length) {
        finishQuiz();
        return;
    }

    const q = questions[currentQuestionIndex];
    startTime = Date.now();
    let timeLeft = 15;

    document.getElementById("question").innerText = q.question;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    const optionButtons = document.querySelectorAll(".options button");
    optionButtons.forEach((btn, index) => {
        btn.innerText = q.options[index];
        btn.onclick = () => selectAnswer(index);
    });

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestionIndex++;
            showQuestion();
        }
    }, 1000);
}

// ================== ANSWER SELECTION ==================
function selectAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const responseTime = (Date.now() - startTime) / 1000;

    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    saveResult(responseTime);
    showQuestion();
}

// ================== TYPING SPEED ==================
function getTypingSpeed() {
    if (!typingStartTime) return 0;
    const minutes = (Date.now() - typingStartTime) / 60000;
    return Math.round(keyPressCount / minutes);
}

// ================== FATIGUE SCORE ==================
function calculateFatigueScore(mouseMovements, typingSpeed, responseTime) {
    const wMouse = 0.4;
    const wTyping = 0.4;
    const wResponse = 0.2;

    let mouseScore = mouseMovements < 5 ? 1 : 0;
    let typingScore = typingSpeed < 20 ? 1 : 0;
    let responseScore = responseTime > 15 ? 1 : 0;

    return (wMouse * mouseScore) + (wTyping * typingScore) + (wResponse * responseScore);
}

// ================== IDLE DETECTION ==================
setInterval(() => {
    const idleTime = (Date.now() - lastMouseMoveTime) / 1000;

    if (idleTime > 10 && !fatigueAlertShown) {
        alert("You seem inactive. Please stay focused or take a short break.");
        fatigueAlertShown = true;
    }

    if (idleTime <= 10) {
        fatigueAlertShown = false;
    }
}, 5000);

// ================== SAVE RESULT ==================
function saveResult(responseTime) {
    const typingSpeed = getTypingSpeed();
    const fatigueScore = calculateFatigueScore(
        mouseMoveCount,
        typingSpeed,
        responseTime
    );

    console.log({
        class: className,
        subject: subject,
        score,
        responseTime,
        mouseMoveCount,
        typingSpeed,
        fatigueScore
    });
}

// ================== FINISH QUIZ ==================
function finishQuiz() {
    document.querySelector(".quiz-container").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    document.getElementById("scoreText").innerText =
        `Score: ${score} / ${questions.length}`;

    document.getElementById("mouseText").innerText =
        `Mouse Movements: ${mouseMoveCount}`;

    document.getElementById("typingText").innerText =
        `Typing Speed: ${getTypingSpeed()} keys/min`;
}
