const express = require('express');
const artistRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

artistRouter.param('artistId', (req, res, next, id) => {
    const artistId = Number(id);
    db.get(
        'SELECT * FROM Artist WHERE id=$id',
        { $id: artistId },
        (error, row) => {
            if (error) {
                next(error);
            }
            if (row) {
                req.artist = row;
                next();
            } else {
                res.status(404).send("Artist not found");
            }
        }
    );
});

artistRouter.get('/', (req, res, next) => {
    db.all(
        'SELECT * FROM Artist WHERE is_currently_employed=1',
        (error, rows) => {
            if (error) {
                next(error);
            } else {
                res.status(200).json({ artists: rows });
            }
        }
    );
});

artistRouter.get('/:artistId', (req, res, next) => {
    res.status(200).json({ artist: req.artist });
});

artistRouter.post('/', (req, res, next) => {
    const artist = req.body.artist;
    if (artist.name && artist.dateOfBirth && artist.biography) {
        const isCurrentlyEmployed = artist.isCurrentlyEmployed === 0 ? 0 : 1;
        db.run(
            'INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)',
            {
                $name: artist.name,
                $dateOfBirth: artist.dateOfBirth,
                $biography: artist.biography,
                $isCurrentlyEmployed: isCurrentlyEmployed
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Artist WHERE id=${this.lastID}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(201).send({ artist: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Artist missing one or more required fields: name, date_of_birth, biography");
    }
});

artistRouter.put('/:artistId', (req, res, next) => {
    const artist = req.body.artist;
    if (artist.name && artist.dateOfBirth && artist.biography) {
        const isCurrentlyEmployed = artist.isCurrentlyEmployed === 0 ? 0 : 1;
        db.run(
            'UPDATE Artist SET name=$name, date_of_birth=$dateOfBirth, biography=$biography, is_currently_employed=$isCurrentlyEmployed WHERE id=$artistId',
            {
                $artistId: req.params.artistId,
                $name: artist.name,
                $dateOfBirth: artist.dateOfBirth,
                $biography: artist.biography,
                $isCurrentlyEmployed: isCurrentlyEmployed
            },
            function (error) {
                if (error) {
                    next(error);
                } else {
                    db.get(
                        `SELECT * FROM Artist WHERE id=${req.params.artistId}`,
                        (error, row) => {
                            if (error) {
                                next(error);
                            }
                            res.status(200).send({ artist: row });
                        }
                    );
                }
            }
        );
    } else {
        res.status(400).send("Artist missing one or more required fields: name, date_of_birth, biography");
    }
});

artistRouter.delete('/:artistId', (req, res, next) => {
    db.run(
        `UPDATE Artist SET is_currently_employed=0 WHERE id=${req.params.artistId}`,
        function (error) {
            if (error) {
                next(error);
            } else {
                db.get(
                    `SELECT * FROM Artist WHERE id=${req.params.artistId}`,
                    (error, row) => {
                        if (error) {
                            next(error);
                        }
                        res.status(200).send({ artist: row });
                    }
                );
            }
        });
}
);

module.exports = artistRouter;