import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a product..."
        style={{
          padding: '10px',
          width: '70%',
          fontSize: '16px',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          marginLeft: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
