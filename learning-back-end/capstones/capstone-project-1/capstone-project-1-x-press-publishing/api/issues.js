const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

issuesRouter.param('issueId', (req, res, next, id) => {
    db.get(
        'SELECT * FROM issue WHERE id=$id',
        { $id: Number(id) },
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                next();
            } else {
                res.status(404).send("Issue not found");
            }
        }
    );
});

issuesRouter.get('/', (req, res, next) => {
    db.all(
        'SELECT * FROM Issue WHERE series_id=$seriesId',
        { $seriesId: req.params.seriesId },
        (error, rows) => {
            if (error) {
                next(error);
            } else {
                res.status(200).json({ issues: rows });
            }
        }
    );
});

issuesRouter.post('/', (req, res, next) => {
    const issue = req.body.issue;
    if (issue.name && issue.issueNumber && issue.publicationDate && issue.artistId) {
        db.get(
            'SELECT * FROM Artist WHERE id = $artistId',
            { $artistId: issue.$artistId },
            (error, row) => {
                if (error) {
                    next(error);
                } else {
                    db.run(
                        'INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id) VALUES ($name, $issueNumber, $publicationDate, $artistId, $seriesId)',
                        {
                            $name: issue.name,
                            $issueNumber: issue.issueNumber,
                            $publicationDate: issue.publicationDate,
                            $artistId: issue.artistId,
                            $seriesId: req.params.seriesId
                        },
                        function (error) {
                            if (error) {
                                next(error);
                            } else {
                                db.get(
                                    `SELECT * FROM Issue WHERE id=${this.lastID}`,
                                    (error, row) => {
                                        if (error) {
                                            next(error);
                                        }
                                        res.status(201).send({ issue: row });
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );

    } else {
        res.status(400).send("Issue missing one or more required fields: name, issueNumber, publicationDate, artistId, seriesId");
    }
});

issuesRouter.put('/:issueId', (req, res, next) => {
    const issue = req.body.issue;
    if (issue.name && issue.issueNumber && issue.publicationDate && issue.artistId) {
        db.get(
            'SELECT * FROM Artist WHERE id = $artistId',
            { $artistId: issue.$artistId },
            (error, row) => {
                if (error) {
                    next(error);
                } else {
                    db.run(
                        'UPDATE Issue SET name=$name, issue_number=$issueNumber, publication_date=$publicationDate, artist_id=$artistId WHERE id=$issueId',
                        {
                            $name: issue.name,
                            $issueNumber: issue.issueNumber,
                            $publicationDate: issue.publicationDate,
                            $artistId: issue.artistId,
                            $issueId: req.params.issueId
                        },
                        function (error) {
                            if (error) {
                                next(error);
                            } else {
                                db.get(
                                    `SELECT * FROM Issue WHERE id=${req.params.issueId}`,
                                    (error, row) => {
                                        if (error) {
                                            next(error);
                                        }
                                        res.status(200).send({ issue: row });
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );

    } else {
        res.status(400).send("Issue missing one or more required fields: name, issueNumber, publicationDate, artistId, seriesId");
    }
});

issuesRouter.delete('/:issueId', (req, res, next) => {
    db.run(
        'DELETE FROM Issue WHERE id = $issueId',
        { $issueId: req.params.issueId }, 
        function (error) {
        if (error) {
            next(error);
        } else {
            res.status(204).send('Issue has been deleted');
        }
    });
});

module.exports = issuesRouter;