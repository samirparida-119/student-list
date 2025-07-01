
# 🧑‍🎓 Student Management Dashboard

A simple Student Management System built using vanilla HTML, CSS, and JavaScript. It allows you to:

- Log in as a user
- Add student records via a form
- View a list of students in a responsive table
- Perform basic front-end structure for future CRUD operations

---

## 📁 Project Structure

```

/project-root
│
├── index.html               # Student list dashboard page
├── form.html                # Student registration form page
├── login.html               # Login page
│
├── /style
│   ├── global.css           # Shared/global styles
│   └── pages/login.css      # Login-specific styles
│
├── /js
│   └── /pages
│       ├── index.js         # Logic to render student list
│       ├── form.js          # Logic for student registration form
│       └── login.js         # Login functionality
│
├── /core                    # (Assumed: used for constants, utils, db if present)
│   ├── constants.js
│   ├── utils.js
│   └── db.js
│
└── README.md                # This file

````

---

## 🚀 How to Run

1. **Clone or Download** the project files to your local machine.
2. Open `login.html` in a browser to begin from the login page.
3. After login, navigate to:
   - `form.html` to add a new student
   - `index.html` to view the student list

> Ensure you are using a local server if your JavaScript module imports are blocked in the browser. You can use:

```bash
# Using VS Code Live Server
Right click -> "Open with Live Server"

# OR Python 3 HTTP Server
python -m http.server

# OR Node.js HTTP server (if installed globally)
npx serve
````

---

## 🔑 Features

* Responsive student data table
* Accessible table markup (includes caption and scope tags)
* Visually hidden captions for screen readers
* Modular JavaScript (uses ES Modules)
* Clean and structured HTML & CSS

---

## ✍️ Author

Made by **Samir Parida**

---

## 📌 To-Do / Future Improvements

* Add persistent storage using localStorage or a backend database
* Implement full CRUD functionality
* Add authentication logic for login
* Improve UI/UX with frameworks or component libraries
