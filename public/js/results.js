const displayResult = document.querySelector(".results__list");
const resultSection = document.querySelector(".results__introduction");
const resultListSection = document.querySelector(".results__list");

const subjectResultArray = JSON.parse(localStorage.getItem("subjects")) || [];
const personalityTypeResult =
  JSON.parse(localStorage.getItem("personality-type")) || [];
const testCase = JSON.parse(localStorage.getItem("test")) || { test: false };

if (testCase.test) {
  const data = {
    mathematics: 5,
    physics: 5,
    chemistry: 4,
    biology: 5,
    geography: 5,
    economics: 3,
    agricultural_science: 3,
    personality: "ISTJ",
  };

  window.addEventListener("load", () => fetchResults(data));

  localStorage.removeItem("test");
} else if (!!subjectResultArray.length && !!personalityTypeResult.length) {
  const types = personalityTypeResult
    .map((result) => parseInt(result.answer))
    .reduce((obj, { tag, answer }) => {
      if (!obj[tag]) {
        obj[tag] = 0;
      }
      obj[tag] += answer;
      return obj;
    }, {});

  const type1 = types["extraversion"] > types["introversion"] ? "E" : "I";
  const type2 = types["sensing"] > types["intuition"] ? "S" : "N";
  const type3 = types["feeling"] > types["thinking"] ? "F" : "T";
  const type4 = types["judging"] > types["perceiving"] ? "J" : "P";

  const personalityTypeString = type1 + type2 + type3 + type4;

  const subjectResults = subjectResultArray.reduce((accum, prev) => {
    if (!accum[prev.question]) {
      accum[prev.question] = parseInt(prev.answer);
    }
    return accum;
  }, {});

  const data = {
    ...subjectResults,
    personality: personalityTypeString,
  };

  window.addEventListener("load", () => fetchResults(data));
} else {
  const disclaimer = document.createElement("h3");
  disclaimer.innerText = "Take the test first then comeback";
  disclaimer.style.gridColumn = "span 2";
  resultSection.remove();

  resultListSection.appendChild(disclaimer);
}

function fetchResults(obj) {
  fetch("/results/my-result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((courses) => {
      const courseElement = courses.map(
        (course) => `
      <a href="/courses/${course.slug}" style="height: 100%">
          <article class="card--course">
          <h3>${course.name}</h3>
          <p>${course.description
            .split(" ")
            .splice(0, 20)
            .join(" ")
            .concat("...")}</p>
          </article>
      </a>`
      );
      displayResult.innerHTML = courseElement.join("");
    });
}
