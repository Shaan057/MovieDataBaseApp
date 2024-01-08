# Movie DataBase App

### Routes

- Popular Movies Page (Home Page)
- Top Rated Movies Page
- Upcoming Movies Page
- Single Movie Details Page
- Searched Movies Page


### List of Features

#### Global Navbar:

- Users are able to see a navbar at the top of every page.
- Users are able to see the title “movieDB” at the left side of the navbar.
- Users are able to view navigation buttons, including Popular, Top Rated, and Upcoming, in the navbar.
- Users are able to navigate to Popular (`/`), Top Rated (`/top-rated`), and Upcoming (`/upcoming`) Routes by clicking on the respective buttons.
- Users are able to see a search bar and a search button inside the navbar, where they can enter their search queries.

#### Popular Movies Page (Home Page):

- Users are able to view a grid of movie posters, arranged in multiple rows and columns, fetched from the **popular movies API**.
- Each movie poster includes an image of the movie, its name, its rating, and a `View Details` button.

#### Top Rated Movies Page:

- Users are able to view a grid of movie posters, arranged in multiple rows and columns, fetched from the **top rated movies API**.
- Each movie poster  includes an image of the movie, its name, its rating, and a `View Details` button.

#### Upcoming Movies Page:

- Users are able to view a grid of movie posters, arranged in multiple rows and columns, fetched from the **upcoming movies API**.
- Each movie poster  includes an image of the movie, its name, its rating, and a `View Details` button.

#### Single Movie Details Page:

- When users click on the `View Details` button of a specific movie poster on any movie page, it  opens a new page displaying the details of the respective movie.
- Users are able to see two sections:
  - Movie details section
  - Cast details section
- The movie details section  includes the movie's name, image, ratings, duration, genre, release date, and an overview, all of which will be fetched from the **movie details API**.
- The cast details section  displays a grid of cast members, arranged in multiple rows and columns, retrieved from the **movie cast details API**.
- Each cast member's details  includes their image, their original name, and their character name in the movie.

#### Searched Movies Page:

- The searched movies page is only displayed when a search is initiated.
- Users are able to view a grid of movie posters, arranged in multiple rows and columns, fetched from the **searched movies API**.
- Each movie poster includes an image of the movie, its name, its rating, and a `View Details` button.

### APIs

- Get popular Movies:

```api
https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1
```

- Get Top Rated Movies:

```api
https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1
```

- Get Upcoming Movies:

```api
https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1
```

- Get Single Movie Details:

```api
https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US
```

- Get Movie Cast Details:

```api
https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US
```

- Get Searched Movies:

```api
https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${MOVIE_NAME}&page=1
```

### Movie Home Page

### ![Link](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704360780/Screenshot_381_ezp7dq.png)

### Movie Details View

### ![Link](https://res.cloudinary.com/dx8csuvrh/image/upload/v1704360780/Screenshot_382_ealvyn.png)


### Preview

### [Link](https://movie-data-base-shaan.vercel.app/)
