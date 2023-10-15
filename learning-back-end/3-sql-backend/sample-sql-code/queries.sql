-- Get all columns
SELECT *
FROM movies; 

-- Get only 'name' and 'genre' columns
SELECT name, genre
FROM movies; 

-- Get only 'imdb_rating' column with an alias
SELECT imdb_rating AS 'IMDb'
FROM movies;

-- Get only unique 'genre' column columns
SELECT DISTINCT genre 
FROM movies;

-- Get all columns + fiter with a comparison operator
SELECT * 
FROM movies 
WHERE imdb_rating < 5;

-- Get all columns + filter with the LIKE operator
SELECT * 
FROM movies
WHERE name LIKE 'Se_en';

SELECT * 
FROM movies
WHERE name LIKE '%man%';

-- Get only 'name' column + filter with the NOT NULL operator
SELECT name
FROM movies 
WHERE imdb_rating IS NOT NULL;

-- Get all columns + filter with the BETWEEN operator
SELECT *
FROM movies
WHERE year BETWEEN 1990 AND 1999;

-- Get all columns + filter the AND operator
SELECT * 
FROM movies
WHERE year BETWEEN 1990 AND 1999
   AND genre = 'romance';

-- Get all columns + filter the OR operator
SELECT *
FROM movies
WHERE genre = 'romance'
  OR genre = 'comedy';

-- Get all columns + order by the 'name' column (descending)
SELECT *
FROM movies
ORDER BY name DESC;

-- Get all columns + limit to top 3 results
SELECT *
FROM movies
ORDER BY imdb_rating DESC
LIMIT 3;

-- Get only 'name' colum + with CASE handling
SELECT name,
 CASE
  WHEN imdb_rating > 8 THEN 'Fantastic'
  WHEN imdb_rating > 6 THEN 'Poorly Received'
  ELSE 'Avoid at All Costs'
 END
FROM movies;
