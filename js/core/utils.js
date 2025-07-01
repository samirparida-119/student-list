import { users } from './db.js';
import { AUTH_KEY, STORAGE_KEY } from './constants.js';
import { deleteUser } from './events.js';

export function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(users);
		localStorage.setItem(STORAGE_KEY, parsed);
	}
}

export function isStorageExist() {
	if (typeof Storage === undefined) {
		alert('Browser kamu tidak mendukung local storage');
		return false;
	}

	return true;
}

export function loadDataFromStorage() {
	displayUserToTable(users);
}

export function getUserFormValues() {
	const course = document.getElementById('course').value;
	const name = document.getElementById('name').value;
	const registration = document.getElementById('registration').value;
	const semester = document.getElementById('semester').value;
	const backlogs = document.getElementById('backlogs').value;

	return {
		course,
		name,
		registration,
		semester,
		backlogs,
	};
}

export function setPageTitle(title) {
	document.title = title;
}

export function navigate(path) {
	window.location.href = '' + path;
}

export function displayUserToTable(users) {
	const tableBody = document.querySelector('.table-user tbody');

	for (let user of users) {
		const trData = document.createElement('tr');

		const tdcourse = document.createElement('td');
		tdcourse.textContent = user.course;

		const tdname = document.createElement('td');
		tdname.textContent = user.name;

		const tdregistration = document.createElement('td');
		tdregistration.textContent = user.registration;

		const tdsemester = document.createElement('td');
		tdsemester.textContent = user.semester;

		const tdBacklogs = document.createElement('td');
		tdBacklogs.textContent = user.backlogs;

		const tdAction = document.createElement('td');
		tdAction.classList.add('action-buttons');

		const btnEdit = document.createElement('button');
		btnEdit.textContent = 'Edit';
		btnEdit.classList.add('btn', 'btn-edit');

		btnEdit.addEventListener('click', function () {
			navigate('/form.html?id=' + user.id);
		});

		const btnDelete = document.createElement('button');
		btnDelete.textContent = 'Delete';
		btnDelete.classList.add('btn', 'btn-danger');

		btnDelete.addEventListener('click', function () {
      deleteUser(user.id)
		});

		const auth = getLocalStorage(AUTH_KEY);

		if (!auth) {
			btnDelete.disabled = true;
			btnDelete.title = 'Unauthorized';

			btnEdit.disabled = true;
			btnEdit.title = 'Unauthorized';
		}

		tdAction.append(btnEdit, btnDelete);

		trData.append(tdcourse, tdname, tdregistration, tdsemester, tdBacklogs, tdAction);

		tableBody.append(trData);
	}
}

export function findUserIndex(userId) {
	for (const index in users) {
		if (users[index].id === userId) {
			return index;
		}
	}

	return -1;
}

export function prefillForm(userId) {
	const userData = users.find((u) => u.id === userId);

	const course = document.getElementById('course');
	const name = document.getElementById('name');
	const registration = document.getElementById('registration');
	const semester = document.getElementById('semester');
	const backlogs = document.getElementById('backlogs');

	course.value = userData.course;
	name.value = userData.name;
	registration.value = userData.registration;
	semester.value = userData.semester;
	backlogs.value = userData.backlogs;
}

export function loadSidebar() {
	const main = document.querySelector('main.main');

	const sidebar = document.querySelector('aside.sidebar');
	sidebar.classList.add('sidebar');

	sidebar.innerHTML = `
    <nav>
      <ul>
        <li><a href="./index.html">List</a></li>
        <li><a href="./form.html">Add</a></li>
      </ul>
    </nav>
  `;

	main.prepend(sidebar);
}

export function loadNavbar() {
	const navbar = document.querySelector('header.header');

	const leftNav = document.createElement('div');
	leftNav.innerHTML = '<h1>Student List</h1>';
	leftNav.classList.add('left-nav');

	navbar.append(leftNav);

	const rightNav = document.createElement('div');
	rightNav.classList.add('right-nav');

	const searchInput = document.createElement('input');
	searchInput.classList.add('search-input');
	searchInput.type = 'text';
	searchInput.placeholder = 'Search...';

	rightNav.append(searchInput);

	const auth = getLocalStorage(AUTH_KEY);

	if (auth) {
		const user = users.find((u) => u.name === auth.name);

		const btnLogout = document.createElement('button');
		btnLogout.classList.add('btn', 'btn-danger');
		btnLogout.textContent = 'Logout';

		btnLogout.addEventListener('click', function () {
			removeLocalStorage(AUTH_KEY);
			location.reload();
		});

		const greetElement = document.createElement('p');
		greetElement.textContent = `Hello, ${user ? user.fullname : 'User'}!`;

		rightNav.prepend(greetElement);
		rightNav.append(btnLogout);
	} else {
		const btnLogin = document.createElement('a');
		btnLogin.href = '/login.html';
		btnLogin.classList.add('btn', 'btn-primary');
		btnLogin.textContent = 'Login';

		rightNav.append(btnLogin);
	}

	navbar.append(rightNav);

	document.body.prepend(navbar);
}

export function loadTemplate() {
	loadNavbar();
	loadSidebar();
}

export function setLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

export function removeLocalStorage(key) {
	localStorage.removeItem(key);
}
