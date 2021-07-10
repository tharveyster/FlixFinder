var flixTitleInput = document.getElementById('title-input');
var flixTitleVal = "step brothers";
var flixSearchBtn = document.getElementById("submitButton")
var genreSelect = document.querySelector(".button")
var selectedGenre = document.querySelector(".button").value;
var flixPosterApi = 'https://img.omdbapi.com/?apikey=d8cda59d'
var flixInfoApi = 'https://www.omdbapi.com/?apikey=d8cda59d&'
var flixSearchParr;
var imdbId;
var introEl = document.querySelector(".card-intro");
var movieEl = document.querySelector(".hide");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var searchHistoryEl = document.querySelector("#searchHistory");

// Search the OMDB API for an item that matches the search term
async function getSearchResults() {
  flixSearchParr = flixInfoApi + 'plot=full&t=' + flixTitleVal
  var response = await fetch(flixSearchParr);
  var data = await response.json();
  var { Title, Actors, Director, Genre, Rated, Runtime, Year, Plot, Ratings, imdbRating, Poster } = data;
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
  searchHistory.push(flixTitleVal);
  localStorage.setItem("search",JSON.stringify(searchHistory));
}

// Get a trailer clip of the searched item from the YOUTUBE API
async function getTrailer() {
  var trailerApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=';
  var trailerApiKey= ' trailer&key=AIzaSyA6arsyQ3x1bHTwPi6zovNf2UMhMje22ew'
  var trailerUrl = trailerApi + flixTitleVal + trailerApiKey;
  var response = await fetch(trailerUrl);
  var data = await response.json();
  var trailer = data.items[0].id.videoId;
  var youtubeUrl = "https://www.youtube.com/embed/" + trailer;
  document.getElementById("trailer").setAttribute('src',youtubeUrl);
}

// Get a list of 3 items that are similar to the searched item from the TMDB API
async function getRecommendations() {
  var tmdbUrl = 'https://api.themoviedb.org/3/movie/';
  var tmdbApiKey = '/similar?api_key=80f80a0f6ffe632acbbd9becc8c87009&language=en-US&page=1';
  var tmdbApiUrl = tmdbUrl + imdbId + tmdbApiKey;
  var response = await fetch(tmdbApiUrl);
  var recommendedFlix = document.querySelector('#similarFlix');
  if (response.ok) {
    var data = await response.json();
    var similarFlix = [];
    recommendedFlix.textContent = '';
    var similarFlixTitle = document.createElement('h3');
    similarFlixTitle.classList.add("simFlixTitle");
    similarFlixTitle.classList.add("has-text-danger");
    similarFlixTitle.textContent = "Similar Flix";
    recommendedFlix.append(similarFlixTitle);
    for (var i = 0; i < 3; i++) {
      similarFlix[i] = data.results[i].original_title;
      var similarFlixList = document.createElement('h6');
      similarFlixList.textContent = similarFlix[i].toUpperCase();
      recommendedFlix.append(similarFlixList);
    }
  } else {
    recommendedFlix.textContent = '';
    var similarFlixTitle = document.createElement('h3');
    similarFlixTitle.classList.add("simFlixTitle");
    similarFlixTitle.classList.add("has-text-danger");
    similarFlixTitle.textContent = "Similar Flix";
    recommendedFlix.append(similarFlixTitle);
    var similarFlixList = document.createElement('h6');
    similarFlixList.textContent = "No similar Flix found!"
    recommendedFlix.append(similarFlixList);
  }
}

function getSearchHistory() {
  searchHistoryEl.textContent = '';
  var searchHistoryTitle = document.createElement('h3');
  searchHistoryTitle.classList.add("simFlixTitle");
  searchHistoryTitle.classList.add("has-text-danger");
  searchHistoryTitle.textContent = "Search History";
  searchHistoryEl.append(searchHistoryTitle);
  for (var i = 0; i < searchHistory.length; i++) {
    var searchHistoryList = document.createElement('h6');
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
  getSearchHistory();
});