const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'employee_db'
  },
  console.log(`Connected to the database.`)
);

function initialQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "db",
        choices: ["View all Employees", "Add Employee", "View all Roles", "Add Role", "View all Departments", "Add Department", "Update Employee Role", "Quit"]
      }
    ])
    .then((answerOptions) => {
      if (answerOptions.db === "View all Employees") {
        viewEmployees()
      } else if (answerOptions.db === "Add Employee") {
        addEmployee()
      } else if (answerOptions.db === "View all Roles") {
        viewRoles()
      } else if (answerOptions.db === "Add Role") {
        addRole()
      } else if (answerOptions.db === "View all Departments") {
        viewDepartments()
      } else if (answerOptions.db === "Add Department") {
        addDepartment()
      } else if (answerOptions.db === "Update Employee Role") {
        updateEmployeeRole()
      } else {
        console.log("Thank you for stopping by!")
      }
    })
}

initialQuestion()

function viewEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    err ? console.error(err) : console.table(results);
  });
  initialQuestion()
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role id?",
        name: "roleId"
      },
      {
        type: "input",
        message: "What is the employee's manager id?",
        name: "managerId"
      },
    ])
    .then(() => {
      db.query('SELECT * FROM employee', function (err, results) {
        err ? console.error(err) : console.table(results);
      });
      initialQuestion()
    })
}

function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    err ? console.error(err) : console.table(results);
  });
  initialQuestion()
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role?",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "What is the role's salary?",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "What is the deparment id?",
        name: "departmentId"
      }
    ])
    .then(() => {
      db.query('SELECT * FROM role', function (err, results) {
        err ? console.error(err) : console.table(results);
      });
      initialQuestion()
    })
}

function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    err ? console.error(err) : console.table(results);
  });
  initialQuestion()
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName"
      }
    ])
    .then(() => {
      db.query('SELECT * FROM department', function (err, results) {
        err ? console.error(err) : console.table(results);
      });
      initialQuestion()
    })
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee id that you would like to update?",
        name: "employee_id"
      },
      {
        type: "input",
        message: "What is their current role?",
        name: "employee_role"
      }
    ])
    .then(() => {
      db.query('SELECT * FROM employee', function (err, results) {
        err ? console.error(err) : console.table(results);
      });
      initialQuestion()
    })
}