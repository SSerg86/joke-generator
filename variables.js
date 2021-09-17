// LINKS
const CATEGORIES_LINK = 'https://api.chucknorris.io/jokes/categories';
const RANDOME_JOKE = 'https://api.chucknorris.io/jokes/random';
const API = 'https://api.chucknorris.io/jokes';

// DOM
const listOfCategories = document.querySelector('#listOfCategories');
const checkboxes = document.querySelectorAll('input[data-id="filter"]');
const SEARCH_INPUT = document.querySelector('.form-category_search');
const HEART = document.querySelectorAll('.card-heart_btn');
const CARDS_LIST = document.querySelector('#cardsList');
const FORM = document.querySelector('#filterForm');

export {
  CATEGORIES_LINK,
  HEART,
  RANDOME_JOKE,
  API,
  listOfCategories,
  checkboxes,
  SEARCH_INPUT,
  CARDS_LIST,
  FORM,
};
