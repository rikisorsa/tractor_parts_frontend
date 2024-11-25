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
        </div>
    );
};

export default SearchBar;
