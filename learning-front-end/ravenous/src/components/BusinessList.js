import React from 'react';
import Business from './Business';
import '../styles/BusinessList.css';
// import { businessDetails } from '../businessDetails';

function BusinessList({allBusinessDetails}) {
    return (
        <ul className='business-view'>
            {allBusinessDetails.map((business, i) => {
                return <li key={"business-"+i}><Business businessDetails={allBusinessDetails[i]} /></li>;
            })}        
        </ul>
    );
}

export default BusinessList;