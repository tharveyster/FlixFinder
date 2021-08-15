const flixTitleInput = document.getElementById('title-input');
let flixTitleVal = "";
const flixSearchBtn = document.getElementById("submitButton")
let imdbId;
const searchHistory = JSON.parse(localStorage.getItem("flixSearch")) || [];

// Search the OMDB API for an item that matches the search term
const getSearchResults = async () => {
  const flixInfoApi = 'https://www.omdbapi.com/?apikey=d8cda59d&'
  const introEl = document.querySelector(".card-intro");
  const movieEl = document.querySelector(".hide");
  let flixSearchParr = flixInfoApi + 'plot=full&t=' + flixTitleVal
  let response = await fetch(flixSearchParr);
  let data = await response.json();
  const { Title, Actors, Director, Genre, Rated, Runtime, Year, Plot, Ratings, imdbRating, Poster } = data;
  document.getElementById("flix-title").textContent = Title;
  document.getElementById("actors").textContent = Actors;
  document.getElementById("director").textContent = Director;
  document.getElementById("genre2").textContent = Genre;
  document.getElementById("rating").textContent = Rated;
  document.getElementById("runtime").textContent = Runtime;
  document.getElementById("year").textContent = Year;
  document.getElementById("plot").textContent = Plot;
  if (Ratings[1]) {
    document.getElementById("rotten-tomatoes-score").textContent = Ratings[1].Value;
  } else {
    document.getElementById("rotten-tomatoes-score").textContent = '';
  }
  document.getElementById("imdb-score").textContent = imdbRating;
  document.getElementById('poster').setAttribute('src',Poster);
  imdbId = data.imdbID;
  getRecommendations();
  introEl.style.display = "none";
  movieEl.style.display = "block";
  if (searchHistory.length === 5) {
    searchHistory.shift();
  }
  if (!searchHistory.includes(flixTitleVal)) {
    searchHistory.push(flixTitleVal);
    localStorage.setItem("flixSearch",JSON.stringify(searchHistory));
  }
  getSearchHistory();
}

// Get a trailer clip of the searched item from the YOUTUBE API
const getTrailer = async () => {
  const trailerApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=';
  const trailerApiKey= ' trailer&key=AIzaSyAVo5crd8w8kPuBz_Sq_ebY9N9JoogNUOM'
  const trailerUrl = trailerApi + flixTitleVal + trailerApiKey;
  let response = await fetch(trailerUrl);
  let data = await response.json();
  let trailer = data.items[0].id.videoId;
  const youtubeUrl = "https://www.youtube.com/embed/" + trailer;
  document.getElementById("trailer").setAttribute('src',youtubeUrl);
}

// Get a list of 3 items that are similar to the searched item from the TMDB API
const getRecommendations = async () => {
  const tmdbUrl = 'https://api.themoviedb.org/3/movie/';
  const tmdbApiKey = '/similar?api_key=80f80a0f6ffe632acbbd9becc8c87009&language=en-US&page=1';
  const tmdbApiUrl = tmdbUrl + imdbId + tmdbApiKey;
  let response = await fetch(tmdbApiUrl);
  const recommendedFlix = document.querySelector('#similarFlix');
  if (response.ok) {
    let data = await response.json();
    let similarFlix = [];
    recommendedFlix.textContent = '';
    const similarFlixTitle = document.createElement('h3');
    similarFlixTitle.classList.add("simFlixTitle");
    similarFlixTitle.classList.add("has-text-danger");
    similarFlixTitle.textContent = "Similar Flix";
    recommendedFlix.append(similarFlixTitle);
    for (let i = 0; i < 3; i++) {
      similarFlix[i] = data.results[i].original_title;
      const similarFlixList = document.createElement('h6');
      similarFlixList.textContent = similarFlix[i].toUpperCase();
      recommendedFlix.append(similarFlixList);
    }
  } else {
    recommendedFlix.textContent = '';
    const similarFlixTitle = document.createElement('h3');
    similarFlixTitle.classList.add("simFlixTitle");
    similarFlixTitle.classList.add("has-text-danger");
    similarFlixTitle.textContent = "Similar Flix";
    recommendedFlix.append(similarFlixTitle);
    const similarFlixList = document.createElement('h6');
    similarFlixList.textContent = "No similar Flix found!"
    recommendedFlix.append(similarFlixList);
  }
}

const getSearchHistory = () => {
  const searchHistoryEl = document.querySelector("#searchHistory");
  searchHistoryEl.textContent = '';
  const searchHistoryTitle = document.createElement('h3');
  searchHistoryTitle.classList.add("simFlixTitle");
  searchHistoryTitle.classList.add("has-text-danger");
  searchHistoryTitle.textContent = "Search History";
  searchHistoryEl.append(searchHistoryTitle);
  for (let i = 0; i < searchHistory.length; i++) {
    const searchHistoryList = document.createElement('h6');
    searchHistoryList.textContent = searchHistory[i].toUpperCase();
    searchHistoryEl.append(searchHistoryList);
  }
}

// Event listener for search button
flixSearchBtn.addEventListener('click', function() {
  flixTitleVal = document.getElementById('title-input').value;
  if (flixTitleVal === '') {
    alert('You must enter a movie title');
    return;
  }
  window.encodeURIComponent(flixTitleVal);
  getSearchResults();
  getTrailer();
  flixTitleInput.value = '';
});