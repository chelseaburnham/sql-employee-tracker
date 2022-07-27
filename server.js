const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: ''
    },
    console.log(`Connected to the database.`)
  );