const sqlite3 = require('sqlite3');

// Create a Node SQLite DB in a file called "db.sqlite"
const db = new sqlite3.Database('./db.sqlite');

db.serialize(() => {
    // Drop the Strip table if it exists
    db.run('DROP TABLE IF EXISTS Strip');

    // Create a Strip table
    db.run(
        `CREATE TABLE Strip (
            id INTEGER PRIMARY KEY,
            head TEXT NOT NULL,
            body TEXT NOT NULL,
            background TEXT NOT NULL,
            bubble_type TEXT NOT NULL,
            bubble_text TEXT NOT NULL DEFAULT '',
            caption TEXT NOT NULL DEFAULT ''
        )`,
        function (error) {
            if (error) {
                console.log(error);
            }
        }
    );
});
