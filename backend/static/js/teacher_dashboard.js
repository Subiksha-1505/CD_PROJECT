// Sample student data (later from backend)
const students = [
    {
        name: "Arun",
        class: "8th",
        subject: "Mathematics",
        score: 8,
        typingSpeed: 45,
        mouseMovements: 120,
        fatigueScore: 0.2
    },
    {
        name: "Meena",
        class: "9th",
        subject: "Science",
        score: 3,
        typingSpeed: 15,
        mouseMovements: 10,
        fatigueScore: 0.8
    }
];

const table = document.getElementById("studentTable");

students.forEach(student => {
    const row = document.createElement("tr");

    const fatigueStatus = student.fatigueScore >= 0.5 ? "Tired" : "Active";
    const fatigueClass = student.fatigueScore >= 0.5 ? "fatigue-bad" : "fatigue-ok";

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.class}</td>
        <td>${student.subject}</td>
        <td>${student.score}</td>
        <td>${student.typingSpeed} keys/min</td>
        <td>${student.mouseMovements}</td>
        <td class="${fatigueClass}">${fatigueStatus}</td>
    `;

    table.appendChild(row);
});
