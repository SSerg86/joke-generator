import {
  CATEGORIES_LINK,
  HEART,
  RANDOME_JOKE,
  CARDS_LIST,
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

// GET RANDOME JOKE
const getRandomeJoke = (link) => {
  controller(link)
    .then((joke) => {
      return `
    <div class="card">
            <span class="card-heart_btn">
              <i class="far fa-heart heart" id="heart"></i>
            </span>
            <div class="card-info">
              <div>
                <div class="card-img"></div>
              </div>
              <div class="card-inner">
                <span>id:</span
                ><a href="${joke.url}" class="card-id_link">${joke.id}</a>
                <p class="card-text">
                  ${joke.value}
                </p>
                <div class="card-footer">
                  <span>Last update: ${joke.updated_at}</span>
                  <div class="card-joke_category">random</div>
                </div>
              </div>
            </div>
          </div>`;
    })
    .then((listStr) => (CARDS_LIST.innerHTML += listStr))
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
Array.from(HEART).forEach((el) =>
  el.addEventListener('click', () => {
    if (el.classList.contains('like')) {
      el.classList.remove('like', 'fas');
      el.classList.add('far');
    } else {
      el.classList.remove('far');
      el.classList.add('like', 'fas');
    }
  }),
);

// ADD FAVOURITE

// APP LOAD
const app = () => {
  getListOfCategories(CATEGORIES_LINK);
  handleCheckbox();
  getRandomeJoke(RANDOME_JOKE);
};

app();
