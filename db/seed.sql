/* ------------------------------- DEPARTMENT ------------------------------- */
INSERT INTO departments (id, name)
VALUES 
(1, "management"),
(2, "service"),
(3, "sales");

/* ---------------------------------- ROLE ---------------------------------- */
INSERT INTO roles (title, salary, department_id)
VALUES
("manager", 62960, 1),
("customer_service_associate", 48840, 2), 
("sales_associate", 39963, 3);

/* --------------------------------- MANAGER -------------------------------- */
INSERT INTO employees (first_name, last_name, role_id)
VALUES
("Celine", "Homer", 1),
("Josh", "Birch", 1);

/* -------------------------------- EMPLOYEE -------------------------------- */
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Stacy", "Chavez", 3, 1) ,
("Isabella", "Guetta", 2, 2) ,
("Leslie", "Dwight", 3, 2), 
("Will", "Mcniery", 3, 1); 