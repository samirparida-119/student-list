import { AUTH_KEY } from '../core/constants.js';
import { getLocalStorage, setLocalStorage, navigate } from '../core/utils.js';

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('form.login-form');
  const errorDiv = document.createElement('div');
  errorDiv.id = 'error-message';
  errorDiv.style.color = 'red';
  loginForm.append(errorDiv);

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    // Always get the latest users from localStorage!
    const users = getLocalStorage('users') || [];

    const user = users.find((u) => u.email.toLowerCase() === email);

    if (!user) {
      errorDiv.textContent = 'No account found!';
      return;
    }

    if (user.password === password) {
      setLocalStorage(AUTH_KEY, { email: user.email });
      errorDiv.style.color = 'green';
      errorDiv.textContent = 'Login success! Redirecting...';
      setTimeout(() => navigate('/index.html'), 1000);
    } else {
      errorDiv.textContent = 'Incorrect password!';
    }
  });
});
