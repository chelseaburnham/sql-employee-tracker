INSERT INTO department (name)
VALUES ("Operations"), 
    ("Sales and Marketing"), 
    ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 60000, 1), 
    ("Salesman", 50000, 2), 
    ("Accountant", 45000, 3), 
    ("HR", 55000, 1),
    ("Receptionist", 30000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null), 
    ("Dwight", "Schrute", 2, 1), 
    ("Jim", "Halpert", 2, 1), 
    ("Oscar", "Martinez", 3, 1), 
    ("Toby", "Flenderson", 4, 1), 
    ("Pam", "Beesly", 5, 1);