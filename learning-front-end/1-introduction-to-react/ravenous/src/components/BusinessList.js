import React from 'react';
import Business from './Business';
import '../styles/BusinessList.css';

function BusinessList() {
    const businesses = []
    for (let i=0; i<10; i++) {
        businesses.push(<li key={"business-"+i}><Business /></li>);
    }
    return (
        <ul className='business-view'>
            {businesses}
        </ul>
    );
}

export default BusinessList;