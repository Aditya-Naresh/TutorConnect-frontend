import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search by name or subject..."
        className="px-4 py-2 border border-gray-300 rounded-md mr-2"
      />
      <button type="submit" className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
