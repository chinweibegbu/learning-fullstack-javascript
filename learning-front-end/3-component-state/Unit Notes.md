# Unit Notes

## Directory Content
### hooks/state-hook Folder
The files are itemised in the order in which their content was learnt:
1. `ColorPicker.js`: An example of using `useState()` to change the state of an application dynamically
2. `PhoneNumber.js`: An example of separating concerns regarding event handling and the returned JSX
3. `QuizNavBar.js`: An example of referring to the previous current value in `useState()` to prevent out-of-sync updates
    
    **NOTE**: It is common practice to use a callback function inside `setState()` e.g.
    ```
    function increment() {
        setState( (prevState) => {
            return prevState + 1;
        });
    }
    ```

4. `EditProfile.js`: An example of using objects with `setState()` showing that the current value is not restricted to a single value (can be an array, object, etc.)
5. `Musical.js`: An example of simplifying code by using different state variables rather than passing a complex object to `useState()`

### hooks/effect-hook Folder
The files are itemised in the order in which their content was learnt:
1. `Counter.js`: An example of using `useEffect()` to carry out an action when a component is rendered or re-rendered (e.g. after using `setState()`)
2. `Cleanup.js`: An example of how to cleanup after your effects such that each render or re-render does not add unnecessary changes
3. `Timer.js`: An example of using a *dependency array* to specify when to run the `useEffect()` function
4. `Forecast.js`: Another example of using a *dependency array* to specify when to run the `useEffect()` function

## Hooks
_"React Hooks, plainly put, are **functions** that let us manage the internal state of components and handle post-rendering side effects directly from our function components. Using Hooks, we can determine what we want to show the users by **declaring how our user interface should look based on the state**."_

- See complete list of in-built React hooks at https://react.dev/reference/react.
- Two main rules to keep in mind when using Hooks:
  1. Only call Hooks at the top level.
  2. Only call Hooks from React functions.
- Read about *custom hooks* here: https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components

### State Hook
> `import React, { setState } from 'react';`

The *State Hook* returns an array with two values: the current value of this state and a function that can be used to update the value of this state. 

Below is an example of how to use this function with array destructuring:
> `const [currentState, setCurrentState] = useState();`

Here is how to use the State Hook with an initial state value:
> `const [isLoading, setIsLoading] = useState(true);`

**NOTE**: If passed no paramter, the default value of the current state value is `undefined`. It is advised to pass `null` to the `useState()` function when you do not have a default state for easier readability.

- React state updates are asynchronous.
- It is advised to use different state variables to make your code as simple as possible.
- It is best practice to define static data models outside of function components since they don’t need to be recreated each time our component re-render

### Effect Hook
The *Effect Hook* tells our component to do something every time it’s rendered (or re-rendered).

- There are three key moments when the Effect Hook can be utilized:
  1. When the component is first added, or mounted, to the DOM and renders
  2. When the state or props change, causing the component to re-render
  3. When the component is removed, or unmounted, from the DOM
- If our effect returns a function, then the `useEffect()` Hook always treats that as the cleanup function.
- By passing a second argument to the `useEffects()` function called the *dependency array*, you can specify when the `useEffects()` function should be called e.g. only on initial render