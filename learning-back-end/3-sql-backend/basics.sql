-- Create table with three fields
CREATE TABLE celebs (
  id INTERGER,
  name TEXT,
  age INTEGER
);

-- Add two row to the table
INSERT INTO celebs (id, name, age)
VALUES (1, 'Beyonce Knowles', 42);

INSERT INTO celebs (id, name, age)
VALUES (2, 'Hozier', 33);

-- Get a result set with only the 'name' column
SELECT name FROM celebs; 

-- Get a result set with all columns
SELECT * FROM celebs; 

-- Add a TEXT column to the table
ALTER TABLE celebs
ADD COLUMN twitter_handle TEXT;

-- Get a result set with all columns (now including a new column)
SELECT * FROM celebs;

-- Update the value of a specified row in the table
UPDATE celebs
SET twitter_handle = '@Hozier'
WHERE id = 2;

-- Get a result set with all columns to view updated row
SELECT * FROM celebs;

-- Delete rows with NULL in a specific column
DELETE FROM celebs
WHERE twitter_handle IS NULL;

-- Get a result set with all columns without deleted row
SELECT * FROM celebs;
