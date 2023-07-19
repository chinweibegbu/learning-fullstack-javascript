import React, { useState } from 'react';

// Regex to match numbers between 1 and 10 digits long
const validPhoneNumber = /^\d{1,10}$/;

export default function PhoneNumber() {
    const [ phone, setPhone ] = useState('');

    // Event handler function
    const handleChange = ({ target }) => {
        const newPhone = target.value;
        const isValid = validPhoneNumber.test(newPhone);
        if (isValid) {
        // update state 
        setPhone(newPhone);
        }
        // Ignore the event, when new value is invalid
    };

    return (
        <div className='phone'>
        <label for='phone-input'>Phone: </label>
        <input value={phone} onChange={handleChange} id='phone-input' />
        </div>
    );
}


