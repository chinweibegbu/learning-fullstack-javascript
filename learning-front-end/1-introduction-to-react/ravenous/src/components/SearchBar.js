import React from 'react';
import '../styles/SearchBar.css';

function SearchBar() {
    return (
        <form>
            <fieldset className='search-section'>
                <input type="text" name="term" placeholder="Search Businesses" />
                <input type="text" name="location" placeholder="Where?" />
                <input type="submit" value="Search" />
            </fieldset>
            <fieldset className='sorting-section'>
                <legend>Sort by:</legend>
                <input type="radio" id="best_match" name="sort_by" value="Best Match" />
                <label for="best_match">Best Match</label>
                <input type="radio" id="rating" name="sort_by" value="Highest Rated" />
                <label for="rating">Highest Rated</label>
                <input type="radio" id="review_count" name="sort_by" value="Most Reviewed" />
                <label for="review_count">Most Reviewed</label>
            </fieldset>
            
        </form>
    );
}

export default SearchBar;