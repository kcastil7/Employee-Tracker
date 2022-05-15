const inquirer = require("inquirer");
const { execPath } = require("process");
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
    const [rows, fields] = await db.query("SELECT * FROM " + ans.Choice.split(' ')[2]);
    // if (err) {
    //     console.log(err);
    //     return;
    // }
    console.table(rows);

    console.log("--------------------------");
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
        .then(async function (response) {
            const sql = `INSERT INTO departments (name) VALUES (?)`;
            const [rows,fields] = await db.query(sql,response.new_department)
            console.log("New Department added");
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
        .then(async function (response){
            console.log(response);
            const sql = `INSERT INTO roles (title,salary,department_id) SELECT ?,?, id FROM departments WHERE name = ? `;
            const [rows,fields] = await db.query(sql,[response.new_role,response.role_salary,response.role_department]);
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
        .then(async function(response) {
          if(!response.employee_manager || response.employee_manager === ""){
            const sql = `INSERT INTO employees (first_name,last_name,role_id) SELECT ?,?, roles.id FROM roles WHERE title = ?;`;
            const [rows,fields] = await db.query(sql,[response.employee_first,response.employee_last,response.employee_role]);
          }
          else {
            const sql = `INSERT INTO employees (first_name,last_name,role_id,manager_id) SELECT ?,?, roles.id, manager.id FROM roles, employees manager WHERE roles.title = ? AND manager.first_name = ? AND manager.last_name = ?;`;
            const [rows,fields] = await db.query(sql,[response.employee_first,response.employee_last,response.employee_role,response.employee_manager.split(' ')[0],response.employee_manager.split(' ')[1]])
          }


        });

    }


    mainMenu();
}

async function update(ans) {
    console.log("You are updating " + ans.Choice.split(' ')[1] + " " + ans.Choice.split(' ')[2]);
    const [rows,fields] = await db.query(`SELECT first_name, last_name FROM employees;`);
    
    let names = [];
    rows.forEach( data => {
      names.push(data.first_name + " " + data.last_name);
    });
    let roles = [];
    const [rows1,fields1] = await db.query(`SELECT * FROM roles;`)
    rows1.forEach(data => {
      const temp = {
        name:data.title,
        value: data.id
      }
      roles.push(temp);
    })
    console.log(roles);
    await inquirer.prompt(
      [
        {
          type: "list",
          name: "employees",
          message: "Choose the employee you'd like to update",
          choices: names,
        },
        {
          type: "list",
          name: "roles",
          message: "Which role would you like to assign this employee to?",
          choices: roles,
        },
      ]
    )
    .then(async function(response) {
      console.log(response);
      const sql = `UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?`
      const [rows,fields] = await db.query(sql,[response.roles,response.employees.split(' ')[0],response.employees.split(' ')[1]])
    });
    mainMenu();

    
}