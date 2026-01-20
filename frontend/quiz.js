let mouseMoveCount = 0;
let lastMouseMoveTime = Date.now();
let fatigueAlertShown = false;

let keyPressCount = 0;
let typingStartTime = null;

const typingInput = document.getElementById("typingInput");

if (typingInput) {
    typingInput.addEventListener("keydown", () => {
        if (!typingStartTime) {
        typingStartTime = Date.now();
    }
    keyPressCount++;
});
}


// Track mouse movement
document.addEventListener("mousemove", () => {
    mouseMoveCount++;
    lastMouseMoveTime = Date.now();
});

const className = localStorage.getItem("class");
const subject = localStorage.getItem("subject");

document.getElementById("quizTitle").innerText =
    `Class ${className} - ${subject} Quiz`;

const questionData = {
    question: "What is 5 + 3 ?",
    options: ["5", "8", "10", "15"],
    correct: 1
};

let timeLeft = 15;
let score = 0;
let startTime = Date.now();

document.getElementById("question").innerText = questionData.question;

const optionButtons = document.querySelectorAll(".options button");
optionButtons.forEach((btn, index) => {
    btn.innerText = questionData.options[index];
});

// Timer
const timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time up!");
        saveResult(null);
    }
}, 1000);

function selectAnswer(selectedIndex) {
    clearInterval(timerInterval);
    const responseTime = (Date.now() - startTime) / 1000;

    if (selectedIndex === questionData.correct) {
        score++;
    }

    saveResult(responseTime);
}


setInterval(() => {
    const currentTime = Date.now();
    const idleTime = (currentTime - lastMouseMoveTime) / 1000;

    // Show alert only ONCE
    if (idleTime > 10 && !fatigueAlertShown) {
        alert("You seem inactive. Please stay focused or take a short break.");
        fatigueAlertShown = true;
    }

    // Reset if student becomes active again
    if (idleTime <= 10) {
        fatigueAlertShown = false;
    }
}, 5000);

function getTypingSpeed() {
    if (!typingStartTime) return 0;

    const timeSpent = (Date.now() - typingStartTime) / 60000; // minutes
    return timeSpent > 0 ? Math.round(keyPressCount / timeSpent) : 0;
}

function calculateFatigueScore(mouseMovements, typingSpeed, responseTime) {
    // Weights (tunable)
    const wMouse = 0.4;
    const wTyping = 0.4;
    const wResponse = 0.2;

    // Normalize signals (0–1)
    let mouseScore = mouseMovements < 5 ? 1 : 0; // 1 = fatigued
    let typingScore = typingSpeed < 20 ? 1 : 0;
    let responseScore = responseTime > 15 ? 1 : 0; // too slow

    // Weighted fatigue score
    let fatigueScore = (wMouse * mouseScore) + (wTyping * typingScore) + (wResponse * responseScore);

    return fatigueScore; // 0 = active, 1 = fatigued
}

function saveResult(responseTime) {
    const typingSpeed = getTypingSpeed();

    const quizResult = {
        class: className,
        subject: subject,
        score: score,
        responseTime: responseTime,
        mouseMovements: mouseMoveCount,
        typingSpeed: typingSpeed
    };

    // Calculate fatigue score
    const fatigueScore = calculateFatigueScore(mouseMoveCount, typingSpeed, responseTime);

    console.log("AI Activity Data:", quizResult);
    console.log("Fatigue Score:", fatigueScore);

    // Notify student if fatigued
    if (fatigueScore >= 0.5) {
        alert("You seem tired. Consider taking a short break 😴");
    } else {
        alert("Good job! You are focused 👍");
    }
}

