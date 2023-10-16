const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = app;

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './db.sqlite');

app.get('/strips', (req, res, next) => {
    db.all('SELECT * FROM Strip', (error, rows) => {
        res.send({ strips: rows });
    });
});

app.post('/strips', (req, res, next) => {
    const body = req.body.strip;

    // Only INSERT into the DB if head, body, background and bubbleType are provided
    if (body.head && body.body && body.background && body.bubbleType) {
        // INSERT new Strip into table
        db.run(
            'INSERT INTO Strip (head, body, background, bubble_type, bubble_text, caption) VALUES ($head, $body, $background, $bubbleType, $bubbleText, $caption)',
            {
                $head: body.head,
                $body: body.body,
                $background: body.background,
                $bubbleType: body.bubbleType,
                $bubbleText: body.bubbleText,
                $caption: body.caption
            },
            function (error) {
                if (error) {
                    res.status(500).send('ERROR: Database INSERT failure');
                    return;
                }

                // SELECT inserted Strip
                db.get(
                    'SELECT * FROM Strip WHERE id=$id',
                    {
                        $id: this.lastID
                    },
                    (error, row) => {
                        const response = { strip: row };
                        res.status(201).send(response);
                    }
                );
            }
        );
    } else {
        res.status(400).send('ERROR: Missing required values');
    }
});

app.listen(PORT, console.log(`Server running on ${PORT}`));