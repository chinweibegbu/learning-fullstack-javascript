import React from 'react';
import '../styles/Business.css';

function Business(props) {
    const details = props.businessDetails;
    return (
        <div className='business'>
            <img className='business-image' src={details.image} alt={details.name} />
            <p className='business-name'>{details.name}</p>
            <div className='business-text'>
                <div className='business-address'>
                    <p>{details.address.addressLine}</p>
                    <p>{details.address.city}</p>
                    <p>{details.address.state + ' ' + details.address.postalCode}</p>
                </div>
                <div className='business-details'>
                    <p className='business-category'>{details.category}</p>
                    <p className='business-rating'>{details.rating + ' stars'}</p>
                    <p>90 reviews</p>
                </div>
            </div>
        </div>
    );
}

export default Business;