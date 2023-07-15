import React from 'react';
import '../styles/SearchBar.css';

function SearchBar() {
    return (
        <form>
            <input type="text" name="term" />
            <input type="text" name="location" />
            <input type="submit" value="Search" />
            
            <input type="radio" id="best_match" name="sort_by" value="Best Match" />
            <label for="best-match">Best Match</label>
            <input type="radio" id="rating" name="sort_by" value="Highest Rated" />
            <label for="rating">Highest Rated</label>
            <input type="radio" id="review_count" name="sort_by" value="Most Reviewed" />
            <label for="review_count">Most Reviewed</label>
            
        </form>
    );
}

export default SearchBar;