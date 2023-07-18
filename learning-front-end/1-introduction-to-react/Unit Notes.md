# Unit Notes
## JavaScript XML (JSX)
JSX is a syntax extension of JavaScript (looks a lot like HTML). JSX is NOT valid JS syntax - a JSX compiler is used to convert it to regular JS before the file reaches the browser.

### JSX Element Attributes
- JSX elements are treated as JS expressions
- JSX elements can have HTML-like attributes which use the syntax `attribute-name=attribute-value`. See the code below for an example:
    > `const p1 = <p id='small'>foo</p>;`
- A JSX expression must have exactly ONE outermost element
- Multi-line JSX expressions must be wrapped in parentheses, as seen in the image below:

    <img src="../course-images/Multi-line%20JSX%20Expression%20Syntax.png"  width="50%">

### JSX Specifics
- Unlike in HTML, use `className` rather than `class` element attribute name
- Unlike in HTML, self-closing tags MUST have the slash before the closing angle bracket e.g. `<br />`, rather than `<br>`
- Use curly braces when you want content in a JSX element to be treated as JS. For instance:
    > `root.render(<h1>{2 + 3}</h1>);`<br>
    >> NOT &nbsp; `root.render(<h1>2 + 3</h1>);`
    
    This applies to when using literals (e.g. string, numbers, booleans), variables, functions, etc.
- You can NOT inject a JS conditional into a JSX expression
    - Alternative #1: Use ternary operations as seen in the code below
        
        ```
        const img = <img
            src={pics[coinToss()=='heads' ? 'kitty' : 'doggy']} 
            onClick=changeToHorse />;
        ```
    - Alternative #2: Use && as seen in the code below - the second part will only run if the first part evaluates to true i.e. there is no equivalent `else` result like in the ternary operation above
        ```
        <ul>
            <li>Oasis Shawarma</li>
            { !judgmental && <li>Skittles and Shortbread</li> }
            <li>KFC chicken bucket</li>
        ```
- You can use the `map()` in-built array JS method to create a collection of JSX elements in a very efficient manner (see the code below)
    ```
    const strings = ['Home', 'Shop', 'About Me'];
    const listItems = strings.map(string => <li>{string}</li>);
    <ul>{listItems}</ul>
    ```
- The `key` attribute is used by React to keep track of list items (prevents list order scrambling). Like the `id` attribute, it's value should also be unique. While it is not always used, a list needs a key if:
    - List items have memory from one render to the next
    - List order might be shuffled

    See the code below for an example of how to incorporate unique `key` value genration while still using the `.map()` function by adding a second variable to its arrow function:
    ```
    const people = ['Rowe', 'Prevost', 'Gare'];
    const peopleList = people.map((person,i) =>
        <li key={"person_"+i}>{person}</li>
    );
    root.render(<ul>{peopleList}</ul>);
    ```
- You can actually create React code without using JSX by utilising the `createElement(<element-type>, <properties>, <children>)` function as see in the code below:
    > `const greatestH1Ever = React.createElement("h1", null, "Best Heading Ever");`

    Read more about this particular function at https://react.dev/reference/react/createElement.

### JSX Rendering
- In order for React to render a JSX element/expression, it needs to know what to render and where to render it.
- The `react` library needs to imported into the JS file so that functions such as `createRoot()` and `render()` can be used.
- The `render()` function only updates DOM elements that have changed.

## React and the Virtual DOM
- _Document Object Model (DOM)_: This is represntaion of a web page created by and stored in the user's browser. The browser renders webages by transforming HTML into a DOM. The DOM is stored as a tree-like structure with HTML-element nodes. When there is a change in the HTML, no matter how small, an entirely new DOM is created and re-rendered (this is slow and arguably unecessary).
- _Virtual DOM_: This is a JS object which represents the DOM. Rather than re-rendering the new DOM, the differences between the old and new JS object (based on a _"virtual DOM snapshot"_) are found; this process is called _diffing_. When the diffing process is complete, communicated to the browser, such that only the affected DOM nodes are re-rendered. The virtual DOM is stored in memory as a JS object.

### Using React Components
**NOTE**: The DOM is used in React applications but is NOT a part of React; this is why we import `React` from `react` and then import `ReactDOM` from `react-dom/client`

1. Import `React` and `ReactDOM` from their respective files
2. Declare your React components in the form of _function(al) components_
    - A function(al) component is a function which returns a React component
    - A function(al) component can include markup, CSS and JSS but is expected to return a JSX element
    - A function(al) component is created with PascalCase, the same case used or JS classes
    - An example of a function(al) component is a follows:
        ```
        function MyComponent() {
            return <h1>Hello World!</h1>;
        }
        ```
3. Move components from file to file using ES6 default exporting and importing

### Creating a React App
1. Check that you have `node` installed by running the following code in your terminal/CMD:
    > `node -v`
2. Upgrade to the latest version of Node Package Manager (`npm`) by running the following code in your terminal/CMD:
    > `sudo npm install -g npm@latest`

    **NOTE**: `npm` is automatically downloaded with `node` but it updates more frequently so it is a good idea to install the latest version before starting work

3. Uninstall and reisntall `create-react-app` if already installed by running the following code in your terminal/CMD. If you have never installed `create-react-app` before, skip this step:
    > `npm uninstall -g create-react-app` <br>
    > `npm install -g create-react-app`
4. Create a new Reat project folder by running the following code in your terminal/CMD:
    > `npx create-react-app myfirstreactapp`
    >> OR &nbsp; `npx create-react-app myfirstreactapp --use-npm`

    **NOTE**: The name of your React application should NOT contain capital letters <br>
    **NOTE**: The alternative to using `npm` to create the React application is to use `yarn`, which is another package manager (read more here: https://yarnpkg.com/); to do so, simply remove `--use-npm` from the end of the code above

See below the file structure of a newly created React app:
<img alt="React App Structure" src="../course-images/React%20App%20Structure.png">
1. `.gitignore`: Specifies files and directories to ignore when commiting code
2. `package.json`: Specifies the following details of your app:
    - `name`: The name of the app
    - `version`: The current version of the app
    - `"private"`: Whether your app is private or public and, thus, publishable to the `npm` ecosystem
    - `dependecies`: All required Node modules and versions for the app
    - `scripts`: Aliases that can be used to access some of the `react-scripts` in a more efficient manner
    <br> Other possible details include `browserslist` and `eslintconfig`
3. `node_modules`: Contains the dependencies and sub-dependencies of packages used in the app
4. `package-lock.json`: Specifies the exact dependency tree installed in the `node_modules` folder
5. `public`: Contains assets that are served directly without additional processing by `webpack` (read more about `webpack` [here](https://www.scaler.com/topics/react/webpack-in-react/#:~:text=Overview,be%20loaded%20by%20the%20browser))
6. `src`: Contains the core React app which will processed by `webpack`

Commonly used commands:
- `npm start`: Starts the development server<br>
    **NOTE**: The above command should automatically open up a tab in your default browser which points to http://localhost:3000/ which should look like the image below:
    <img alt="Default React App Homepage" src="../course-images/Default%20React%20App%20Homepage.png">
- `npm run build`: Bundles the app into static file for production
- `npm test`: Starts the test runner
- `npm run eject`: Removes this tool and copies build dependencies, configuration files and scripts into the app directory <br>
    **NOTE**: The above command has no reverse

### Setting up React Developer 
1. Install the "React Developer Tools" Chrome extension
    **NOTE**: The extension will be grey on web pages which do not use React and coloured on pages which do (red for sites in development and blue for sites in production)
2. Create a react app
3. Navigate into the created React app folder
4. Open the application in Google Chrome to see the extension in use
5. Open the Chrome Developer Tools - you will see that React has added two tabs:
	- `Components`
	- `Profile`
6. Click on "Settings" tab and delete any filter
7. Open a new terminal and open the code in Visual Studio Code
8. Add a `props` parameter to the App function(al) component
9. Add a `<p>` element which accesses the `name` propoerty of `props`
10. Navigate back to Chrome Developer Tools
11. Add a `name` property to the `props` tab of the `App` component - you should now see the newly added `props.name` on the website

## Questions and Answers
Q: Structuring a React project:<br>
A: https://scrimba.com/articles/react-project-structure/#:~:text=The%20structure%20is%20organized%20into,styles%20folder%20contains%20CSS%20styles

Q: Insert `<img>` into js file:<br>
A: https://stackoverflow.com/questions/34582405/react-wont-load-local-images

Q: Insert simple border:<br>
A: https://stackoverflow.com/questions/2020496/how-to-set-a-border-for-an-html-div-tag

Q: Uppercase text in CSS:<br>
A: https://www.w3schools.com/cssref/pr_text_text-transform.php

Q: `margin` shorthand in CSS:<br>
A: https://www.w3schools.com/css/css_margin.asp

Q: Font size guidelines:<br>
A: https://www.learnui.design/blog/mobile-desktop-website-font-size-guidelines.html

Q: `<ul>` as grid using flex:<br>
A: https://codepen.io/katrina-isabelle/pen/qXxyrw

Q: Remove focus decoration from text `<input>`<br>
A: https://stackoverflow.com/questions/3397113/how-to-remove-focus-border-outline-around-text-input-boxes-chrome

Q: Placeholder for text `<input>` field<br>
A: https://www.geeksforgeeks.org/placeholder-vs-value-attributes-in-html/#:~:text=Value%20Attribute-,The%20placeholder%20attribute%20specifies%20a%20short%20hint%20that%20describes%20the,be%20taken%20during%20form%20submission.

Q: Include legend in `<fieldset>` display<br>
A: https://codepen.io/vkjgr/pen/OJOydq

Q: Fullscreen background banner<br>
A: https://stackoverflow.com/questions/32468642/how-to-make-banner-fullscreen-and-adapt-to-the-browser-size

Q: Cursor pointer in CSS<br>
A: https://www.w3schools.com/cssref/tryit.php?filename=trycss_cursor

Q: Change colour of radio button<br>
A: https://www.geeksforgeeks.org/how-to-change-the-color-of-radio-buttons-using-css/

Q: Rendering components from raw JS data<br>
A: https://stackabuse.com/bytes/fix-objects-are-not-valid-as-a-react-child-error-in-react/

Q: Specify how image is to fit to container<br>
A: https://www.w3schools.com/css/css3_object-fit.asp
