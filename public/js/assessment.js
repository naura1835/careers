import { shuffleFisherYates } from "./util.js";

const assessmentQuestion = document.querySelector(".question");
const answerOptions = document.querySelectorAll("[name='answer']");
const previousQuestionBtn = document.querySelector(".btn--previous");
const nextQuestionBtn = document.querySelector(".btn--next");
const getResultBtn = document.querySelector(".btn--get-results");
const label = document.querySelectorAll("label");
const base = document.querySelector(".base");
const test = document.querySelector(".btn--test");

window.addEventListener("load", () => {
  renderQuestion();
  fetchQuestions();
});
answerOptions.forEach((option) =>
  option.addEventListener("change", answerQuestionHandler)
);
previousQuestionBtn.addEventListener("click", getPreviousQuestion);
nextQuestionBtn.addEventListener("click", getNextQuestion);
test.addEventListener("click", useTestData);

let questions = [
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "geography",
  "economics",
  "agricultural_science",
];
let questionNumber = 0;
let assessmentAnswers = [];
let personalityQuestions = [];

async function fetchQuestions() {
  const response = await fetch("/assessment/questions");
  const data = await response.json();

  personalityQuestions = shuffleFisherYates(data);
}
function useTestData() {
  // let testSubjectAnswers =
  localStorage.setItem("test", JSON.stringify({ test: true }));
}
function renderQuestion() {
  if (
    !questions[0].hasOwnProperty("tag") &&
    questionNumber == questions.length
  ) {
    localStorage.setItem("subjects", JSON.stringify(assessmentAnswers));

    questions = personalityQuestions;
    questionNumber = 0;
    assessmentAnswers = [];

    [
      label[0].innerText,
      label[1].innerText,
      label[2].innerText,
      label[3].innerText,
      label[4].innerText,
    ] = [
      "very accurate",
      "accurate",
      "neutral",
      "moderately inaccurate",
      "very inaccurate",
    ];
    base.remove();
  }

  if (assessmentAnswers.length == 40) {
    localStorage.setItem("personality-type", JSON.stringify(assessmentAnswers));
    nextQuestionBtn.style.display = "none";
    getResultBtn.style.display = "flex";
    return;
  }

  assessmentQuestion.textContent =
    questions[questionNumber].question || questions[questionNumber];
}

function answerQuestionHandler(e) {
  if (assessmentAnswers.length == questions.length) return;

  //to check if the question has been answered previously and the answer is being edited
  let index = assessmentAnswers.findIndex(
    (answer) =>
      answer.question.toLowerCase() ==
      assessmentQuestion.textContent.toLowerCase()
  );

  if (index != -1) {
    let tag = questions[questionNumber].tag ?? "";
    let question =
      questions[questionNumber].question ?? questions[questionNumber];

    assessmentAnswers[index] = generateObj(tag, question, e.target.value);
  } else {
    let tag = questions[questionNumber].tag ?? "";
    let question =
      questions[questionNumber].question ?? questions[questionNumber];

    assessmentAnswers.push(generateObj(tag, question, e.target.value));
  }

  questionNumber++;

  setTimeout(() => {
    renderQuestion();

    // checks if question has already been answered to
    // render the check on radio button for next question
    if (!!assessmentAnswers[questionNumber]) {
      answerOptions.forEach((option) => {
        if (option.value == assessmentAnswers[questionNumber].answer) {
          option.checked = true;
        }
      });
      return;
    }
    answerOptions.forEach((option) => (option.checked = false));
  }, 500);
}

function getPreviousQuestion() {
  // next.style.setProperty("display", "flex");

  if (questionNumber <= 0) return;
  questionNumber--;
  renderQuestion();

  answerOptions.forEach((option) => {
    if (option.value == assessmentAnswers[questionNumber].answer) {
      option.checked = true;
    }
  });

  // if (questionNumber == 0) {
  //   previous.style.setProperty("visibility", "hidden");
  //   return;
  // }
}

function getNextQuestion() {
  if (
    assessmentAnswers.length == 0 ||
    questionNumber == assessmentAnswers.length
  )
    return;
  questionNumber++;

  // if (questionNumber >= assessmentAnswers.length) {
  //   next.style.setProperty("visibility", "hidden");
  //   return;
  // }
  renderQuestion();

  //to uncheck the radio btns for the current question that wasn't answered
  if (!assessmentAnswers[questionNumber]) {
    answerOptions.forEach((option) => (option.checked = false));
    return;
  }
  answerOptions.forEach((option) => {
    if (option.value == assessmentAnswers[questionNumber].answer) {
      option.checked = true;
    }
  });
}

function generateObj(tag, question, answer) {
  return !tag.length
    ? { question: question, answer: answer }
    : { tag, question: question, answer: answer };
}
