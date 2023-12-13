import React from 'react'

const Context = React.createContext({
  searchInput: '',
  updateSearchInput: () => {},
  searchedInput: '',
  onSearchButtonOREnterPressed: () => {},
})

export default Context
