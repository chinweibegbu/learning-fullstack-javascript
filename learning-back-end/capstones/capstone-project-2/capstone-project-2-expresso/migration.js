const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(() => {
    // Drop and recreate Employee table
    db.run(`DROP TABLE IF EXISTS Employee`);
    db.run(
        `CREATE TABLE Employee (
            id INTEGER NOT NULL,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            wage INTEGER NOT NULL,
            is_current_employee INTEGER DEFAULT 1,
            PRIMARY KEY(id)
        )`
    );

    // Drop and recreate Timesheet table
    db.run(`DROP TABLE IF EXISTS Timesheet`);
    db.run(
        `CREATE TABLE Timesheet (
            id INTEGER NOT NULL,
            hours INTEGER NOT NULL,
            rate INTEGER NOT NULL,
            date INTEGER NOT NULL,
            employee_id INTEGER NOT NULL,
            PRIMARY KEY(id),
            FOREIGN KEY (employee_id) REFERENCES Employee(id)
        )`
    );

    // Drop and recreate Menu table
    db.run(`DROP TABLE IF EXISTS Menu`);
    db.run(
        `CREATE TABLE Menu (
            id INTEGER NOT NULL,
            title TEXT NOT NULL,
            PRIMARY KEY(id)
        )`
    );

    // Drop and recreate MenuItem table
    db.run(`DROP TABLE IF EXISTS MenuItem`);
    db.run(
        `CREATE TABLE MenuItem (
            id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            inventory INTEGER NOT NULL,
            price INTEGER NOT NULL,
            menu_id INTEGER NOT NULL,
            PRIMARY KEY(id),
            FOREIGN KEY (menu_id) REFERENCES Menu(id)
        )`
    );
});
