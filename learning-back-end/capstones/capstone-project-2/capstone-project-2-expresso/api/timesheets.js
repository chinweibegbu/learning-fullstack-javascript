const express = require('express');
const timesheetsRouter = express.Router({ mergeParams: true });

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

timesheetsRouter.param('timesheetId', (req, res, next, id) => {
    const timesheetId = Number(id);
    db.get(
        'SELECT * FROM Timesheet WHERE id=$id',
        { $id: timesheetId },
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                req.timesheetId = timesheetId;
                next();
            } else {
                res.status(404).send("Timesheet not found");
            }
        }
    );
});

timesheetsRouter.get('/', (req, res, next) => {
    db.all(
        'SELECT * FROM Timesheet WHERE employee_id=$employeeId',
        { $employeeId: req.params.employeeId },
        (error, rows) => {
            if (error) {
                next(error);
            } else {
                res.status(200).json({ timesheets: rows });
            }
        }
    );
});

timesheetsRouter.post('/', (req, res, next) => {
    const timesheet = req.body.timesheet;
    const employeeId = req.params.employeeId;

    if (timesheet.hours && timesheet.rate && timesheet.date) {
        db.run(
            'INSERT INTO Timesheet (hours, rate, date, employee_id) VALUES ($hours, $rate, $date, $employeeId)',
            {
                $hours: timesheet.hours,
                $rate: timesheet.rate,
                $date: timesheet.date,
                $employeeId: employeeId
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Timesheet WHERE id=${this.lastID}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(201).send({ timesheet: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Timesheet missing one or more required fields: hours, rate, date");
    }
});

timesheetsRouter.put('/:timesheetId', (req, res, next) => {
    const timesheet = req.body.timesheet;
    const timesheetId = req.timesheetId;

    if (timesheet.hours && timesheet.rate && timesheet.date) {
        db.run(
            'UPDATE Timesheet SET hours=$hours, rate=$rate, date=$date WHERE id=$timesheetId',
            {
                $hours: timesheet.hours,
                $rate: timesheet.rate,
                $date: timesheet.date,
                $timesheetId: timesheetId
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Timesheet WHERE id=${timesheetId}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(200).send({ timesheet: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Timesheet missing one or more required fields: hours, rate, date");
    }
});

timesheetsRouter.delete('/:timesheetId', (req, res, next) => {
    const timesheetId = req.timesheetId;
    db.run(
        `DELETE FROM Timesheet WHERE id=${timesheetId}`,
        function (error) {
            if (error) {
                next(error);
            }
            res.status(204).send('Timesheet successfully deleted');
        }
    );
});

module.exports = timesheetsRouter;
