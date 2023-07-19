import React, { useState, useEffect } from "react";
import { get } from './mockBackend/fetch';

export default function Forecast() {
    const [data, setData] = useState();
    const [notes, setNotes] = useState({});
    const [forecastType, setForecastType] = useState('/daily');

    // Run on render and cleanup (if specified)
    // + Run whenever forecastType changes
    useEffect(() => {
        alert('Requested data from server...');
        get(forecastType).then((response) => {
            alert('Response: ' + JSON.stringify(response,'',2));
            // After the data is set, update data so the app functions
            setData(response.data);
        });
    }, [forecastType]);

    // When there is a change, update the notes object
    const handleChange = (index) => {
        // Use object destructuring on the event
        ({ target }) => {
            // Define the content of the event handler which is a call to setNotes()
            setNotes((prev) => ({
                    ...prev,
                    [index]: target.value}
            ));
        }
    }
        
    // On the first render, the data is not yet loaded
    // While it loads, put up a loading screen
    // Once the data is loaded, its state will be updated, the component will re-render and the proper content will appear.
    if (!data) {
        return <p>Loading...</p>
    } else {
        return (
        <div className='App'>
        <h1>My Weather Planner</h1>
        <div>
            <button onClick={() => setForecastType('/daily')}>5-day</button>
            <button onClick={() => setForecastType('/hourly')}>Today</button>
        </div>
        <table>
            <thead>
            <tr>
                <th>Summary</th>
                <th>Avg Temp</th>
                <th>Precip</th>
                <th>Notes</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, i) => (
                <tr key={item.id}>
                <td>{item.summary}</td>
                <td> {item.temp.avg}°F</td>
                <td>{item.precip}%</td>
                <td>
                    <input
                    value={notes[item.id] || ''}
                    onChange={handleChange(item.id)}
                    />
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }
}
