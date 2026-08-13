import React from 'react'

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
