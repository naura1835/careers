import { debounce } from "./util.js";

const coursesWrapper = document.querySelector(".all-courses-list");
const filterSearch = document.querySelector(
  ".all-courses__introduction__search input"
);

filterSearch.addEventListener("input", debounce(filterCourses, 300));

async function filterCourses(e) {
  if (!e.target.value) {
    location.reload();
  } else {
    try {
      const response = await fetch(
        `/courses/search?searchString=${e.target.value}`
      );
      const filteredCourses = await response.json();

      renderCourses(filteredCourses);
    } catch (err) {
      console.error(err);
    }
  }
}

function renderCourses(courses) {
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

  coursesWrapper.innerHTML = courseElement.join("");
}
