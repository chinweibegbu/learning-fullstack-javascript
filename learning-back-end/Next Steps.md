# Course Next Steps

## Deployment
Common deployment services include:
1. [Now](https://zeit.co/now)
   **NOTE**: This is used particularly for Node apps
2. [Heroku](https://www.heroku.com/)

## SQLite and Databases
* SQLite is not always supported for cloud deployment
* You can use [node-sqlite](https://github.com/kriasoft/node-sqlite), which is a wrapper around the `sqlite3` used during this course
* Some JS Object-Relational Mapping Tools (ORMs) that support SQLite include:
  * [Bookshelf.js](http://bookshelfjs.org/)
  * [Sequelize.js](http://docs.sequelizejs.com/)

## Authentication
[Passport](http://passportjs.org/) is a widely-used middleware package for authentication in Node/Express servers.