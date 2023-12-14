import './index.css'

import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
// import {intervalToDuration, format} from 'date-fns'
import CastDetails from '../CastDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const MovieDetails = props => {
  const {innerWidth} = window
  const {match} = props
  const {params} = match
  const {id} = params
  const [movieDetails, updateMovieDetails] = useState(null)
  const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial)

  const pascalCaseData = data => ({
    adult: data.adult,
    backdropPath: data.backdrop_path,
    belongsToCollection: data.belongs_to_collection,
    budget: data.budget,
    genres: data.genres,
    homePage: data.homepage,
    id: data.id,
    imdbId: data.imdb_id,
    originalLanguage: data.original_language,
    originalTitle: data.original_title,
    overview: data.overview,
    popularity: data.popularity,
    posterPath: data.poster_path,
    productionCompanies: data.production_companies.map(each => ({
      id: each.id,
      logoPath: each.logo_path,
      name: each.name,
      originCountry: each.origin_country,
    })),
    productionCountries: data.production_countries,
    releaseDate: data.release_date,
    revenue: data.revenue,
    runtime: data.runtime,
    spokenLanguages: data.spoken_languages.map(each => ({
      englishName: each.english_name,
      iso_639_1: each.iso_639_1,
      name: each.name,
    })),
    status: data.status,
    tagline: data.tagline,
    title: data.title,
    video: data.video,
    voteAverage: data.vote_average,
    voteCount: data.vote_count,
  })

  useEffect(() => {
    const fetchData = async () => {
      updateApiStatus(apiStatusConstants.inProgress)
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=4ded5f0e0d0987b2667ec36b01b00ea0&language=en-US`

      const response = await fetch(url)
      if (response.ok) {
        const responseData = await response.json()

        const formattedData = pascalCaseData(responseData)

        updateMovieDetails(formattedData)
        updateApiStatus(apiStatusConstants.success)
      } else {
        updateApiStatus(apiStatusConstants.failure)
      }
    }
    fetchData()
  }, [])
  //   console.log(movieDetails)
  //   console.log(apiStatus)
  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="white" height="50" width="50" />
    </div>
  )

  const renderVideosView = () => {
    const {
      title,
      posterPath,
      backdropPath,
      voteAverage,
      runtime,
      releaseDate,
      genres,
      overview,
    } = movieDetails
    // const date = new Date(releaseDate)
    // const formattedDate = format(date, 'dd/MM/yyyy')
    // const duration = intervalToDuration({start: 0, end: runtime * 1000})

    // const zeroPad = num => String(num).padStart(2, '0')
    // const formattedTime = `${duration.minutes}h ${zeroPad(duration.seconds)}m`
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const formattedTime = `${hours}h ${minutes}m`
    const backDropUrl =
      innerWidth <= 768
        ? `https://image.tmdb.org/t/p/w300${backdropPath}`
        : `https://image.tmdb.org/t/p/w1280${backdropPath}`
    const posterUrl =
      innerWidth <= 768
        ? `https://image.tmdb.org/t/p/w185${posterPath}`
        : `https://image.tmdb.org/t/p/w300${posterPath}`
    const style = {
      backgroundImage: `url(${backDropUrl})`,
    }

    return (
      <>
        <div style={style} className="movie-details-container-main">
          <div className="movie-info-container">
            <img
              className="movie-details-movie-poster"
              src={posterUrl}
              alt={title}
            />
            <div className="movie-details-container">
              <h2 className="movie-details-movie-title">{title}</h2>
              <p className="movie-details-ratings">Rating : {voteAverage}</p>
              <p className="">Duration : {formattedTime}</p>
              {/* <p>Genre</p> */}
              <ul className="movie-details-genre-list">
                {genres.map(each => (
                  <li className="movie-details-genre-list-item" key={each.id}>
                    {each.name}
                  </li>
                ))}
              </ul>
              <p className="movie-details-release-date">
                Release : {releaseDate}
              </p>
              <p className="movie-details-overview">{overview}</p>
            </div>
          </div>
        </div>
        <h3 className="movie-details-cast-heading">Cast</h3>
        <CastDetails id={id} />
      </>
    )
  }

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

  const renderMovieDetails = () => {
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
    <div className="movie-details-bg-container">{renderMovieDetails()}</div>
  )
}

export default MovieDetails
