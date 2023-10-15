const { calculateAverages, addClimateRowToObject, logNodeError, printQueryResults } = require('./utils');
const sqlite = require('sqlite3');

const db = new sqlite.Database('./db.sqlite');

const temperaturesByYear = {};

// start by wrapping all the code below in a serialize method
db.serialize(() => {
    // Serial Function #1
    db.run('DROP TABLE IF EXISTS Average', error => {
        if (error) {
            throw error;
        }
    });

    // Serial Function #2
    db.run('CREATE TABLE Average (id INTEGER PRIMARY KEY, year INTEGER NOT NULL, temperature REAL NOT NULL)', logNodeError);

    // Serial Function #3
    db.each('SELECT * FROM TemperatureData',
        (error, row) => {
            // This callback is run for each query result
            if (error) {
                throw error;
            }
            addClimateRowToObject(row, temperaturesByYear);
        },
        error => {
            // This callback is run after the individual result processing
            if (error) {
                throw error;
            }
            const averageTemperatureByYear = calculateAverages(temperaturesByYear);
            averageTemperatureByYear.forEach(row => {
                db.run('INSERT INTO Average (year, temperature) VALUES ($year, $temp)', {
                    $year: row.year,
                    $temp: row.temperature
                }, err => {
                    if (err) {
                        console.log(err);
                    }
                });
            });

            db.all('SELECT * FROM Average', (error, rows) => {
                printQueryResults(rows);
            });
        });
});
