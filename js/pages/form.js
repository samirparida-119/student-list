import { AUTH_KEY } from '../core/constants.js';
import { addUser, editUser } from '../core/events.js';
import {
  getLocalStorage,
  loadTemplate,
  prefillForm,
  navigate,
  setPageTitle,
} from '../core/utils.js';

document.addEventListener('DOMContentLoaded', function () {
  loadTemplate();

  const submitForm = document.querySelector('.add-user-form');
  const btnSubmit = document.querySelector('.add-user-form button[type="submit"]');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userId = Number(urlParams.get('id'));

  // Check if userId is a valid number
  const isEdit = !isNaN(userId) && userId !== 0;

  if (isEdit) {
    prefillForm(userId);
    setPageTitle('Edit');
    btnSubmit.textContent = 'Update';
  } else {
    setPageTitle('Add');
    btnSubmit.textContent = 'Add';
  }

  const auth = getLocalStorage(AUTH_KEY);

  if (!auth) {
    btnSubmit.disabled = true;
    btnSubmit.title = 'Unauthorized';
  } else {
    btnSubmit.disabled = false;
    btnSubmit.title = '';
  }

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!auth) {
      // Double check authorization before submission
      alert('You are not authorized to perform this action.');
      return;
    }

    if (isEdit) {
      editUser(userId);
    } else {
      addUser();
    }

    navigate('/index.html');
  });
});
