import './index.css'
import {useState, useEffect} from 'react'
// import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'
// import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
import SearchedMoviesListItem from '../SearchMovieListItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const SearchedMoviesPage = props => {
  const {match} = props
  const {params} = match
  const {query} = params
  const [searchMovieList, updateSearchMovieList] = useState([])
  const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial)
  const [pages, setPages] = useState(1)

  const onNextPageButtonClicked = () => {
    setPages(prev => prev + 1)
  }

  const onPreviousPageButtonClicked = () => {
    if (pages > 1) {
      setPages(prev => prev - 1)
    }
  }

  const pascalCaseData = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    genreIds: data.genre_ids,
    id: data.id,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    releaseDate: data.release_date,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  useEffect(() => {
    const fetchData = async () => {
      updateApiStatus(apiStatusConstants.inProgress)
      const url = `https://api.themoviedb.org/3/search/movie?api_key=4ded5f0e0d0987b2667ec36b01b00ea0&language=en-US&query=${query}&page=${pages}`
      const response = await fetch(url)
      if (response.ok) {
        const responseData = await response.json()

        const formattedData = responseData.results.map(each =>
          pascalCaseData(each),
        )
        updateSearchMovieList(formattedData)
        updateApiStatus(apiStatusConstants.success)
      } else {
        updateApiStatus(apiStatusConstants.failure)
      }
    }
    fetchData()
  }, [pages, query])
  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="white" height="50" width="50" />
    </div>
  )

  const renderVideosView = () => (
    <>
      <ul className="popular-movies-list">
        {searchMovieList.map(each => (
          <SearchedMoviesListItem key={each.id} data={each} />
        ))}
      </ul>
      <div className="pagination-button-container">
        <button
          className="left-button pagination-button"
          type="button"
          onClick={onPreviousPageButtonClicked}
        >
          {/* <AiOutlineDoubleLeft className="arrow" /> */}
          &lt;
        </button>
        <p>{pages}</p>
        <button
          className="right-button pagination-button"
          type="button"
          onClick={onNextPageButtonClicked}
        >
          {/* <AiOutlineDoubleRight className="arrow" /> */}
          &gt;
        </button>
      </div>
    </>
  )

  const renderFailureView = () => (
    <div className="failure-view-bg">
      <div className="failure-section">
        <img
          className="failure-image"
          src="https://res.cloudinary.com/dx8csuvrh/image/upload/c_scale,h_90/v1702227681/samples/ecommerce/warning_q9nakk.png"
          alt="failure"
        />
        <p className="failure-heading">Oops! Something Went Wrong</p>
        <button className="failure-view-button" type="button">
          Retry
        </button>
      </div>
    </div>
  )

  const renderNotFoundView = () => (
    <div className="failure-view-bg">
      <div className="failure-section">
        <img
          className="failure-image"
          src="https://res.cloudinary.com/dx8csuvrh/image/upload/c_scale,h_90/v1702227681/samples/ecommerce/warning_q9nakk.png"
          alt="failure"
        />
        <p className="failure-heading">No Movies Found</p>
        <button className="failure-view-button" type="button">
          Retry
        </button>
      </div>
    </div>
  )

  const renderTopRatedMovies = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideosView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="populars-container">
      <h2 className="popular-movies-heading">Searched Movies</h2>
      {searchMovieList.length === 0
        ? renderNotFoundView()
        : renderTopRatedMovies()}
    </div>
  )
}

export default SearchedMoviesPage
