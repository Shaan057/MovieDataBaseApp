import './index.css'

import {Link} from 'react-router-dom'

const UpcomingMoviesListItem = props => {
  const {data} = props
  const {posterPath, id, title, voteAverage} = data
  const imgUrl = `http://image.tmdb.org/t/p/w342${posterPath}`
  //   const imgUrl = posterPath
  //     ? `http://image.tmdb.org/t/p/w342${posterPath}`
  //     : 'http://res.cloudinary.com/dx8csuvrh/image/upload/c_scale,h_513,w_342/v1702224898/samples/ecommerce/HD-wallpaper-pitch-black-dark-phone-plain-solid-thumbnail_brq6us.jpg'
  return (
    <li className="popular-movie-item">
      <div className="popular-movie-img-container">
        <img className="popular-movie-poster" src={imgUrl} alt={title} />
      </div>
      <div className="popular-movie-details">
        <div className="popular-movie-title-container">
          <h3 className="popular-movie-title">{title}</h3>
        </div>
        <div className="popular-movies-ratings-details">
          <p className="popular-movie-rating">{voteAverage}</p>
          <Link to={`/movie/${id}`}>
            <button className="popular-movie-view-details-button" type="button">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </li>
  )
}

export default UpcomingMoviesListItem
