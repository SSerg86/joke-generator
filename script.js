import {
  CATEGORIES_LINK,
  HEART,
  RANDOME_JOKE,
  CARDS_LIST,
  FORM,
  API,
  listOfCategories,
  checkboxes,
  SEARCH_INPUT,
} from './variables.js';

// CONTROLLERS
const controller = (link) => {
  return fetch(link).then((response) =>
    response.ok ? response.json() : Promise.reject(response.statusText)
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
                          value="${cat}"
                          ${!index ? 'checked' : ''}
                          />
                      <label 
                          for="${cat}Category"
                          >
                          ${cat}
                      </label>
                    </li>
          `
        )
        .join('')
    )
    .then((listStr) => (listOfCategories.innerHTML += listStr))
    .catch((err) => console.err(err));
};

// HANDLE CHECKBOX INPUT
const handleCheckbox = () => {
  checkboxes.forEach((el) =>
    el.addEventListener('change', (e) => {
      e.target.id === 'categoryJoke'
        ? listOfCategories.classList.remove('hidden')
        : listOfCategories.classList.add('hidden');
      e.target.id === 'searchJoke'
        ? SEARCH_INPUT.classList.remove('hidden')
        : SEARCH_INPUT.classList.add('hidden');
    })
  );
};

// FORM SUBMIT
const getFormSubmit = (form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let checkboxValue = form.querySelector(
        `input[name="filterCategory"]:checked`
      ).value,
      url = API;

    switch (checkboxValue) {
      case 'random':
        url += `/random`;
        break;
      case 'category':
        let checkedCategory = form.querySelector(
          `input[name="jokeCategory"]:checked`
        ).value;
        url += `/random?category=${checkedCategory}`;
        break;
      case 'search':
        url += `/search?query=${SEARCH_INPUT.value}`;
        break;
    }

    getJoke(url);
  });
};

// CREATE HEART BTN
const heartBTN = () => {
  let heartBtn = document.createElement('span');
  heartBtn.className = `card-heart_btn`;

  let icon = document.createElement('i');
  icon.className = 'far fa-heart heart';
  icon.id = 'heart';
  icon.addEventListener('click', (e) => {
    e.target.classList.toggle('fas');
  });
  heartBtn.append(icon);

  return heartBtn;
};

// CREATE CARD
const createCard = (obj) => {
  const { url, id, value, updated_at, categories } = obj;

  let jokeCard = document.createElement('div');
  jokeCard.className = `card`;
  jokeCard.dataset.id = `j-` + id;

  let heartBtn = heartBTN();

  jokeCard.append(heartBtn);

  let innerCard = document.createElement('div');
  innerCard.className = `card-info`;
  innerCard.innerHTML = `<div>
                            <div class="card-img"></div>
                          </div>
                          <div class="card-inner">
                            <span>id:</span
                            ><a href="${url}" class="card-id_link">${id}</a>
                            <p class="card-text">
                              ${value}
                            </p>
                            <div class="card-footer">
                              <span>Last update: ${updated_at}</span>
                              <div class="card-joke_category">${
                                categories.length > 0 ? categories[0] : `random`
                              }</div>
                            </div>
                          </div>`;
  jokeCard.append(innerCard);

  return jokeCard;
};

// GET JOKE
const getJoke = (link) => {
  controller(link)
    .then((jokes) => {
      return jokes.result
        ? jokes.result.map((joke) => createCard(joke))
        : createCard(jokes);
    })
    .then((listStr) => {
      CARDS_LIST.innerHTML = '';
      Array.isArray(listStr)
        ? listStr.forEach((joke) => CARDS_LIST.append(joke))
        : CARDS_LIST.append(listStr);
    })

    .catch((err) => console.err(err));
};

// ADD FAVOURITE

// APP LOAD
const app = () => {
  getListOfCategories(CATEGORIES_LINK);
  handleCheckbox();
  getFormSubmit(FORM);
};

app();
