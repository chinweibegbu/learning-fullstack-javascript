import React from 'react';
import '../styles/Business.css';

function Business(props) {
    const details = props.businessDetails;
    console.log(details);
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
                    <p className='business-category'>{details.category.title}</p>
                    <p className='business-rating'>{details.rating + ' stars'}</p>
                    <p>{details.reviewCount} {details.reviewCount === 1 ? "review" : "reviews"}</p>
                </div>
            </div>
        </div>
    );
}

export default Business;