import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
// import {HiOutlineSearch} from 'react-icons/hi'
import Context from '../../Context'

const Header = props => {
  const {history} = props
  const context = useContext(Context)
  const {searchInput, updateSearchInput, onSearchButtonOREnterPressed} = context

  const onSearchButtonClicked = () => {
    if (searchInput !== '') {
      onSearchButtonOREnterPressed()
      history.push('/search')
    }
  }
  const onKeyDownInput = event => {
    if (event.key === 'Enter' && searchInput !== '') {
      onSearchButtonOREnterPressed()
      history.push('/search')
    }
  }
  const onChangeInput = event => {
    updateSearchInput(event.target.value)
  }
  return (
    <nav className="nav-bar">
      <Link
        className="nav-bar-link"
        to="/"
        onClick={() => updateSearchInput('')}
      >
        <h1 className="nav-header">movieDB</h1>
      </Link>
      <ul className="nav-bar-navs">
        <li className="nav-bar-items">
          <Link className="nav-bar-link" to="/top-rated">
            <button
              className="nav-bar-buttons"
              onClick={() => updateSearchInput('')}
              type="button"
            >
              Top Rated
            </button>
          </Link>
        </li>
        <li className="nav-bar-items">
          <Link className="nav-bar-link" to="/upcoming">
            <button
              className="nav-bar-buttons"
              onClick={() => updateSearchInput('')}
              type="button"
            >
              Upcoming
            </button>
          </Link>
        </li>
      </ul>
      <div className="nav-bar-search-container">
        <input
          value={searchInput}
          placeholder="search"
          className="nav-bar-search"
          type="text"
          onKeyDown={onKeyDownInput}
          onChange={onChangeInput}
        />
        {/* <Link className="header-search-link" to={`/search/${searchInput}`}> */}
        <button
          className="nav-bar-search-button"
          type="button"
          onClick={onSearchButtonClicked}
        >
          {/* <HiOutlineSearch className="nav-bar-search-icon" /> */}
          Search
        </button>
        {/* </Link> */}
      </div>
    </nav>
  )
}

export default withRouter(Header)
