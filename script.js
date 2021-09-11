import {
  CATEGORIES_LINK,
  HEART,
  listOfCategories,
  checkboxes,
  searchInput,
} from './variables.js';

// CONTROLLERS

const controller = (link) => {
  return fetch(link).then((response) =>
    response.ok ? response.json() : Promise.reject(response.statusText),
  );
};

// GET LIST OF CATEGORIES

const getListOfCategories = (link) => {
  controller(link)
    .then((categories) =>
      categories
        .map(
          (cat, index) => `
                    <li class="form-category__radio_btn">
                      <input 
                          type="radio" 
                          id="${cat}Category" 
                          name="jokeCategory" 
                          ${!index ? 'checked' : ''}
                          />
                      <label 
                          for="${cat}Category"
                          >
                          ${cat}
                      </label>
                    </li>
          `,
        )
        .join(''),
    )
    .then((listStr) => (listOfCategories.innerHTML += listStr))
    .catch((err) => console.err(err));
};

// HANDLE CHECKBOX INPUT

const handleCheckbox = () => {
  Array.from(checkboxes).forEach((el) =>
    el.addEventListener('change', (e) => {
      switch (e.target.id) {
        case 'categoryJoke':
          listOfCategories.classList.remove('hidden');
          searchInput.classList.add('hidden');
          break;
        case 'searchJoke':
          searchInput.classList.remove('hidden');
          listOfCategories.classList.add('hidden');
          break;
        case 'randomJoke':
          listOfCategories.classList.add('hidden');
          searchInput.classList.add('hidden');
          break;
      }
    }),
  );
};

// HEART CLICK

HEART.addEventListener('click', () => {
  if (HEART.classList.contains('like')) {
    HEART.classList.remove('like', 'fas');
    HEART.classList.add('far');
  } else {
    HEART.classList.remove('far');
    HEART.classList.add('like', 'fas');
  }
});

// APP LOAD

const app = () => {
  getListOfCategories(CATEGORIES_LINK);
  handleCheckbox();
};

app();
