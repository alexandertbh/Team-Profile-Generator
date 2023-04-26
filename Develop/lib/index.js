const inquirer = require("inquirer");
const Employee = require("./Employee");
const Intern = require("./Intern");
const Manager = require("./Manager");
const fs = require("fs");
const createPage = require("../util/generateHtml");
const Engineer = require("./Engineer");

const team = [];

function newTeam() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "would you like to create a new team?",
        name: "newTeam",
      },
    ])
    .then(({ newTeam }) => {
      if (newTeam) {
        createManager();
      }
    });
}

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the Manager's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the Manager's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the manager's office number?",
        name: "officenum",
      },
    ])
    .then(({ name, id, email, officenum }) => {
      const newManager = new Manager(name, id, email, officenum);
      team.push(newManager);
      console.log(newManager);
      console.log(team);
      selectEmployee();
    });
}

function selectEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        choices: ["Engineer", "Intern", "I don't want to add any team members"],
        message: "What kind of employee would you like to add to the team?",
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
      if (newEmployee === "I don't want to add any team members") {
        fs.writeFile("./index.html", createPage(team), (err) => {
          if (err) {
            throw err;
          } else {
            console.log("your html has been generated! Check index.html");
          }
        });
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
    .then(({ name, id, email, username }) => {
      const newEmployee = new Engineer(name, id, email, username);
      team.push(newEmployee);
      console.log(newEmployee);
      console.log(team);
      selectEmployee();
    });
}

function newIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the intern's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the interns's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the intern's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the intern's school?",
        name: "school",
      },
    ])
    .then(({ name, id, email, school }) => {
      const newIntern = new Intern(name, id, email, school);
      team.push(newIntern);
      console.log(newIntern);
      console.log(team);
      selectEmployee();
    });
}

newTeam();
