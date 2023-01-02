var startButton = document.querySelector(".start-btn");
var quizArea = document.querySelector(".quiz-area");

// questions as objects
var q1 = {
  question: "Commonly used data types do NOT include:",
  a1: "numbers",
  a2: "strings",
  a3: "booleans",
  a4: "alerts",
  correctAnswer: "alerts",
};
var q2 = {
  question: "The condition for an if/then statement is enclosed in:",
  a1: "brackets",
  a2: "curly braces",
  a3: "parentheses",
  a4: "slashes",
  correctAnswer: "parentheses",
};

// array of question objects
var questions = [q1, q2];
// tracks which question user is on
questionNumber = 0;

// grabs question from question array and creates HTML to display it
var generateQuestion = function () {
  if (questionNumber === 0) startButton.classList.add("hidden");

  // create HTML for question and answers
  var question = document.createElement("h2");
  question.textContent = questions[questionNumber].question;
  quizArea.appendChild(question);

  var answer1 = document.createElement("button");
  answer1.classList.add("answer-btn");
  answer1.textContent = "1. " + questions[questionNumber].a1;
  quizArea.appendChild(answer1);

  var answer2 = document.createElement("button");
  answer2.classList.add("answer-btn");
  answer2.textContent = "2. " + questions[questionNumber].a2;
  quizArea.appendChild(answer2);

  var answer3 = document.createElement("button");
  answer3.classList.add("answer-btn");
  answer3.textContent = "3. " + questions[questionNumber].a3;
  quizArea.appendChild(answer3);

  var answer4 = document.createElement("button");
  answer4.classList.add("answer-btn");
  answer4.textContent = "4. " + questions[questionNumber].a4;
  quizArea.appendChild(answer4);

  // checks for correct answer upon button click and moves to next question
  questionNumber++;
  var answerButtons = document.querySelectorAll(".answer-btn");
  for (var i = 0; i < answerButtons.length; i++) {
    answerButtons[i].addEventListener("click", generateQuestion);
  }
};

startButton.addEventListener("click", generateQuestion);
