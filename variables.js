// LINKS
const CATEGORIES_LINK = 'https://api.chucknorris.io/jokes/categories';
const RANDOME_JOKE = 'https://api.chucknorris.io/jokes/random';

// DOM
const listOfCategories = document.querySelector('#listOfCategories');
const checkboxes = document.querySelectorAll('input[data-id="filter"]');
const searchInput = document.querySelector('.form-category_search');
const HEART = document.querySelectorAll('.heart');
const CARDS_LIST = document.querySelector('#cardsList');

export {
  CATEGORIES_LINK,
  HEART,
  RANDOME_JOKE,
  listOfCategories,
  checkboxes,
  searchInput,
  CARDS_LIST,
};
