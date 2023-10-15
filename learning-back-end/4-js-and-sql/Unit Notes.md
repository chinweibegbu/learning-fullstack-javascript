# Unit Notes

## Node SQLite
### Setup Steps
1. Import the `sqlite3` core module using the `require()` function
   > `const sqlite = require('sqlite3);`
2. Open the SQLite DB file
   > `const db = new sqlite.Database(./db.sqlite);`
3. Use a query method such as `db.all()` to interact with the DB

### Query Methods
* These methods take two arguments:
  1. A query string
  2. Callback function
      **NOTE:** The parameters of the callback function depends on the method being called
* Query methods include:
  * `db.all()`
    <img src="../course-images/SQLite%20all()%20Function.png">
    * Gets all rows that match the 
    * Callback function takes two arguments: `error` and `rows`
  * `db.get()`
    <img src="../course-images/SQLite%20get()%20Function.png">
    * Gets only a single row that matches the query string passed
    * Callback function takes two arguments: `error` and `row`
    * It is important to note that even if multiple rows match the query, this method will only return a single result
  * `db.run()`
    <img src="../course-images/SQLite%20run()%20Function.png">
    * Runs a command that does not return any rows
    * Callback function takes one arguments: `error`
    * This function does not return a value, but, depending on the SQL command, it may attach properties to the `this` keyword within the scope of the callback
      * In some cases, like creating a table, `db.run()` will not modify `this`
      * In other cases, like when `INSERT`-ing a row, a callback to `db.run()` will be able to access `this.lastID`, the ID of the last `INSERT`-ed row <br>
      **NOTE**: To ensure there is no `this`-based conflict, ensure that the callback function is NOT an arrow function
  * `db.each()`
    <img src="../course-images/SQLite%20each()%20Function.png">
    * Allows you to process every row returned from a database query
    * Callback function takes two arguments: `error` and `row`
    * This function takes an optional second callback function which is run after all the returned rows are processed by the first callback function
* These methods can have placeholders - a **placeholder** is a part of our SQL query that we want to be interpolated with a variable’s contents (see the code example for `db.get()` above)
  <img src="../course-images/SQLite%20Placeholders.png">
* By default, the DB queries are run in parallel. Solutions include:
  1. Using nested callbacks
    <img src="../course-images/SQLite%20Nested%20Callbacks.png">
  2. Using the `.serialize()` function
    <img src="../course-images/SQLite%20serialize()%20Function.png">
  3. 

See more on the [Node SQLite3 Codecademy Cheatsheet](https://www.codecademy.com/learn/learn-node-sqlite/modules/learn-node-sqlite-module/cheatsheet)

See more on the [Official Node SQLite3 Documentation](https://github.com/TryGhost/node-sqlite3/wiki/API)

### Error Handling
* `error` is the first parameter of the query callback functions
* If there is no error, `error` will be `null`