# Unit Notes

## Props
_Props_ can be used to customize the output of each component depending on the information that is passed in. 

- Every component has a `props` object (i.e. its properties can be referenced using dot notation).
- Passing `props` to a component:
    ```
    <Greeting name="The Queen Mary" city="Long Beach, California" age={56} haunted={true} />
    ```
    
    **NOTE**: Non-string property values are encompassed in curly brackets, {}
- You can render different UIs based on `props`
- The `props.children` will:
    - Return `undefined` if there is no child
    - Return a single element if it has only one child
    - Return an array if it has multiple children

### Rendering a Component's `props`
Here are two ways to render a component's `props`:
1.  Passing the `props` object as a whole to the function(al) component
    ```
    function Button(props) {
        return <button>{props.displayText}</button>;
    }
    ```
2.  Using destructuring syntax to directly access properties
    ```
    function Button({displayText}) {
        return <button>{displayText}</button>;
    }
    ```
- **NOTE**: Props in React travel in a one-way direction, from the top to bottom, parent to child

### Passing Functions to `props`
- You can pass functions as `props` - this is often used as a way to pass event handlers
- It is conventional to name the event handler in the following manner:
    - `prop` name: "on" + nameOfEvent e.g. `onHover()`, `onClick()`
    - `prop` value: "handle" + nameOfEvent e.g. `handleHover()`, `handleClick()`

### Default values for `props`
Here are two ways to assign default a component's `props`:
1.  Adding a `defaultProps` static property to the component
    ```
    function Example(props) {
        return <h1>{props.text}</h1>
    }
        
    Example.defaultProps = {
        text: 'This is default text',
    };
    ```
2.  Specifying the default value directly in the function definition
    ```
    function Example({text='This is default text'}) {
        return <h1>{text}</h1>
    }
    ```
3. Setting the default value in the function body
    ```
    function Example(props) {
        const {text = 'This is default text'} = props;
        return <h1>{text}</h1>
    }
    ```