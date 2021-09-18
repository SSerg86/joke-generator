// LINKS
const CATEGORIES_LINK = 'https://api.chucknorris.io/jokes/categories';
const RANDOME_JOKE = 'https://api.chucknorris.io/jokes/random';
const API = 'https://api.chucknorris.io/jokes';

// DOM
const listOfCategories = document.querySelector('#listOfCategories');
const checkboxes = document.querySelectorAll('input[data-id="filter"]');
const SEARCH_INPUT = document.querySelector('.form-category_search');
const JOKES_LIST = document.querySelector('#cardsList');
const FAVE_LIST = document.querySelector('.app-favourite');
const FORM = document.querySelector('#filterForm');
const MENU_ICON = document.querySelector('.menu-bar');

//STORAGE

const STORAGE = `jokes`;

export {
  CATEGORIES_LINK,
  RANDOME_JOKE,
  API,
  listOfCategories,
  checkboxes,
  SEARCH_INPUT,
  JOKES_LIST,
  FORM,
  FAVE_LIST,
  STORAGE,
  MENU_ICON,
};
