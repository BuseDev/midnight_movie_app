import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        <input 
          type='text'
          placeholder='Search through thousands of movies'
          value={searchTerm}//the value is what we write on search input
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search