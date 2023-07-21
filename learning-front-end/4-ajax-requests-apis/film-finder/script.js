const tmdbKey = 'bdd7d0b979b30eb8fd786e642481c37d';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = "/genre/movie/list";
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

    try {
        const response = await fetch(urlToFetch, {cache: 'no-cache'});
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const genres = jsonResponse.genres;
            console.log(`Genres: ${genres}`);
            return genres;
        }
    } catch (e) {
        console.log(e);
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "/discover/movie";
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

    try {
        const response = await fetch(urlToFetch, {cache: 'no-cache'});
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const movies = jsonResponse.results;
            console.log(`Movies: ${movies}`);
            return movies;
        }
    } catch (e) {
        console.log(e);
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
    console.log(`Movie path info: ${urlToFetch}`);

    try {
        const response = await fetch(urlToFetch, {cache: 'no-cache'});
        if (response.ok) {
            const movieInfo = await response.json();
            console.log(`Movie info: ${movieInfo}`);
            return movieInfo;
        }
    } catch (e) {
        console.log(e);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    };
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;