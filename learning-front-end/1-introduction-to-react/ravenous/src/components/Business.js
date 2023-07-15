import React from 'react';
import '../styles/Business.css';

function Business() {
    return (
        <div className='business'>
            <img className='business-image' src={require('../restaurant.jpeg')} alt='Korean Food' />
            <p className='business-name'>MarginOtto Pizzeria</p>
            <div className='business-text'>
                <div className='business-address'>
                    <p>1010 Paddington Way</p>
                    <p>Bordertown</p>
                    <p>NY 10001</p>
                </div>
                <div className='business-details'>
                    <p className='business-category'>Italian</p>
                    <p className='business-rating'>4.5 stars</p>
                    <p>90 reviews</p>
                </div>
            </div>
        </div>
    );
}

export default Business;