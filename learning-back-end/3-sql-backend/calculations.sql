-- Counting the number of apps that are free
SELECT COUNT(*)
FROM apps
WHERE price = 0;

-- Summing the total number of app downloads
SELECT SUM(downloads)
FROM apps;

-- Get the app that has been downloaded the least number of times
SELECT MIN(downloads)
FROM apps;

-- Get the app that has the highest price
SELECT MAX(price)
FROM fake_apps;

-- Get the average price of all the apps
SELECT AVG(price)
FROM apps;

-- Get the average price of all the apps rounded to 2 decimal points
SELECT ROUND(AVG(price), 2)
FROM apps;

-- Get the category and total number of downloads of apps per category
SELECT category, 
  SUM(downloads)
FROM apps
GROUP BY category
ORDER BY category ASC;

-- Get the category, price and average number of downloads of apps per category and price
SELECT category,
  price,
  AVG(downloads)
FROM apps
GROUP BY 1, 2;

-- Get the price, rounded average number of downloads of apps and number of results per price where the group count is greater than 10
SELECT price, 
   ROUND(AVG(downloads)),
   COUNT(*)
FROM fake_apps
GROUP BY price
HAVING COUNT(*) > 10;