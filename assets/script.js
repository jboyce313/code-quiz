var startButton = document.querySelector(".start-btn");
var quizArea = document.querySelector(".quiz-area");
var questionArea = document.querySelector(".question-area");
var result = document.querySelector(".result");
var viewHighScores = document.querySelector(".view-high-scores");
var score = 0;
var highScoresDisplayed = false;
var secondsLeft = 10;

// retrieve list of scores from local storage
var scores = JSON.parse(localStorage.getItem("savedScores"));
if (scores == null) scores = [];

// questions as objects
var q1 = {
  question: "Commonly used data types do NOT include:",
  answers: ["numbers", "strings", "booleans", "alerts"],
  correctAnswer: "alerts",
};
var q2 = {
  question: "The condition for an if/then statement is enclosed in:",
  answers: ["brackets", "curly braces", "parentheses", "slashes"],
  correctAnswer: "parentheses",
};
var q3 = {
  question: "How can you succintly increase the value of i by 1?",
  answers: ["i + 1;", "i++;", "i >= 1;", "i+;"],
  correctAnswer: "i++;",
};
// var q4 = {
//   question: "What does HTML stand for?",
//   answers: [
//     "Hypertext Markdown Language",
//     "High Tolerance Markup Language",
//     "Hypertext Markup Language",
//     "Hoisted Text Markup Language",
//   ],
//   correctAnswer: "Hypertext Markup Language",
// };
// var q5 = {
//   question: "Which is not a part of the box model?",
//   answers: ["margin", "display", "content", "padding"],
//   correctAnswer: "display",
// };

// array of question objects
var questions = [q1, q2, q3];
// tracks which question user is on
questionNumber = 0;

// grabs question from question array and creates HTML to display it
var generateQuestion = function () {
  // checks if at end of questions array
  // if (questionNumber > questions.length) return;

  // checks if at end of game. If so, display end game display, else continue with game
  if (questionNumber === questions.length) {
    clearQuestionArea();
    if (document.querySelector(".result"))
      document.querySelector(".result").remove();
    createEndScreen();
  } else {
    var question = questions[questionNumber];

    // checks to see if previous question displayed and deletes it
    // if no question displayed, displays first question
    if (questionArea.classList.contains("hidden")) {
      questionArea.classList.remove("hidden");
      startButton.classList.add("hidden");
    } else {
      clearQuestionArea();
    }

    // create HTML for question and answers
    var questionText = document.createElement("h2");
    questionText.classList.add("question");
    questionText.textContent = question.question;
    questionArea.appendChild(questionText);

    var answer1 = document.createElement("button");
    answer1.classList.add("answer-btn");
    answer1.textContent = "1.    " + question.answers[0];
    questionArea.appendChild(answer1);

    var answer2 = document.createElement("button");
    answer2.classList.add("answer-btn");
    answer2.textContent = "2.    " + question.answers[1];
    questionArea.appendChild(answer2);

    var answer3 = document.createElement("button");
    answer3.classList.add("answer-btn");
    answer3.textContent = "3.    " + question.answers[2];
    questionArea.appendChild(answer3);

    var answer4 = document.createElement("button");
    answer4.classList.add("answer-btn");
    answer4.textContent = "4.    " + question.answers[3];
    questionArea.appendChild(answer4);

    // checks for correct answer upon button click and moves to next question
    answer1.addEventListener("click", function () {
      nextQuestion(checkResult(answer1.textContent, question.correctAnswer));
    });
    answer2.addEventListener("click", function () {
      nextQuestion(checkResult(answer2.textContent, question.correctAnswer));
    });
    answer3.addEventListener("click", function () {
      nextQuestion(checkResult(answer3.textContent, question.correctAnswer));
    });
    answer4.addEventListener("click", function () {
      nextQuestion(checkResult(answer4.textContent, question.correctAnswer));
    });
  }
};

// checks if selected answer is correct or not
function checkResult(choice, correctAnswer) {
  if (choice.includes(correctAnswer)) {
    score++;
    console.log(score);

    return true;
  } else return false;
}

function nextQuestion(isCorrect) {
  if (isCorrect) {
    result.textContent = "Correct!";
  } else {
    result.textContent = "Incorrect :(";
  }
  questionNumber++;
  generateQuestion();
}

function clearQuestionArea() {
  if (document.querySelector(".question"))
    document.querySelector(".question").remove();
  var answers = document.querySelectorAll(".answer-btn");
  for (var i = 0; i < answers.length; i++) {
    answers[i].remove();
  }
}

function createEndScreen() {
  var allDoneText = document.createElement("h2");
  allDoneText.textContent = "All done!";
  allDoneText.style.marginBottom = "10px";
  quizArea.appendChild(allDoneText);

  var displayScore = document.createElement("p");
  displayScore.textContent = `Your final score is ${score}`;
  quizArea.appendChild(displayScore);

  var submitScore = document.createElement("form");
  quizArea.appendChild(submitScore);

  var label = document.createElement("label");
  label.textContent = "Enter your initials: ";
  submitScore.appendChild(label);

  var inputInitials = document.createElement("input");
  inputInitials.setAttribute("type", "text");
  inputInitials.style.marginLeft = "5px";
  inputInitials.style.marginRight = "10px";
  submitScore.appendChild(inputInitials);

  var submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Save Score";
  submitScore.appendChild(submitBtn);

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    var areValidInitials = verifyInitials(inputInitials.value); // check if valid initials

    if (!areValidInitials) {
      alert("Please enter valid initials");
      inputInitials.value = "";
      return;
    }

    // create new saved score object
    var savedScore = {
      initials: inputInitials.value,
      myScore: score,
    };

    // update local storage with new saved score
    localStorage.setItem("savedScore", JSON.stringify(savedScore));
    scores.push(savedScore);
    localStorage.setItem("savedScores", JSON.stringify(scores));

    // clear end screen
    allDoneText.remove();
    displayScore.remove();
    submitScore.remove();

    // display high scores
    displayHighScores();
  });
}

function verifyInitials(initials) {
  if (initials.length === 2 && initials.match(/[a-z]/i)) return true;
  else return false;
}

function displayHighScores() {
  // check to see if high scores are already displayed
  if (highScoresDisplayed === true) return;

  // remove result if present
  if (document.querySelector(".result"))
    document.querySelector(".result").remove();

  scores = JSON.parse(localStorage.getItem("savedScores"));

  // sort scores
  if (scores)
    var sortedScores = scores.sort((a, b) => (a.myScore < b.myScore ? 1 : -1));

  var highScoresTitle = document.createElement("h2");
  highScoresTitle.textContent = "High Scores";
  quizArea.appendChild(highScoresTitle);

  if (sortedScores) {
    for (var i = 0; i < sortedScores.length; i++) {
      var scoreListItem = document.createElement("p");
      scoreListItem.classList.add("score");
      scoreListItem.textContent = `${i + 1}.  ${sortedScores[i].initials} --  ${
        sortedScores[i].myScore
      }`;
      quizArea.appendChild(scoreListItem);
    }
  }

  highScoresDisplayed = true;

  var goBack = document.createElement("button");
  goBack.textContent = "Go back";
  quizArea.appendChild(goBack);
  goBack.addEventListener("click", function () {
    window.location.reload();
  });

  var clearHighScores = document.createElement("button");
  clearHighScores.textContent = "Clear high scores";
  quizArea.appendChild(clearHighScores);
  clearHighScores.addEventListener("click", function () {
    localStorage.clear();
    // highScoresDisplayed = false;
    var listItems = document.querySelectorAll(".score");
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.add("hidden");
    }
  });
}

function runTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    document.querySelector(
      ".timer"
    ).textContent = `Time remaing: ${secondsLeft}`;

    if (questionNumber === questions.length) clearInterval(timerInterval);

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      clearQuestionArea();
      if (document.querySelector(".result"))
        document.querySelector(".result").remove();
      createEndScreen();
    }
  }, 1000);
}

startButton.addEventListener("click", function () {
  generateQuestion();
  runTimer();
});
viewHighScores.addEventListener("click", function () {
  if (!questionArea.classList.contains("hidden")) {
    questionArea.classList.add("hidden");
  }
  if (!startButton.classList.contains("hidden")) {
    startButton.classList.add("hidden");
  }
  displayHighScores();
  questionNumber = questions.length; // trip condition to stop timer
});
