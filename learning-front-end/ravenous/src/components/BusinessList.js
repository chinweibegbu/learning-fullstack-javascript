import React from 'react';
import Business from './Business';
import '../styles/BusinessList.css';
import { businessDetails } from '../businessDetails';

function BusinessList(props) {
    return (
        <ul className='business-view'>
            {businessDetails.map((business, i) => {
                return <li key={"business-"+i}><Business businessDetails={businessDetails[i]} /></li>;
            })}        
        </ul>
    );
}

export default BusinessList;