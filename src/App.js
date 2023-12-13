import './App.css'
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Header from './Components/Header'

import PopularMovies from './Components/PopularMovies'
import TopRatedMoviesPage from './Components/TopRatedMovies'
import UpcomingMovies from './Components/UpcomingMovies'
import MovieDetails from './Components/MovieDetails'
import SearchedMoviesPage from './Components/SearchedMoviesPage'
// import ProtectedRoute from './Components/ProtectedRoute'
import Context from './Context'

class App extends Component {
  state = {searchInput: '', searchedInput: ''}

  updateSearchInput = value => {
    this.setState({
      searchInput: value,
    })
  }

  onSearchButtonOREnterPressed = () => {
    const {searchInput} = this.state
    this.setState({
      searchedInput: searchInput,
    })
  }

  render() {
    const {searchInput, searchedInput} = this.state
    return (
      <Context.Provider
        value={{
          searchInput,
          updateSearchInput: this.updateSearchInput,
          searchedInput,
          onSearchButtonOREnterPressed: this.onSearchButtonOREnterPressed,
        }}
      >
        <Header />
        <Switch>
          <Route exact path="/" component={PopularMovies} />
          <Route exact path="/top-rated" component={TopRatedMoviesPage} />
          <Route exact path="/upcoming" component={UpcomingMovies} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/search" component={SearchedMoviesPage} />
        </Switch>
      </Context.Provider>
    )
  }
}

export default App
