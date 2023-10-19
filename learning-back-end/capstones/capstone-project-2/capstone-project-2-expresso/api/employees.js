const express = require('express');
const employeesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const timesheetsRouter = require('./timesheets');
employeesRouter.use('/timesheets', timesheetsRouter);

employeesRouter.param('id', (req, res, next, id) => {
    const employeeId = Number(req.params.id);
    db.get(
        'SELECT * FROM Employee WHERE id=$id',
        { $id: employeeId },
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                req.employeeId = employeeId;
                next();
            } else {
                res.status(404).send('Employee not found');
            }
        }
    );
});

employeesRouter.get('/', (req, res, next) => {
    db.all(
        'SELECT * FROM Employee WHERE is_current_employee=1',
        (error, rows) => {
            if (error) {
                next(error);
            }
            res.status(200).json({ employees: rows });
        }
    );
});

employeesRouter.get('/:id', (req, res, next) => {
    db.get(
        'SELECT * FROM Employee WHERE id=$id',
        { $id: req.employeeId },
        (error, row) => {
            if (error) {
                next(error);
            }
            res.status(200).json({ employee: row });
        }
    );
});

employeesRouter.post('/', (req, res, next) => {
    const employee = req.body.employee;
    if (employee.name && employee.position && employee.wage) {
        const isCurrentEmployee = employee.isCurrentEmployee ? employee.isCurrentEmployee : 1;
        db.run(
            'INSERT INTO Employee (name, position, wage, is_current_employee) VALUES ($name, $position, $wage, $isCurrentEmployee)',
            {
                $name: employee.name,
                $position: employee.position,
                $wage: employee.wage,
                $isCurrentEmployee: isCurrentEmployee
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Employee WHERE id=${this.lastID}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(201).send({ employee: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Employee missing one or more required fields: name, position, wage");
    }
});

employeesRouter.put('/:id', (req, res, next) => {
    const employee = req.body.employee;
    const employeeId = req.employeeId;

    if (employee.name && employee.position && employee.wage) {
        const isCurrentEmployee = employee.isCurrentEmployee ? employee.isCurrentEmployee : 1;
        db.run(
            'UPDATE Employee SET name=$name, position=$position, wage=$wage, is_current_employee=$isCurrentEmployee WHERE id=$employeeId',
            {
                $name: employee.name,
                $position: employee.position,
                $wage: employee.wage,
                $isCurrentEmployee: isCurrentEmployee,
                $employeeId: employeeId
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Employee WHERE id=${employeeId}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(200).send({ employee: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Employee missing one or more required fields: name, position, wage");
    }
});

employeesRouter.delete('/:id', (req, res, next) => {
    const employeeId = req.employeeId;

    // Get employee to delete
    db.get(
        `SELECT * FROM Employee WHERE id=${employeeId}`,
        (error, row) => {
            if (error) {
                next(error);
            }
            const employeeToDelete = row;
            employeeToDelete.is_current_employee = 0;

            // Delete employee
            db.run(
                `UPDATE Employee SET is_current_employee=0 WHERE id=${employeeId}`,
                function (error) {
                    if (error) {
                        next(error);
                    } else {
                        // Return deleted employee with a 200 OK status code
                        res.status(200).json({ employee: employeeToDelete });
                    }
                }
            );
        });
});

module.exports = employeesRouter;