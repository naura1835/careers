import { debounce } from "./util.js";

const hamburgerMenu = document.querySelector(".header-menu");
const searchBtn = document.querySelector(".desktop-search img");
const searchBar = document.querySelector(".desktop-search [type='text']");
const search = document.querySelector(".search__input input");

hamburgerMenu.addEventListener("click", toggleMenu);
searchBtn.addEventListener("click", toggleSearchBar);
search.addEventListener("input", debounce(searchCourse, 300));
searchBar.addEventListener("input", debounce(searchCourse, 300));

//toggle desktop version search
function toggleSearchBar() {
  setTimeout(() => {
    searchBar.classList.toggle("search-bar--active");
  }, 400);
}

//open/close menu
function toggleMenu() {
  document.body.classList.toggle("active");
}

async function searchCourse(e) {
  const searchResultDiv =
    window.innerWidth < 900
      ? document.querySelector(".search__result")
      : document.querySelector(".search__result--desktop");

  let courses = [];

  if (e.target.value.length == 0) {
    return (searchResultDiv.style.display = "none");
  }

  searchResultDiv.style.display = "block";

  try {
    displayLoading(searchResultDiv);

    const response = await fetch(
      `/courses/search?searchString=${e.target.value}`
    );

    courses = await response.json();

    hideLoading(searchResultDiv);

    if (courses.length != 0) {
      const courseList = courses.map(
        ({ name, description, slug }) =>
          `<a href='/courses/${slug}'>
            <li class="search__result__item">
              <span class="search__result__item__title">${name}</span>
              <span class="search__result__item__description">
                ${description.split(" ").splice(0, 20).join(" ").concat("...")}
                </span>
            </li>
          </a>`
      );

      searchResultDiv.innerHTML = courseList.join("");
    } else {
      searchResultDiv.innerHTML = `<span class="search__result__no-match">Oops looks like there is no match</span>`;
    }
  } catch (err) {
    console.log(err);
  }
}

function displayLoading(element) {
  const loadingDiv = `<li class="loading"></li>`;

  element.innerHTML = loadingDiv;
}
function hideLoading(element) {
  element.innerHTML = "";
}
