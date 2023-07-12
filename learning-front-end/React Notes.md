# Course Notes
### JavaScript Overview
Refer to the following files for the content covered in the overview section of this course: 
- `[../learning-js/beginner-js/beginner.js]`
- `[../learning-js/intermediate-js/intermediate.js]`

## Command Line/Git Bash Commands
- `ls`: List all items in the working directory
- `pwd`: Print out the working directory
- `cd <directory-link>`: Change directory to specified directory
- `mkdir <directory-name>`: Make directory with specified names in the working directory
- `touch <file-name>`: Create a new file with the specified name in the working directory
- `echo <text>`: Print out specified text to the terminal
- `echo <text> >> <destination>`: Print out specified text in the specified destination
- `cat <file-name>`: Print out the content of the specified file to the terminal

## Runtime Environments
The two JS runtime environments (JRE) covered in this course are:
1. The runtime environment of a browser
2. The Node runtime environment

Add `type='module'` to your script tag to allow you use an ES6 file as a _module_ (a reusable piece of code in a file that can be exported and then imported for use in another file). 

### Importing in the Browser JRE (ES6)
The code to import named resources from one module into another are as follows:
1.  >`export { <function-name-1>, <funtion-name-2> };`
    >> OR  &nbsp; prepend the resource with the `export` keyword
2.  > `import { exportedResource } from '/path/to/module'`
    >> OR &nbsp; `import { exportedResource as newlyNamedResource } from '/path/to/module'`

The code to import the _default export_ (a single value to represent the entire module) of a module into another is as follows: 
1.  >`const resources = { valueA, valueB };`<br>
    > `export { resources as default };`  
    >> OR &nbsp; `export default resources;`

2.  > `import { default as importedResources } from 'module.js`
    >> OR &nbsp; `import importedResources from 'module.js';`

    **NOTE**: The shorthand in #2 is different from the regular imports due to the lack of curly braces, {}.

    **NOTE**: The specific resources can only be unpacked using something like _destructuring_ after the default resources have been imported. See the code black below:
    > `const { valueA, valueB } = resources;`

### Importing in the Node JRE
The code to import named resources from one module into another are as follows:
1.  >`module.exports.<function-name-1> = <funtion-name-1>;`
2.  > `const resources = require('./path/to/module');` <br>
    >> OR &nbsp; `const { <function-name-1> } = require('./path/to/module');'`

    **NOTE**: With the first approach in step #2, you will still have to access the function from the imported colelctive resources (see the code below). However, with the second approach, you can use the function directly. See the code below for a further illustration:
    > Approach #1: &nbsp; `resources.<function-name-1>();` <br>
    > Approach #2: &nbsp; `<function-name-1>();`

## Browser Compatibility
- Visit https://caniuse.com/ to check out helpful broswer compatibility information.
-   _Compilation_: Translating code from one language to another <br>
    _Transpilation_: Translating code to different formats of the same language
- Babel is a popular transpilation tool.

### Babel Setup
1. Run the following code to create a package.json file (**NOTE**: The `-y` makes the command ignore prompts)
    > `npm init -y`
2. Create `.babelrc` file (this is where you will configure Babel)
3. Add the following code to the `.babelrc` file, which will configure Babel to transpile all of the common ES6 features, instead of having to list them one by one
    > `{ "presets": ["@babel/preset-env"] }`
    
    **NOTE**: I believe you can alternatively run `npm install --save-dev` to install `@babel/cli` and `@babel/preset-env`
4. Add a `build` command in the `scripts` section of the `package.json` file
    > `"build" : "babel src -d out"`
    
    **NOTE**: `-d out` specifies the destination folder of the output files
5.  Use the `build` command which uses Babel to compile and transpile the code
    > `npm run build`

### Babel + Browser Compatibility Setup
The `babel-preset-env` preset also allows us to provide a list of browsers we want to be supported using a file named `.browserslistrc`. All you need in the file is a line of code with your required compatibilities in the form of a specific syntax (See more syntax here: https://github.com/browserslist/browserslist). Examples of file content include the following:
- `defaults`
- `last 2 Explorer versions`
- `cover 99.5%`

To list all browsers supported by your .browserlist file using the following command:
> `npx browserslist`
