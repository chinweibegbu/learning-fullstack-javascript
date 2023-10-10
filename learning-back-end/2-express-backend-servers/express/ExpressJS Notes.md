# Express.js

## Introduction
**Express.js** is a powerful but flexible Javascript framework for creating web servers and APIs.

## Express Routes
### Starting a Server
You need the Node `express` code module to use Express.js. In the image below, `app` is an instance of an Express application:
<img src="../../course-images/Starting%20a%20Server%20with%20Express%20(Setup).png">

**PURPOSE**: Listen to requests, perform requested actions and return a response <br>
**HOW**: Listen for new requests on a specified port
<img src="../../course-images/Starting%20a%20Server%20with%20Express.png">

### Express Routes
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

### Express Routers
An Express router provides a subset of Express methods.

Setup steps:
1. Invoke the `Router()` Express method
2. Mount the router using the `app.use()` function <br>
   **NOTE**: Takes **(1)** the base path of the router and **(2)** the Express router as parameters, respectively
3. Use the Express HTTP functions e.g. `get()` with the router rather than the application directly
   **NOTE**: The path passed to the HTTP function is assumed to be prepended with the pre-defined base path

<img src="../../course-images/Node%20Router%20Usage.png">


## Express Middleware

DRY: Don't Repeat Yourself → This can be achieved with:
1. Functions: Replace direct code with calls to functions <br>
   **ISSUE**: You are still calling the same code in multiple places, just in a cleaner manner.
2. Middleware: Use the `app.use()` function to trigger an action anytime a request is received
   > `app.use([path,] callback [, callback...])`
   * The callback function passed to this function is run anytime a request is received
   * By adding a path to the function call arguments, the middleware will only run for requests at a specific path

<br>
<img src="../../course-images/DRY%20Principles.png">

### Middleware
* **Middleware**:
  * Code that executes between a server receiving a request and sending a response
  * Express middleware has three function parameters:
    1. `req`
    2. `res`
    3. `next`: Passes processing to the next middleware in the stack
   
    <img src="../../course-images/Sample%20Middleware%20Function.png">

  * Express routes are middleware
* **Middleware Stack**:
  * Chain of middleware
  * Processed in the order they appear in an application file → middleware defined later happens after middleware defined before
  * You can pass a middleware stack by:
    * Using the `app.use()` function 
      <img src="../../course-images/Sample%20Middleware%20Stack%20Usage%20-%20app.use().png">
    * Passing multiple middleware functions to a route function
      <img src="../../course-images/Sample%20Middleware%20Stack%20Usage.png">
* Open-source middleware modules include the following:
  1. [morgan](https://github.com/expressjs/morgan):
     * For **logging**
     * Calling `morgan()` returns a callback function. 
     * e.g.
       * `app.use(morgan('tiny'));`
       * `app.use(morgan('dev'));`
     * You can checkout the [documentation](https://github.com/expressjs/morgan#api) for this tool to see other logging presets and how to create custom logging presets
  2. [body-parser](https://github.com/expressjs/body-parser#body-parser)
     * For **body parsing**
     * Calling The body-parser module has several methods for body parsing which you can see in its [API documentation](https://github.com/expressjs/body-parser#api)
     * e.g.
       * app.use(bodyParser.json());
  3. Error Handling (in-built)
     * Error handling middleware needs to be the last `app.use()` in your file. <br>
        **NOTE**: The positioning of this function is extremely important because remember that middleware is parsed in the order in which it is defined in the code. 
     * Express has an inbuilt error handler
     * Invoke the error-handling middleware by:
       1. Adding a new parameter `err` to the callback functions
       2. Passing an error object as an argument to `next()`
  
      <img src="../../course-images/Error%20Handling%20Middleware%20-%20Setup.png">
      <img src="../../course-images/Error%20Handling%20Middleware%20-%20Usage.png">

**NOTE**: You can see other Express Middleware Modules in its [documentation](https://expressjs.com/en/resources/middleware.html).

### Router Parameters
When working with routes that require parameters, we might find ourselves in a position where multiple different routes require the same parameter and use it to identify the same piece of data.

**SOLUTION**: `app.param()`

<img src="../../course-images/app.param()%20function.png">

* This function takes in two parameters:
  1. A query parameter name
  2. A callback function which will be used by all router functions matching the specified query parameter.
* The callback function takes three parameters:
  1. `req`
  2. `res`
  3. `next`
  4. Query parameter value holder
* Query parameters can be merged into more complex structures using Express Routers as seen in the image below:
  <img src="../../course-images/Router%20Parameter%20Merging.png">
  * In the code above we define two endpoints:
    1. `/sorcerer`
    2. `/sorcerer/:sorcererId/familiars`
  * The familiars are nested into the `sorcerer` endpoint
    <br>
    **MEANING**: Indicates a relationship that a sorcerer has multiple familiars
  * `{mergeParams: true}` argument: Tells Express that the `familiarRouter` should have access to parameters passed into its parent router, that is, the `sorcererRouter`
  * We then tell Express that the path for the `familiarRouter` is the same as the path for the `sorcererRouter` with the additional path `/:sorcererId/familiars`
  * We then can create a family of routes (a router) built by appending routes to `familiarRouter`‘s base: `/sorcerer/:sorcererId/familiars`




