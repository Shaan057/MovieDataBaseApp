import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
// import {HiOutlineSearch} from 'react-icons/hi'
import Context from '../../Context'

const Header = props => {
  const {history} = props
  const context = useContext(Context)
  const {searchInput, updateSearchInput} = context

  const onSearchButtonClicked = () => {
    if (searchInput !== '') {
      //   updateSearchInput(searchInput)
      history.push(`/search/${searchInput}`)
    }
  }
  const onKeyDownInput = event => {
    if (event.key === 'Enter' && searchInput !== '') {
      //   updateSearchInput(event.target.value)
      history.push(`/search/${searchInput}`)
    }
  }
  const onChangeInput = event => {
    updateSearchInput(event.target.value)
  }
  return (
    <nav className="nav-bar">
      <Link className="nav-bar-link" to="/">
        <h1 className="nav-header">movieDB</h1>
      </Link>
      <ul className="nav-bar-navs">
        <li className="nav-bar-items">
          <Link className="nav-bar-link" to="/top-rated">
            <button className="nav-bar-buttons" type="button">
              Top Rated
            </button>
          </Link>
        </li>
        <li className="nav-bar-items">
          <Link className="nav-bar-link" to="/upcoming">
            <button className="nav-bar-buttons" type="button">
              Upcoming
            </button>
          </Link>
        </li>
      </ul>
      <div className="nav-bar-search-container">
        <input
          value={searchInput}
          placeholder="Search"
          className="nav-bar-search"
          type="search"
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
