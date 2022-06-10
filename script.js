
// Global Constants
const apiBaseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p'
const apiKey = '64bfb1a66c698edb3631d259e0294901';

// Global Variables
var currentApiPage = 1;
var activeSearch = false;

// Page Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const closeSearchBtn = document.getElementById('close-search-btn');
const moviesSection = document.getElementById('movies-grid');
const nowPlayingMovies = document.getElementById('now-playing-movies');
const loadMoreBtn = document.getElementById('load-more-movies-btn');
const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
const searchSection = document.getElementById('search-section');
const moviesSearchResults = document.getElementById('movie-search-results');


async function loadMoviesNowPlaying() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}&page=${currentApiPage}`);
    const jsonResponse = await response.json();

    let movies = jsonResponse.results.map(result => ({
        id: result.id,
        title: result.title,
        posterPath: result.poster_path,
        voteAvg: result.vote_average,
    }))

    displayMovies(movies, nowPlayingMovies);
    loadMoreBtn.classList.remove('hidden');
    scrollToTopBtn.classList.remove('hidden');
}

async function searchMovies(searchQuery) {
    const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${searchQuery}`);
    const jsonResponse = await response.json();

    let movies = jsonResponse.results.map(result => ({
        id: result.id,
        title: result.title,
        posterPath: result.poster_path,
        voteAvg: result.vote_average,
    }))

    return movies;
}

async function selectMovie(id) {
    var response = await fetch(`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`);
    var jsonResponse = await response.json();

    const movie = {
        id: id,
        title: jsonResponse.title,
        overview: jsonResponse.overview,
        posterPath: jsonResponse.poster_path,
        backdropPath: jsonResponse.backdrop_path,
        releaseDate: jsonResponse.release_date,
        status: jsonResponse.status,
        runtime: jsonResponse.runtime,
        genres: jsonResponse.genres,
        voteAvg: jsonResponse.vote_average,
    }

    // fetch trailer
    response = await fetch(`${apiBaseUrl}/movie/${id}/videos?api_key=${apiKey}`);
    jsonResponse = await response.json();
    movie.trailerPath = jsonResponse.results[0].key;

    displayMoviePopup(movie);
}

function displayMovies(movies, htmlElement) {
    const moviesHTMLString = movies.map(movie => `
        <li class="movie-card">
            <div class="movie-card-poster" onclick="selectMovie(${movie.id})">
                <div class="movie-poster movie-poster-animation" alt="${movie.title}" title="${movie.title}" style="background-image: url(${imageBaseUrl}/w342${movie.posterPath});"></div>
            </div>
            <div class="movie-details">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-votes">${((movie.voteAvg > 7.5) ? "🔥" : ((movie.voteAvg > 6.0) ? "🙂" : "🤢"))} &nbsp ${movie.voteAvg} / 10</div>
            </div>
        </li>
    `).join('');

    htmlElement.innerHTML = htmlElement.innerHTML + moviesHTMLString;
}

function displayMoviePopup(movie) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.classList.add('fadeInBottom')

    const genres = movie.genres.slice(0, 3).map(genre => genre.name).join(', ');

    popup.innerHTML = `
        <button id="close-btn" onclick="closePopup()">Close</button>
        <article class="movie-popup">
            <img class="movie-backdrop" src="${imageBaseUrl}/original${movie.backdropPath}" alt="${movie.title}" title="${movie.title}"/>
            <section class="movie-details">
                <div class="movie-image">
                    <img class="movie-poster" src="${imageBaseUrl}/w342${movie.posterPath}" alt="${movie.title}" title="${movie.title}"/>
                </div>
                <div class="movie-info">
                    <p class="movie-genres">${genres}</p>
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-specs">${movie.runtime} min | ${movie.releaseDate}</p>
                </div>
                <div class="movie-votes">
                    <span>${((movie.voteAvg > 7.5) ? "🔥" : ((movie.voteAvg > 6.0) ? "🙂" : "🤢"))} &nbsp ${movie.voteAvg}/10</span>
                </div>
            </section>
            <p class-"movie-overview">${movie.overview}</p>
            <iframe id="ytplayer" type="text/html" width="100%" height="340px" src="https://www.youtube.com/embed/${movie.trailerPath}"></iframe>
        </article>
    `;

    document.body.appendChild(popup)
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';
}

function closePopup() {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
    popup.classList.add('fadeOutBottom');

    document.body.style.height = '';
    document.body.style.overflowY = '';
}

function loadMoreMovies() {
    currentApiPage++;
    loadMoviesNowPlaying();
}

function scrollToTop() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

function closeSearch() {
    activeSearch = false;
    moviesSection.classList.remove('hidden');
    searchSection.classList.add('hidden');
    closeSearchBtn.classList.add('hidden');
    moviesSearchResults.innerHTML = '';
    searchInput.value = '';
}

function handleSearchInputFocus(event) {
    event.preventDefault();

    if (activeSearch) {
        return;
    }

    activeSearch = true;

    moviesSection.classList.add('hidden');
    searchSection.classList.remove('hidden');
    closeSearchBtn.classList.remove('hidden');
}

async function handleSearchFormSubmit(event) {
    event.preventDefault();
    moviesSearchResults.innerHTML = '';

    const searchQuery = searchInput.value;

    // Let's ignore submit events with empty search query
    if (searchQuery.trim().length > 0) {
        moviesSearchResults.innerHTML = '';
        const searchResults = await searchMovies(searchQuery);
        displayMovies(searchResults, moviesSearchResults);
    }

    const movieResults = await searchMovies(searchQuery);

    moviesSection.classList.add('hidden');
    searchSection.classList.remove('hidden');
    closeSearchBtn.classList.remove('hidden');
}

function setupEvents() {
    searchForm.addEventListener('submit', handleSearchFormSubmit);
}

function init() {
    setupEvents();
    loadMoviesNowPlaying();
}

init();