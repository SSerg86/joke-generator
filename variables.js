// LINKS
const CATEGORIES_LINK = 'https://api.chucknorris.io/jokes/categories';

// DOM
const listOfCategories = document.querySelector('#listOfCategories');
const checkboxes = document.querySelectorAll('input[data-id="filter"]');
const searchInput = document.querySelector('.form-category_search');
const HEART = document.querySelectorAll('.heart');

export { CATEGORIES_LINK, HEART, listOfCategories, checkboxes, searchInput };
