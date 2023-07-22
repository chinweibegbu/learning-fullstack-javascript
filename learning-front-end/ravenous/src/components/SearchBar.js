import React, { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({onSubmit}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [sortOption, setSortOption] = useState("best_match");

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }
    
    const handleSortOptionChange = (event) => {
        setSortOption(event.target.id)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searching Yelp with ${searchTerm}, ${location}, ${sortOption}`);
        onSubmit(searchTerm, location, sortOption);
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset className='search-section'>
                <input type="text" name="term" value={searchTerm} placeholder="Search Businesses" onChange={handleSearchTermChange} />
                <input type="text" name="location" value={location} placeholder="Where?" onChange={handleLocationChange} />
                <input type="submit" value="Search" />
            </fieldset>
            <fieldset className='sorting-section'>
                <legend>Sort by:</legend>
                <input type="radio" id="best_match" name="sort_by" value="Best Match" onChange={handleSortOptionChange} />
                <label htmlFor="best_match">Best Match</label>
                <input type="radio" id="rating" name="sort_by" value="Highest Rated" onChange={handleSortOptionChange} />
                <label htmlFor="rating">Highest Rated</label>
                <input type="radio" id="review_count" name="sort_by" value="Most Reviewed" onChange={handleSortOptionChange} />
                <label htmlFor="review_count">Most Reviewed</label>
            </fieldset>
            
        </form>
    );
}

export default SearchBar;