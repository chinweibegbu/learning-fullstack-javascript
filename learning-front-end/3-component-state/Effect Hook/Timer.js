import React, { useState, useEffect } from 'react';

export default function Timer() {
    const [time, setTime] = useState(0);
    const [name, setName] = useState('');

    const handleChange = ({target}) => {
        setName(target.value);
    };

    useEffect(() => {
        const intervalId = setInterval(() => setTime(prevTime => prevTime + 1), 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        <>
            <h1>Time: {time}</h1>
            <input value={name} onChange={handleChange} />
        </>
    );
}


