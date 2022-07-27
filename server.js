const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");


const db = mysql.createConnection(
  {
    host: 'localhost',
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
  console.log("you chose view all employees")
  initialQuestion()
}

function addEmployee() {
  console.log("you chose add employee")
  initialQuestion()
}

function viewRoles() {
  console.log("you chose view all roles")
  initialQuestion()
}

function addRole() {
  console.log("you chose add role")
  initialQuestion()
}

function viewDepartments() {
  console.log("you chose view all departments")
  initialQuestion()
}

function addDepartment() {
  console.log("you chose add department")
  initialQuestion()
}

function updateEmployeeRole() {
  console.log("you chose update employee role")
  initialQuestion()
}