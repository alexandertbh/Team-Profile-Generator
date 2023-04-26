const inquirer = require("inquirer");
const Employee = require("./Employee");
const Intern = require("./Intern");
const Manager = require("./Manager");
const fs = require("fs");
const createPage = require("../util/generateHtml");
const Engineer = require("./Engineer");
const generateHtml = require("../util/generateHtml");

const employees = [];

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "would you like to add a new employee?",
        name: "employee",
      },
    ])
    .then(({ employee }) => {
      if (employee) {
        selectEmployee();
      }
    });
}

function selectEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        choices: ["Engineer", "Manager", "Intern"],
        message: "What kind of employee would you like to add?",
        name: "newEmployee",
      },
    ])
    .then(({ newEmployee }) => {
      if (newEmployee === "Engineer") {
        newEngineer();
      }
      if (newEmployee === "Intern") {
        newIntern();
      }
      if (newEmployee === "Manager") {
        newManager();
      }
    });
}

function newEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the employee's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the employee's GitHub Username?",
        name: "username",
      },
    ])
    .then(({ answers }) => {
      const newEmployee = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employees.push(newEmployee);
      console.log(newEmployee);
      console.log(employees);
      generateHtml(employees);
    });
}

function newIntern() {}

function newManager() {}

addEmployee();
