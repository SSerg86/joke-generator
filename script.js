import {
  CATEGORIES_LINK,
  STORAGE,
  FAVE_LIST,
  JOKES_LIST,
  FORM,
  API,
  listOfCategories,
  checkboxes,
  SEARCH_INPUT,
  MENU_ICON,
} from './variables.js';

// CONTROLLERS
const controller = async (link) => {
  const response = await fetch(link);
  return await (response.ok
    ? response.json()
    : Promise.reject(response.statusText));
};

//STORAGE
const getStorage = (key) =>
  localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;

const setStorage = (key, item) => {
  let storage = getStorage(key) ? getStorage(key) : new Array();

  storage.push(item);
  localStorage.setItem(key, JSON.stringify(storage));
};

const removeStorage = (key, indexItem) => {
  let storage = getStorage(key) ? getStorage(key) : new Array();

  storage.splice(indexItem, 1);
  localStorage.setItem(key, JSON.stringify(storage));
};

const itemExistInStorage = (key, item) => {
  let storage = getStorage(key),
    itemIndex = -1;

  if (storage) {
    itemIndex = storage.findIndex((el) => el.id === item.id);
  }

  return itemIndex;
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
const createHeartBTN = (joke) => {
  let heartBtn = document.createElement('span');
  heartBtn.className = `card-heart_btn`;

  let icon = document.createElement('i');

  icon.className = joke.isFavourite
    ? 'fas fa-heart heart'
    : 'far fa-heart heart';
  icon.id = 'heart';
  heartBtn.append(icon);

  return heartBtn;
};

// CREATE CARD
const createJokeCard = (joke) => {
  const { url, id, value, updated_at, categories } = joke;

  let jokeCard = document.createElement('div');
  jokeCard.className = `card`;
  jokeCard.dataset.id = `j_` + id;

  let heartBtn = createHeartBTN(joke);

  heartBtn.addEventListener('click', (event) => addToFav(joke, event));

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

// ADD FAVOURITE
const addToFav = (joke, event) => {
  event.target.classList.toggle('fas');
  let itemIndex = itemExistInStorage(STORAGE, joke);
  joke.isFavourite = joke.isFavourite ? false : true;
  if (itemIndex == -1) {
    setStorage(STORAGE, joke);
    let faveJoke = createJokeCard(joke);

    FAVE_LIST.append(faveJoke);
  } else {
    removeStorage(STORAGE, itemIndex);
    FAVE_LIST.querySelector(`div[data-id=j_${joke.id}]`).remove();
    if (JOKES_LIST.querySelector(`div[data-id=j_${joke.id}] i`)) {
      JOKES_LIST.querySelector(`div[data-id=j_${joke.id}] i`).classList.remove(
        'fas'
      );
    }
  }
};

// RENDER FAVE JOKES LIST
const renderFavJokes = () => {
  let storage = getStorage(STORAGE);

  if (storage) {
    storage.forEach((joke) => FAVE_LIST.append(createJokeCard(joke)));
  }
};

// GET JOKE
const getJoke = (link) => {
  controller(link)
    .then((jokes) => {
      return jokes.result
        ? jokes.result.map((joke) => createJokeCard(joke))
        : createJokeCard(jokes);
    })
    .then((listStr) => {
      JOKES_LIST.innerHTML = '';
      Array.isArray(listStr)
        ? listStr.forEach((joke) => JOKES_LIST.append(joke))
        : JOKES_LIST.append(listStr);
    })

    .catch((err) => console.err(err));
};

// MENU BUTTON
MENU_ICON.addEventListener('click', () => {
  MENU_ICON.classList.toggle('change');
  FAVE_LIST.classList.toggle('fave-bar_hidden');
});

// APP LOAD
const app = () => {
  getListOfCategories(CATEGORIES_LINK);
  handleCheckbox();
  getFormSubmit(FORM);
  renderFavJokes();
};

app();
