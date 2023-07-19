import React, { useState, useEffect } from 'react';

export default function Counter() {
    // Using array destructuring
    // + Setting count's initial value to 0
    const [count, setCount] = useState(0);

    // The function passed to useEffect() will automatically run whenever the component is rendered or re-rendered
    useEffect(() => {
        // Using a template literal to output the results
        alert(`Count: ${count}`);
    });

    // Defining the event handler for the button
    const handleClick = () => {
        // Using the callback technique
        setCount((prevCount) =>  prevCount + 1);
    };

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={handleClick}>
                Click me
            </button>
        </div>
    );
}
