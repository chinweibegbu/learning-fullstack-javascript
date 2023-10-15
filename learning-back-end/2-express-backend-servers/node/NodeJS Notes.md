# Node.js

### Introduction
**Node.js** is a JavaScript runtime, or an environment that allows us to execute JavaScript code outside of the browser. It can be used to make web, command-line and desktop applications.

Features:
1. Node REPL (see in a sub-section below)
2. Node `global` object
3. Node `process` object (see in a sub-section below)
4. Event-driven architecture (see in a sub-section below)

To run a program using Node:
> node myProgram.js

Documentation resources:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript
* https://nodejs.org/api/

### Node REPL
REPL = read–eval–print loop

* You can access the in-built Node REPL by using the `node` command in the terminal then hitting the `enter` key
* Node REPL evaluates your input line by line
* If you’d like to type multiple lines and then have them evaluated at once you can type .editor while in the REPL. Once in “editor” mode, you can type `ctrl` + `D` when you’re ready for the input to be evaluated.

### The Process Object
A **process** is the instance of a computer program that is being executed

The Node `process` object includes the following properties:
* `env`: An object which stores and controls information about the environment in which the process is currently running
* `memoryUsage`: A function that returns information on the CPU demands of the current process
* `argv`: An array of command line values provided when the current process was initiated. This array contains the following (respectively):
   1. The absolute path to Node
   2. The path to the file that is running
   3. Any command arguments provided

You can read more about the Node `process` object in its [documentation](https://nodejs.org/api/process.html).

### Node Modules
A **module** is a collection of code located in a file. Modules are created using Node's `module.export` property and loaded using the `require()` function, as seen in the images below:

<img src="../../course-images/Node%20Module.png">
<img src="../../course-images/Node%20Module%20require()-ing.png">

Node modules are divided into three categories: 
* core modules: Defined within Node’s source and are located in the `/lib` folder. Required with a name e.g. `require('event')`
* local modules: Defined by the programmer. Required with a path e.g. `require('./dog.js')`
* third-party modules: These can be installed with Node Package Manager, an online collection of software. Downloaded using `npm install package-name` in the console. Examples include `react`, `express` and `nodemon`

### Event-Driven Architecture
Node uses event-driven programming rather than imperative programming. Node provides an `EventEmitter`, accessible in the `events` core module. Each `EventEmitter` instance has two core methods:
* `on()`: Assigns a listener callback to a named event
* `emit()`: Announces a named event has occured

<img src="../../course-images/Event%20Emitter%20Class%20Usage.png">
<img src="../../course-images/Event%20Emitter%20Class%20Usage%20-%20Methods.png">

### Node + Async JS
Node provides a number of APIs for performing asynchronous tasks which expect callback functions to be passed in as arguments. Examples of such APIs include `setTimeout()` and `setInterval()`.

**NOTE**: Alternatively, one can use JS `Promises` or `async...await` <br>
**NOTE**: Node provide a collection of the traditional Node asynchronous APIs formatted for promises instead of callbacks. This can be found on util.promisify

### Node + User Input/Output
| Task      | Tool       
|-----------|--------------------------
|Output     | `process.stdout.write()` 
|Input      | `process.stdin.on()`

<img src="../../course-images/Node%20Output.png">

**NOTE**: `console.log()` is a wrapper around `process.stdout.write()` <br>
**NOTE**: `process.stdin` is an instance of the `EventEmitter` class → that is why it is able to use the `on()` function, passing it the name of the event and the listener function, respectively

See the `/node-input-output` folder to see an example

### Node + Errors
Node includes:
* standard JS errors e.g. `EvalError`, `SyntaxError`, `RangeError`, `ReferenceError`, `TypeError`, `URIError` 
* the JS `Error` class for creating new error instances

Many asynchronous Node APIs use **error-first callback functions**; these are callback functions which have:
1. an **error** as the first expected argument
2. the **data** as the second argument

<img src="../../course-images/Node%20Error-First%20CallBack%20Asynchronous%20Function.png">
If the asynchronous task results in an error, it will be passed in as the first argument to the callback function. If no error was thrown, the first argument will be `undefined`.

<br>

See the `/node-async-error-handling` folder to see an example

**NOTE**: You can use the regular `try-catch` structure for synchronous, NOT asynchronous function errors. 

### Node Filesystem Interaction API
Node does NOT interact with the entirety of the user's file system - it has limited access. 

Node provides the `fs` core module for filesystem interaction; this module is modeled after the [POSIX](https://en.wikipedia.org/wiki/POSIX) standard. An example of a common `fs` method is `readFile()`
<img src="../../course-images/Node%20fs%20Code%20Module%20Usage.png">

**NOTE**: All `fs` methods have both synchronous and asynchronous versions. In the image above, `readFile()` is being used asynchronously

You can also use the `fs` module with the `readline` module to enable straming from a file rather than reading the entire file's content.  You have the option to either:
* Use the `fs.createReadStream(filename)` function to create a read-only stream
  <img src="../../course-images/Node%20fs%20Code%20Module%20Usage%20-%20Streaming.png">
  **NOTE**: This is used in tandem with the `readline` module
* Use the `fs.createWriteStream(filename)` function to create a writable stream
  <img src="../../course-images/Node%20fs%20Code%20Module%20Usage%20-%20Writable%20Streaming.png">

### Node HTTP Server
Node uses the `http` core module. You can read the documentation of this module at https://nodejs.org/api/http.html.

<img src="../../course-images/Node%20HTTP%20Server.png">

* `http.createServer()`
  * Returns an instance of `http.server`
  * Takes in a custom callback function which is triggered once the server is listening AND receives a request
* `http.server`
  * Has a function called `listen()`
* `requestListener()`
  * This is the name usually given to the custom callback function passed to `http.createServer()`
  * Takes in a request and response
  * Sets the response header and body
  * Must signal the end of the interaction with a call to `response.end()`
