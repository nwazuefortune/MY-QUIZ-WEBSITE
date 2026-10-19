const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Management Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style a web page?",
        options: ["Python", "CSS", "Java", "C++"],
        answer: 1
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        options: ["<h6>", "<head>", "<h1>", "<heading>"],
        answer: 2
    },
    {
        question: "Which symbol starts a JavaScript single-line comment?",
        options: ["##", "//", "<!--", "**"],
        answer: 1
    },
    {
        question: "Which HTML tag creates a link?",
        options: ["<a>", "<p>", "<img>", "<h1>"],
        answer: 0
    },

    {
         question: "Which Html tag is used to create a paragraph?",
        options: ["<para>", "<p>", "<text>", "<pg>"],
        answer: 1
    },
    {
         question: "which tag is used to insert an image?",
        options: ["<a>", "<image>", "<img>", "<src>"],
        answer: 2
    },

    {
         question: "Which HTML tag is used to create an orderd list?",
        options: ["<ul>", "<li>", "<ol>", "<dl>"],
        answer: 2
    },

    {
         question: "Which HTML tag creates an Unorderd list?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: 1
    },

    {
         question: "Which HTML tag creates a line break?",
        options: ["<Break>", "<lb>", "<br>", "<line>"],
        answer: 2
    },

    {
         question: "Which HTML tag creates a form?",
        options: ["<input>", "<form>", "<button>", "<field set>"],
        answer: 1
    },

    {
        question: "Which HTML tag creates a button?",
        options: ["<click>", "<btn>", "<button>", "<botton>"],
        answer: 2
    },

    {
         question: "Which Css code selects an element with the ID header?",
        options: ["<.header {}>", "<header {}>", "<*header>", "<#header {}>"],
        answer: 3
    },

    {
         question: "Which Css code select an element with the class name box?",
        options: ["<#box {}>", "<box {}>", "<.box{}>", "<*box {}>"],
        answer: 0
    }
];

let questionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
let hasAnswered = false;

const questionText = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answerButtons = document.querySelectorAll(".answer");
const timeText = document.getElementById("time");
const message = document.getElementById("message");
const nextButton = document.getElementById("next-button");

function showQuestion() {
    clearInterval(timer);
    hasAnswered = false;
    timeLeft = 10;
    timeText.textContent = timeLeft;
    message.textContent = "";
    nextButton.disabled = true;

    if (questionIndex === questions.length) {
        showResult();
        return;
    }

    const currentQuestion = questions[questionIndex];
    questionText.textContent = currentQuestion.question;
    questionNumber.textContent =
        "Question " + (questionIndex + 1) + " of " + questions.length;

    answerButtons.forEach(function(button, index) {
        button.textContent = currentQuestion.options[index];
        button.className = "answer";
        button.disabled = false;
    });

    timer = setInterval(function() {
        timeLeft--;
        timeText.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(-1);
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    if (hasAnswered) {
        return;
    }

    hasAnswered = true;
    clearInterval(timer);

    const correctIndex = questions[questionIndex].answer;

    answerButtons.forEach(function(button, index) {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        message.textContent = "Correct answer!";
    } else {
        if (selectedIndex !== -1) {
            answerButtons[selectedIndex].classList.add("wrong");
        }
        message.textContent = "The correct answer is highlighted in green.";
    }

    nextButton.disabled = false;
}

answerButtons.forEach(function(button, index) {
    button.addEventListener("click", function() {
        checkAnswer(index);
    });
});

nextButton.addEventListener("click", function() {
    if (questionIndex < questions.length) {
        questionIndex++;
    }

    if (questionIndex === questions.length) {
        showResult();
    } else {
        showQuestion();
    }
});

function showResult() {
    clearInterval(timer);
    questionNumber.textContent = "Quiz finished";
    questionText.textContent = "Your score: " + score + " out of " + questions.length;
    document.getElementById("answers").innerHTML = "";
    timeText.textContent = "0";
    message.textContent = "Well done! Refresh the page to try again.";
    nextButton.style.display = "none";
}

showQuestion();
