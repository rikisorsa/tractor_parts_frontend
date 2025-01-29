import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        const term = e.target.value;
        setInput(term);
        onSearch(term); // Pass the search term to the parent
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Search by name or OEM number"
                
            />
            <p className="search-bar-text">Search by name or OEM number</p>
        </div>
    );
};

export default SearchBar;
