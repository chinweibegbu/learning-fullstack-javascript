# Express.js

## Introduction
**Express.js** is a powerful but flexible Javascript framework for creating web servers and APIs.

## Express Routes
### Starting a Server
You need the Node `express` code module to use Express.js. In the image below, `app` is an instance of an Express application:
<img src="../../course-images/Starting%20a%20Server%20with%20Express%20(Setup).png">

**PURPOSE**: Listen to requests, perform requested actions and return a response
**HOW**: Listen for new requests on a specified port
<img src="../../course-images/Starting%20a%20Server%20with%20Express.png">

### Express + Routes
**Routes** define the control flow for requests based on the request’s path and [HTTP verb](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
* Routes are checked in the order in which they are registered in the code
    **NOTE**: The first route that matches the `api-endpoint` in `<server address>:<port number>/api-endpoint` is used and then the callback ends
* Routes can have parameters
  * These are defined by adding `:param-name` to the end of the API endpoint e.g. `/monsters/:id`
  * These are accessible using `req.params`

#### Route Definition Functions
Each router definition function takes the path and a callback function (discussed in the sub-section below) which deals with the request and response
* `app.get()`: Defines an HTTP `GET` route
* `app.put()`: Defines an HTTP `PUT` route
* `app.post()`: Defines an HTTP `POST` route
* `app.delete()`: Defines an HTTP `DELETE` route

#### Route Callback Function
* Usually, the callback function passed to the reouter definition function will take in at least two parameters:
  * `req`: the server request
  * `res`: the server response/responder
* You can use one of the following to send a reponse to the user:
  * `res.send()`<br>
    **NOTE**: By defualt, this function sends a 200 OK status code
  * `res.json()`
  * `res.status()` <br>
    **NOTE**: This can be chained with a `send()` function call e.g.
    > res.status(404).send('Item not found');
* You can access query parameters through `req.params`
* You can access query strings through `req.query`

#### Route Query Strings
You can pass data to your server in a number of ways including using **query strings**. These appear at the end of the path in URLs, and they are indicated with a `?` character. An example of a URL with a query string is: `/monsters/1?name=chimera&age=1`.

The query string is accessed using `req.query`, which returns an object containing the content of the string e.g.
 `{ name: 'chimera', age: '4' }`

## Express Middleware
### Middleware
### Router Parameters
