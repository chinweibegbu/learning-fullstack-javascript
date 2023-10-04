# Unit Notes

## Unit Testing
### Testing using Mocha and Chai
* Common frameworks for unit testing in JS are:
  * [Mocha](https://mochajs.org/)
  * [Chai](https://www.chaijs.com/)
* Definitions:
  * *Test Suite*: A collection of tests all relating to a single functionality or behavior
  * *Test Case*: Also known as a _unit test_ - a single description about the desired behavior of the code that either passes or fails
  * *Assertion*: The base component of a test case
    **NOTE**: Chai is an assertion library often used alongside Mocha. Some example code is as follows: 
    > expect(exampleArray).to.have.lengthOf(3);
* Common keywords in Mocha:
  * `describe`: Used to batch together a test suite
  * `it`: Used to batch together a test case
* Test cases are to independent (this is where *stubs* and *mocks* come in)

### Sample Test Suite
```
describe('setPlayerMoves() - Main Functionality', function() {
  afterEach(clearMoves); 
 
  it('a function called setPlayerMoves should exist', function() {
    should.equal(typeof setPlayerMoves, 'function');
  });
 
  it('should set player one\'s moves with valid inputs', function() {
    setPlayerMoves('Player One', 'rock', 11);
 
    should.equal(playerOneMoveOneType, 'rock'); 
    should.equal(playerOneMoveOneValue, 11);
  });
})
```

* The `describe()` function takes two arguments:
  * A string desribing the feature or behaviour being tested
  * A callback function which contains all the code for different tests to be run
* The `afterEach()` function is a *hook* which is called after each block is run and can be used to customise what shoudl happen between each block
* The `it()` function describes a particular behaviour to be tested - it takes the same parameters of the `describe()` function
* In Mocha, keywords that indicate assertion include:
  * `should`
  * `expect`
  * `assert`

### How To Run A Test Suite
The following command is used to run the code in the test script in the `package.json` file of your project:
> npm test

* You must have run the `npm install` command at some point before you run the command above
* You can use the `only()` function to only run certain tests and the `skip()` function to skip other certain tests.
* Below are three potential outputs in the console for a test case:
  1. The code being tested has an error - the assertion has not even been run yet<br>
  <img src="../course-images/Test%20Code%20Has%20Error.png" width=50%>
  2. The test case's assertion fails<br>
  <img src="../course-images/Test%20Assertion%20Error.png" width=50%>
  3. The test case's assertion passes<br>
  <img src="../course-images/Test%20Assertion%20Passed.png" width=50%>
* Remember to consider edge cases. Common edge cases to consider are:
  * Dealing with unexpected input
  * Getting a parameter of an unexpected type
  * Getting no parameter when one or more is expected

## REST Architecture
*REST*: Representational State Transfer

### General Details
* There is a separation of client and server, with an agreement on the format of messages to send to each other
* RESTful systems are stateless
  * This is enforced using *resources*
  * A *resource* is any object, document, or thing that you may need to store or send to other services

### RESTful Requests
A client request to the server generally consists of:
1. A HTTP verb e.g. `GET`, `POST`, `PUT`, `DELETE`
2. A header (information passed along with the request)
   * `Accept` field: Specifies what king of content the client can receive from the server. Specified in the form of *text/subtype* e.g.
     * Text types: `text/html`, `text/css`, `text/plain`
     * Image types: `image/png`, `image/jpeg`, `image/gif`
     * Audio types: `audio/wav`, `audio/mpeg`
     * Video types: `video/mp4`, `video/ogg`
     * Application types: `application/json`, `application/pdf`, `application/xml`, `application/octet-stream`
3. A path to a resource
   *  The first part of a path is typically the plural form of a resource
4. An optional message body containing data

A server response generally consists of:
1. A header (information passed along with the request)
   * Must include a `content-type` field in the header - should be one of the options specified by the `Accept` field of the client request header
2. A response code <br>
   <img src="../course-images/Common%20HTTP%20Response%20Codes.png" width=75%>

## Back-End Web Architecture
### Components
Backend web architecture is made up of:
1. The server: Listens to incoming requests
2. The app: What is hosted on the server that handles the requests based on the HTTP verb and the Uniform Resource Indentifier (URI)
   * *Route*: The pair of an HTTP verb and a URI is called
   * *Routing*: Matching a route based on a request 

    <br>

    **NOTE**: *Middleware* is any code that executes between the server receiving a request and sending a response

3. The database

### Web API
*"An API is a collection of clearly defined methods of communication between different software components."*

## CRUD Architecture
| REST Endpoint    | Status Codes                               | Response Content
| ---------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------- 
| POST             | 201 (CREATED)                              | Header with link to newly-created resource <br> + Body with newly-created resource
| GET              | 200 (OK)                                   | Body with fetched resource(s)  
| PUT              | 200 (OK) <br> **OR** 204 (NO CONTENT)      | Body with updated resource <br> **OR** *N/A*
| DELETE           | 204 (NO CONTENT)                           | *N/A*