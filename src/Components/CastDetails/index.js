import './index.css'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const CastDetails = props => {
  const {id} = props
  const [castDetails, updateCastDetails] = useState(null)
  const [apiStatus, updateApiStatus] = useState(apiStatusConstants.initial)

  const pascalCaseData = obj => ({
    id: obj.id,
    cast: obj.cast.map(data => ({
      adult: data.adult,
      castId: data.cast_id,
      character: data.character,
      creditId: data.credit_id,
      gender: data.gender,
      id: data.id,
      knownForDepartment: data.known_for_department,
      name: data.name,
      order: data.order,
      originalName: data.original_name,
      popularity: data.popularity,
      profilePath: data.profile_path,
    })),
    crew: obj.crew.map(data => ({
      adult: data.adult,
      creditId: data.credit_id,
      department: data.department,
      gender: data.gender,
      id: data.id,
      job: data.job,
      knownForDepartment: data.known_for_department,
      name: data.name,
      originalName: data.original_name,
      popularity: data.popularity,
      profilePath: data.profile_path,
    })),
  })

  useEffect(() => {
    const fetchData = async () => {
      updateApiStatus(apiStatusConstants.inProgress)
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4ded5f0e0d0987b2667ec36b01b00ea0&language=en-US`
      const response = await fetch(url)
      if (response.ok) {
        const responseData = await response.json()

        const formattedData = pascalCaseData(responseData)
        // console.log(formattedData, 'cast')
        updateCastDetails(formattedData)
        updateApiStatus(apiStatusConstants.success)
      } else {
        updateApiStatus(apiStatusConstants.failure)
      }
    }
    fetchData()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="white" height="50" width="50" />
    </div>
  )

  const renderVideosView = () => (
    <ul className="movie-details-cast-list">
      {castDetails.cast.map(each => (
        <li className="movie-details-cast-item" key={each.id}>
          <img
            className="movie-cast-img"
            src={
              each.profilePath
                ? `http://image.tmdb.org/t/p/w92${each.profilePath}`
                : 'https://res.cloudinary.com/dx8csuvrh/image/upload/v1702210221/samples/ecommerce/account_profile_user_avatar_icon_219236_g1wg1d.png'
            }
            alt={each.character}
          />
          <div className="movie-cast-info">
            <h4 className="movie-cast-name">{each.originalName}</h4>
            <p className="movie-cast-character-name">{each.character}</p>
          </div>
        </li>
      ))}
    </ul>
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

  const renderCastsDetails = () => {
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

  return <div className="casts-bg-container">{renderCastsDetails()} </div>
}

export default CastDetails
