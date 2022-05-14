const inquirer = require("inquirer");
const db = require("./db/connection");


const department =  [
      {
        type: "input",
        name: "new_department",
        message: "What is the name of the department you'd like to add?",
      },
    ]


async function mainMenu() {
    await inquirer.prompt([
        {
            type: "list",
            name: "Choice",
            message: "Which of the following would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update employee role"]
        },
    ])
        .then(function (response) {
            console.log(response);
            //check to see if they are viewing or adding or updating
            if (response.Choice == "View all departments" || response.Choice == "View all roles" || response.Choice == "View all employees") {
                search(response);
            }

            else if (response.Choice.split(' ')[0] === "Add") {
                add(response);
            }
            else update(response);


        });

};
mainMenu();

async function search(ans) {
    console.log("You are searching for an " + ans.Choice.split(' ')[2]);
    const [rows, fields] = await db.query("SELECT * FROM " + ans.Choice.split(' ')[2])
    // if (err) {
    //     console.log(err);
    //     return;
    // }
    console.table(rows);

    console.log("--------------------------")
    mainMenu();

}

async function add(ans) {
    console.log("You are adding a " + ans.Choice.split(' ')[2]);
    if(ans.Choice.split(' ')[2] == "department"){
        await inquirer.prompt([
            {
              type: "input",
              name: "new_department",
              message: "What is the name of the department you'd like to add?",
            },
          ])
        .then(function (response) {
            console.log(response);
        });
    }
    else if(ans.Choice.split(' ')[2] == "role"){
        await inquirer.prompt([
            {
              type: "input",
              name: "new_role",
              message: "What is the role you'd like to add?",
            },
            {
              type: "input",
              name: "role_salary",
              message: "What is the salary for this role?",
            },
            {
              type: "input",
              name: "role_department",
              message: "Which department does this role belong in?",
            },
          ])
        .then(function (response){
            console.log(response);
        });
    }
    else if(ans.Choice.split(' ')[2] == "employee"){   
        await inquirer.prompt([
            {
              type: "input",
              name: "employee_first",
              message: "What is the first name of the employee?",
            },
            {
              type: "input",
              name: "employee_last",
              message: "What is the last name of the employee?",
            },
            {
              type: "input",
              name: "employee_role",
              message: "What is the role of this employee?",
            },
            {
              type: "input",
              name: "employee_manager",
              message:
                "Enter the name of the employee's manager. If this employee doesn't have a manager, leave it blank and press enter.",
            },
          ])
        .then(function(response) {
            console.log(response);
        });

    }


    mainMenu();
}

async function update(ans) {
    console.log("You are updating " + ans.Choice.split(' ')[1] + " " + ans.Choice.split(' ')[2]);
    mainMenu();
}