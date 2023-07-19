// This uses object destructuring to call the non-default useState() function
import React, { useState } from 'react';

export default function ColorPicker() {
  // This uses array destructuring to get the results of calling the useState() function
  const [color, setColor] = useState();

  /*
    NOTE: You can set a default state value by passing an argument to useState().
          Additionally, passing the argument `null` will do the same thing as passing no argument

    e.g.
    > const [color, setColor] = useState("Tomato");
    > const [color, setColor] = useState(null);
  */

  // Tbe webpage wil reload automatically when there is a state change
  const divStyle = {backgroundColor: color};
  return (
    <div style={divStyle}>
      <p>The color is {color}</p>
      { /* An arrow function is passed to setColor rather than it being called directly */ }
      <button onClick={() => setColor('Aquamarine')}>
        Aquamarine
      </button>
      <button onClick={() => setColor('BlueViolet')}>
        BlueViolet
      </button>
      <button onClick={() => setColor('Chartreuse')}>
        Chartreuse
      </button>
      <button onClick={() => setColor('CornflowerBlue')}>
        CornflowerBlue
      </button>
    </div>
  );
}
