-- Creates department table with id and name
CREATE TABLE departments (
 id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
 name VARCHAR(30)
);

-- Creates role table with department_id linking it to the department table
CREATE TABLE roles (
 id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
 title VARCHAR(30), 
 salary decimal(10,2),
 department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments (id)
);

-- Creates employe table with manager_id linking it to itself and role_id linking it to the role table
CREATE TABLE employees (
 id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
 first_name VARCHAR(30),
 last_name VARCHAR(30),
 role_id INT,
 FOREIGN KEY (role_id)
 REFERENCES roles (id),
 manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employees (id)

);