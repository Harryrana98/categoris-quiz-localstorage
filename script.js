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
const quizContainer = document.querySelector(".quiz_conatiner");
const resultContent = document.querySelector(".result_content");
const questionDiv = document.querySelector("#question");
// const questionDiv=document.querySelector("#")

createUserBtn.addEventListener("click", () => {
  notCreate.style.display = "none";
  createUserdiv.style.display = "block";
  userNameInput.focus();

  newUserCreateBtn.addEventListener("click", () => {
    const inputvalue = userNameInput.value.trim();
    createUserBtn.style.textTransform = "capitalize";
    createUserBtn.innerHTML = inputvalue;

    userNameInput.value = "";

    createSuccessfull.style.display = "block";
    createUserdiv.style.display = "none";
    const settimeout = setTimeout(() => {
      createSuccessfull.style.display = "none";

      clearTimeout(settimeout);
    }, 2000);
  });

  newUserQuitBtn.addEventListener("click", () => {
    createUserdiv.style.display = "none";
  });
});

startBtn.addEventListener("click", function () {
  createSuccessfull.style.display = "none";
  page2.style.display = "block";

  const inputvalue = userNameInput.value.trim();
  createUserBtn.style.textTransform = "capitalize";
  createUserBtn.innerHTML = inputvalue;

  wrapper.style.display = "none";
  if (userNameInput.value === "") {
    notCreate.style.display = "block";
    const settimeout = setTimeout(() => {
      notCreate.style.display = "none";

      clearTimeout(settimeout);
    }, 2000);
  } else {
  }
});

musicQuiz.addEventListener("click", async function () {
    page3.style.display="block"
    page2.style.display = "none";
  const URL =
    "https://opentdb.com/api.php?amount=5&category=25&difficulty=easy&type=multiple";
  const respose = await fetch(URL);
  const result = await respose.json();
  console.log(result.results);
  displayMusicQuiz(result.results);
});

function displayMusicQuiz(quizArr) {
    quizArr.forEach((questions) => {
        questionDiv.innerHTML = questions.question;
        questions.incorrect_answers.forEach((opt,i)=>{
        const button=document.createElement("button")
            button.innerHTML=opt[i]
            optionDiv.append(button)
    });



  });

}
