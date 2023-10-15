# Unit Notes

## SQL Basics
See SQL code for this section at `./sample-sql-code/basics.sql`

**SQL**: Structured Query Language <br>

* Terms:
  * **Relational database**: A database that organizes information into one or more tables
  *  **Table**: A collection of data organized into rows and columns a.k.a. *relations*
  *  **Column**: A set of data values of a particular type
  *  **Row**: A single record in a table
* SQL data types:
  * e.g. `INTEGER`, `REAL`, `TEXT`, `CHAR`, `VARCHAR`, `DATE`, etc.
  * Read more about SQL data types on [w3schools](https://www.w3schools.com/sql/sql_datatypes.asp)
* SQL constraints:
  * e.g. `PRIMARY KEY`, `UNIQUE`, `NOT NULL`, `DEFAULT`, etc.
  * Read more about SQL constraints on [w3schools](https://www.w3schools.com/sql/sql_constraints.asp)

## SQL Queries
See SQL code for this section at `./sample-sql-code/queries.sql`

**NOTE**:
* Operators used with `WHERE` include:
  * Comparison operators e.g. `=`, `!=`, `>`, `<`, `>=`, `<=`
  * `LIKE` operator
  * `AND` operator
  * `OR` operator
  * `BETWEEN` operator
* `ORDER BY`: Takes a column name to order the results by
  * `ORDER BY` always goes after `WHERE`
  * The column that you use with `ORDER BY` doesn't have to be one of the columns that you're displaying
* `LIMIT`: Allows you to specify the maximum number of rows the result set will have
* `CASE`: Allows you to create different outputs (usually in the SELECT statement), similar to `if-else` statements

### SQL `LIKE` operator:
* The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column
* This operator is used in conjuction with wildcard characters a.k.a. *wildcards*

|Wildcards |Usage                             
|:--------:|---------------------------------------------------------
|`_`       | Match a single character    
|`%`       | Match zero or more characters    
|`[]`      | Match any single character within the brackets*    
|`^`       | Match any character not in the brackets*
|`-`       | Match any single character within the specified range*    

\* - Not supported by PostgreSQL and MySQL databases

Read more about SQL wildcards on [w3schools](https://www.w3schools.com/sql/sql_wildcards.asp)

## SQL Calculations
See SQL code for this section at `./sample-sql-code/calculations.sql`

**Aggregrates**: Calculations performed on multiple rows of a table

Common aggregate functions include:
1. `COUNT()`
2. `AVG()`
3. `MIN()`
4. `MAX()`
5. `ROUND()`

* `GROUP BY`:
  * One can use the `GROUP BY` operator in combinaion with the aggregate functions to have them calculated by group
  * SQL lets you use column reference with `GROUP BY`
* `HAVING`:
  * Used to filter groups created by `GROUP BY`
  * You can't use `WHERE` in this case because it filters the rows, NOT the groups

## Working with Multiple SQL Tables
See SQL code for this section at `./sample-sql-code/multiple-tables.sql`

### Joining Tables
<img src="../course-images/SQL%20Joins.png">

### Primary and Foreign Keys
`PRIMARY KEY`:
* Primary key requirements are:
  1. None of the values can be `NULL`
  2. Each value must be unique
  3. A table can not have more than one `PRIMARY KEY` column

`FOREIN KEY`:
* When the primary key for one table appears in a different table
* The most common types of joins will be joining a foreign key from one table with the primary key from another table. 

### `WITH` Operator
<img src="../course-images/SQL%20-%20WITH%20Operator.png">

* The `WITH` statement allows us to perform a separate query (such as aggregating customer’s subscriptions)
* `previous_results` is the alias that we will use to reference any columns from the query inside of the `WITH` clause
* We can then go on to do whatever we want with this temporary table (such as join the temporary table with another table)

## Setting up SQLite
### Introduction to SQLite
* SQLite is a database engine
* In SQLite, a database is stored in a single file
* Drawbacks of SQLite:
  1. SQLite’s signature portability makes it a poor choice when many different users are updating the table at the same time (to maintain integrity of data, only one user can write to the file at a time)
  2. SQLite may require some more work to ensure the security of private data due to the same features that make SQLite accessible
  3. SQLite does not offer the same exact functionality as many other database systems, limiting some advanced features other relational database systems offer
  4. SQLite does not validate data types
* Uses of SQLite:
  1. SQLite is used worldwide for testing
  2. SQLite is used worldwide for development
  3. SQLite is used worlwide in any scenario where it makes sense for the database to be on the same disk as the application code
  4. SQLite’s maintainers consider it to be among the most replicated pieces of software in the world

### SQLite Installation
1. Download the `sqlite-tools-win32-x86-3200100.zip` file from the [SQLite Download page](https://www.sqlite.org/download.html)
2. Unzip the downloaded folder
3. From your git-bash terminal, open the directory of the unzipped folder with `cd ~/Downloads/sqlite-tools-win32-x86-3200100/sqlite-tools-win32-x86-3200100/`
4. Try running sqlite with the command `winpty ./sqlite3.exe` <br>
   **NOTE**: You have succeeded in installing SQLite if that command opens a `sqlite>` prompt
5. Create an alias to the command
   * Exit the `sqlite>` prompt by typing in `CTRL`+C
   * In the same git-bash terminal without changing folders, run the following commands:
        > `echo "alias sqlite3=\"winpty ${PWD}/sqlite3.exe\"" >> ~/.bashrc` *
        > `source ~/.bashrc` **
6. Try typing in the command `sqlite3 newdb.sqlite` <br>
   **NOTE**: You have succeeded in implementing an `sqlite3` command if that command opens a `sqlite>` prompt
7. Enter `CTRL`+C to quit. You can also exit by typing .exit in the prompt and pressing Enter.

\* - The first command will create the alias sqlite3 that you can use to open a database <br>
\** - The second command will refresh your terminal so that you can start using this command

Video Tutorial: [Setting Up SQLite Locally (Windows)](https://youtu.be/dcfh5iQ_-3s)

### Setting Up DB Browser
* **DB Browser** is a visual tool used to organize commands sent to SQLite
* With databases, it’s easy to lose track of commands that have been run
* DB Browser functionalities:
  * Allows you see exactly the sequence of commands you are executing before you run them
  * Allows you to see the column structure for the tables within the database you’re working with <br>
  **NOTE**: Thus, inserting data or other manipulation of data is more manageable and doesn’t require performing queries every time you need to remember the structure of your data

Video Tutorial: [Setting Up DB Browser](https://youtu.be/1Vaqh24HLKU)

#### Creating a Table with DB Browser
1. Creating a new database with DB Browser will open a `File` dialog box, where you can set where the SQLite database will live in your file structure
2. After creating the database, you will be presented with an interface for creating a table
3. Add a name for the table at the top
4. Add and remove fields in the `Fields` window
    * Each field has:
      * a free-text name
      * a dropdown for its type
      * four checkboxes for
        1. `not-null` attribute
        2. `primary key` attribute
        3. `autoincrement` attribute
        4. `unique` attribute
      * and other parameters
5. You will see the SQL query that DB Browser executes to create this table update as you add information to this table
6. Update these and press "OK"
7. You will see the `Database Structure` tab of DB Browser refresh with the updated information
8. Press the "Write Changes" button and create your table <br>
    **NOTE**: No changes have been made to any database file yet, and queries are only executed by DB Browser when the "Write Changes" button is pressed

#### Adding Data to a Table with DB Browser
1. Switch from the `Database Structure` tab to the Browse Data tab
2. Click "New Record" button
3. Update the columns in the viewport
4. Press "Write Changes" button to add the data into the SQLite DB
