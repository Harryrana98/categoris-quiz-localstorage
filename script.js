const createUserBtn = document.querySelector("#user");
const startBtn = document.querySelector("#start");
const createUserdiv = document.querySelector(".create_user");
const userNameInput = document.querySelector("#userNameInput");
const newUserCreateBtn = document.querySelector("#create_user");
const newUserQuitBtn = document.querySelector("#quit_user");
const wrapper = document.querySelector("#wrapper");
const createSuccessfull = document.querySelector("#succes");
const notCreate = document.querySelector("#unsucces");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const musicQuiz = document.querySelector("#music");
const artQuiz = document.querySelector("#art");
const codingQuiz = document.querySelector("#coding");
const resultsDiv = document.querySelector(".results");
const optionDiv = document.querySelector(".options");
const quizContainer = document.querySelector(".quiz_container");
const quizContainer1 = document.querySelector(".quiz_container1");
const resultContent = document.querySelector(".result_content");
const questionDiv = document.querySelector("#question");
const timerDiv = document.querySelector(".timer_div");
const nextBtn = document.querySelector("#nextBtn");
const quitBtn = document.querySelector("#quitBtn");
const getResult = document.querySelector("#getResult");
const playAgain = document.querySelector("#playAgain");
const displayScore = document.querySelector("#score");
const selectCategories = document.querySelectorAll(".content p");
const quizNameP = document.querySelector("#quiz_name_p");
const startQuizButton= document.querySelector("#quizStartBtn");

const API_URL = [
  "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=25&difficulty=easy&type=multiple",
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple",
];

let timer = 5;
let score = 0;
let userSelectedOpt;
let userSelectedAns;
let isUserRegistered = false;
let questionNumber = 0;
let questionArray = [];
let correctAns = [];
let userAns = [];

createUserBtn.addEventListener("click", () => {
  notCreate.style.display = "none";
  createUserdiv.style.display = "block";
  userNameInput.focus();

  newUserCreateBtn.addEventListener("click", () => {
    const inputvalue = userNameInput.value.trim();

    if (inputvalue === "") {
      alert("Please Enter User Name");
      return;
    }
    isUserRegistered = true;
    userNameInput.value = "";

    createUserBtn.innerHTML = inputvalue;
    createUserBtn.style.textTransform = "capitalize";
    createSuccessfull.style.display = "block";
    createUserdiv.style.display = "none";
    const settimeout = setTimeout(() => {
      createSuccessfull.style.display = "none";

      clearTimeout(settimeout);
    }, 2000);
  });

  newUserQuitBtn.addEventListener("click", () => {
    createUserdiv.style.display = "none";
    userNameInput.value = "";
  });
});

startBtn.addEventListener("click", function () {
  if (!isUserRegistered) {
    notCreate.style.display = "block";
    const settimeout = setTimeout(() => {
      notCreate.style.display = "none";

      clearTimeout(settimeout);
    }, 2000);
    return;
  }
  createSuccessfull.style.display = "none";
  page2.style.display = "block";

  const inputvalue = userNameInput.value.trim();
  createUserBtn.style.textTransform = "capitalize";
  createUserBtn.innerHTML = inputvalue;

  wrapper.style.display = "none";
});

nextBtn.style.display = "none";
quitBtn.style.display = "none";



selectCategories.forEach((ele, i) => {
  ele.addEventListener("click", async (e) => {
    const index = i;
    const indexhtml = ele.innerHTML;
    quizNameP.innerHTML = `${indexhtml} Quiz `;
    console.log(quizNameP);

    page3.style.display = "block";
    page2.style.display = "none";

    const respose = await fetch(API_URL[i]);
    const result = await respose.json();
    console.log(result.results);
    questionArray = result.results;
    displayMusicQuiz(questionArray);

    let interval = setInterval(() => {
      if (timer === 0) {
        if (questionNumber >= questionArray.length) {
          clearInterval(interval);
          quizContainer.innerHTML = "";
          quizContainer.style.display = "none";
          quizContainer1.style.display = "block";
          return;
        } else {
          questionNumber++;
          timer = 5;
          displayMusicQuiz(questionArray);
        }
        timerDiv.innerHTML = timer;
      } else {
        timer--;
      }
      timerDiv.innerHTML = timer;
    }, 1000);
  });
});

function displayMusicQuiz(quizArr) {
  const ques = quizArr[questionNumber];
  questionDiv.innerHTML = ques.question;

  const options = [...ques.incorrect_answers, ques.correct_answer];
  options.sort(() => Math.random() - 0.5);

  optionDiv.innerHTML = options
    .map((opt) => `<button>${opt}</button>`)
    .join("");

  correctAns[questionNumber] = ques.correct_answer;

  nextBtn.style.display = "inline-block";
  quitBtn.style.display = "inline-block";
}

console.log(correctAns);
nextBtn.addEventListener("click", function () {
  if (questionNumber >= questionArray.length) {
    timer = 0;
    quizContainer.innerHTML = "";
    quizContainer.style.display = "none";
    quizContainer1.style.display = "block";
  }
  questionNumber++;
  displayMusicQuiz(questionArray);
  timer = 5;
  timerDiv.innerHTML = timer;
});

optionDiv.addEventListener("click", userClickOptions); 
function userClickOptions(e) {
  userSelectedOpt = e.target;
  userSelectedAns = userSelectedOpt.innerHTML;

  userAns.push(userSelectedAns);

  const correct = correctAns[questionNumber];
  if (userSelectedAns === correct) {
    score++;
    userSelectedOpt.style.backgroundColor = "green";
    userSelectedOpt.style.color = "white";
  } else {
    userSelectedOpt.style.backgroundColor = "red";
    userSelectedOpt.style.color = "white";
  }

  const buttons = optionDiv.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.innerHTML === correct) {
      btn.style.backgroundColor = "green";
      btn.style.color = "white";
    }
  });
}

quitBtn.addEventListener("click", function () {
  // quizContainer.innerHTML=""
  page2.style.display = "block";
  page3.style.display = "none";
});

function MatchUserAns() {}

getResult.addEventListener("click", function () {
  displayScore.innerHTML = `<p>Your Score: ${score} / ${questionArray.length}</p>`;
  //   quizContainer1.append(displayScore)
});

playAgain.addEventListener("click", function () {
  questionNumber++;
  displayMusicQuiz(questionArray);
});
