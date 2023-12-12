import React from 'react'

const Context = React.createContext({
  searchInput: '',
  updateSearchInput: () => {},
})

export default Context
