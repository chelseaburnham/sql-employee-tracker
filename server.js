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
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
  var sqlString = 'SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, me.first_name as "manager first_name", me.last_name  as "manager last_name" FROM employee as e'
  sqlString += ` inner join role as r on e.role_id = r.id`
  sqlString += ` inner join department as d on r.department_id = d.id`
  sqlString += ` inner join employee as me on e.manager_id = me.id`
  db.query(sqlString, function (err, results) {
    err ? console.error(err) : console.table(results);
    initialQuestion()
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name"
      },
      {
        type: "input",
        message: "What is the employee's role id?",
        name: "role_id"
      },
      {
        type: "input",
        message: "What is the employee's manager id?",
        name: "manager_id"
      },
    ])
    .then((newEmployee) => {
      db.query('INSERT INTO employee SET ?', newEmployee, function (err, results) {
        err ? console.error(err) : console.log("New employee has been added.");
        initialQuestion()
      });
    })
}

function viewRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    err ? console.error(err) : console.table(results);
    initialQuestion()
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role?",
        name: "title"
      },
      {
        type: "input",
        message: "What is the role's salary?",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the deparment id?",
        name: "department_id"
      }
    ])
    .then((newRole) => {
      db.query('INSERT INTO role SET ?', newRole, function (err, results) {
        err ? console.error(err) : console.log("New role has been added.");
        initialQuestion()
      });
    })
}

function viewDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    err ? console.error(err) : console.table(results);
    initialQuestion()
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "name"
      }
    ])
    .then((newDepartment) => {
      //join new department info to table
      db.query('INSERT INTO department SET ?', newDepartment, function (err, results) {
        err ? console.error(err) : console.log("New department has been added.");
        initialQuestion()
      });
    })
}

function updateEmployeeRole() {
  db.query('SELECT * FROM role', function (err, results) {
    err ? console.error(err) : console.log("Employee has been updated.")
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee id that you would like to update?",
          name: "employee_id"
        },
        {
          type: "input",
          message: "What is their new role id?",
          name: "employee_role"
        }
      ])
      .then((newData) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [newData.employee_role, newData.employee_id], function (err, results) {
          err ? console.error(err) : console.log("Employee role has been udpated.");
          initialQuestion()
        });
      })
  })
}