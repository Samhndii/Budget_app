# 🧾 Budget Management App

A Node.js-based budget tracking application that allows users to set monthly budgets, log expenses, view summaries, and manage their financial activity.

---

## 📌 Features

- ✅ User registration and login with session-based authentication
- 💰 Add, edit, and delete expenses by category and date
- 📊 View total and filtered summaries of expenses
- 🗓️ Set monthly budgets and view usage status
- 📤 Email notifications for confirmations (optional)
- 📂 All data stored in a MySQL database

---

## 🔧 Technologies Used

- Node.js
- Express
- EJS Templating
- MySQL
- Bootstrap 5
- dotenv
- Jest & Supertest (for testing)

---

## 📁 Project Structure

```bash
budget-app/
│
├── server.js                   # running the local host
├── app.js                   # Main entry point
├── db.js                    # MySQL database connection
├── .env                     # Environment variables (DB credentials, etc.)
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency tree lock file
├── README.md                   # project main details
│
├── routes/                  # Route handlers
│   ├── auth.js              # User authentication (login/register)
│   ├── budget.js            # Budget-related routes
│   └── expenses.js          # Expense-related routes
│
├── views/                   # EJS templates for rendering HTML
│   ├── index.ejs            # Home page
│   ├── login.ejs            # Login form
│   ├── register.ejs         # Registration form
│   ├── add.ejs              # Add expense form
│   ├── budget.ejs           # Set/Update budget
│   └── summary.ejs          # Summary view
│
├── public/                  # Static assets
│   ├── css/
│   │   └── style.css        # Custom styles
│   └── js/
│       └── myjs.js          # Client-side JavaScript (e.g., popups, filters)
│
├── utils/
│   └── mail.js              # Mail utility (e.g., prepared for future email support)
│
├── __tests__/               # Automated tests using Jest + Supertest
│   ├── auth.test.js         # Authentication test cases
│   ├── budget.test.js       # Budget feature tests
│   └── expenses.test.js     # Expense feature tests

```

---

## 🚀 How to Run the App

1. **Install dependencies**
   ```bash
   npm install
   npm install express mysql2 ejs body-parser
   npm install nodemailer express-session
   npm install dotenv nodemailer express-session uuid
   npm install bcrypt
   npm install connect-flash
   npm install --save-dev jest supertest # for Automated testing

   node server.js #to run the localhost 3000

   ```

2. **Set up your db & `.env` file** with:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourDbPassword
   DB_NAME=budget_db
   
   MAIL_HOST=sandbox.smtp.mailtrap.io
   MAIL_PORT=587
   MAIL_USER=MailtrapUsername
   MAIL_PASS=MailtrapPassword

   ```

3. **Start the app**
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser.

---

## 🧪 Running Tests

```bash
npx jest
```

---

## 📹 Demo Video

🔗https://drive.google.com/file/d/1vzadGhY6CkTMEU-mmxmecHENS1W3YYVq/view?usp=sharing

---

## 📸 Screenshots

| Feature               | Screenshot                       |
|-----------------------|----------------------------------|
| Main Page             | `screen_shots/main_page.png`     |
| Register Page         | `screen_shots/register.png`      |
| Login Page            | `screen_shots/login.png`         |
| Add Expense Form      | `screen_shots/add-expense.png`   |
| Add budget Form       | `screen_shots/add-budget.png`    |
| Budget Summary        | `screen_shots/summary.png`       |

---

## 👨‍💻 Developed By
**Saqr ABDULLA Almohannadi**  
- Up2245028@myport.ac.uk
- +97433006622
