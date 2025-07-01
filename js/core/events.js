import { users } from './db.js';
import { findUserIndex, getUserFormValues, saveData } from './utils.js';

export function addUser() {
	const { course, name, registration, semester, backlogs } = getUserFormValues();

	const data = {
		id: Date.now(),
		course,
		name,
		registration,
		semester,
		backlogs,
   
	};

	users.push(data);
	saveData();

	alert('Success adding data!');
}

export function editUser(userId) {
	const data = users.find((u) => u.id === userId);

	if (!data) {
		alert('No data found!');
		return;
	}

	const dataIndex = findUserIndex(userId);

	const { course, name, registration, semester, backlogs } = getUserFormValues();

	const updatedData = {
		id: userId,
		course,
		name,
		registration,
		semester,
		backlogs,
   
	};

	users[dataIndex] = updatedData;
	saveData();

	alert('Success updating data!');
}

export function deleteUser(userId) {
  if (!confirm('Are you sure want to delete the data?')) {
    return;
  }

  const userTarget = findUserIndex(userId);

  if (userTarget === -1) return;

  users.splice(userTarget, 1);
  saveData();

  alert('Success deleting data!');

  location.reload();
}