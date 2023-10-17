const express = require('express');
const seriesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

const issuesRouter = require('./issues');

seriesRouter.param('seriesId', (req, res, next, id) => {
    const seriesId = Number(id);
    db.get(
        'SELECT * FROM Series WHERE id=$id',
        { $id: seriesId },
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                req.series = row;
                next();
            } else {
                res.status(404).send("Series not found");
            }
        }
    );
});

// Mount the Issue Express router
seriesRouter.use('/:seriesId/issues', issuesRouter);

seriesRouter.get('/', (req, res, next) => {
    db.all(
        'SELECT * FROM Series',
        (error, rows) => {
            if (error) {
                next(error);
            } else {
                res.status(200).json({ series: rows });
            }
        }
    );
});

seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).json({ series: req.series });
});

seriesRouter.post('/', (req, res, next) => {
    const series = req.body.series;
    if (series.name && series.description) {
        db.run(
            'INSERT INTO Series (name, description) VALUES ($name, $description)',
            {
                $name: series.name,
                $description: series.description
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Series WHERE id=${this.lastID}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(201).send({ series: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Series missing one or more required fields: name, description");
    }
});

seriesRouter.put('/:seriesId', (req, res, next) => {
    const series = req.body.series;
    if (series.name && series.description) {
        db.run(
            'UPDATE series SET name=$name, description=$description WHERE id=$seriesId',
            {
                $seriesId: req.params.seriesId,
                $name: series.name,
                $description: series.description
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Series WHERE id=${req.params.seriesId}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(200).send({ series: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Series missing one or more required fields: name, date_of_birth, biography");
    }
});

// NOTE: The function below is modded from Codecademy solution code
seriesRouter.delete('/:seriesId', (req, res, next) => {
    db.get(
        'SELECT * FROM Issue WHERE series_id=$seriesId',
        { $seriesId: req.params.seriesId },
        (error, row) => {
            if (error) {
                next(error);
            } else if (row) {
                res.status(400).send("Series has existing related issue(s)");
            } else {
                db.run(
                    'DELETE FROM Series WHERE id=$seriesId',
                    { $seriesId: req.params.seriesId },
                    (error) => {
                        if (error) {
                            next(error);
                        } else {
                            res.status(204).send('Series has been deleted');
                        }
                    });
            }
        });
});

module.exports = seriesRouter;