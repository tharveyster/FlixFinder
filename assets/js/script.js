/*
// Youtube video code  

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'M7lc1UVf-VE',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}*/

var flixTitleInput = document.getElementById('title-input');
var flixTitleVal;
var flixSearchBtn = document.getElementById("submitButton")
var genreSelect = document.querySelector(".button")
var selectedGenre = document.querySelector(".button").value;

var flixPosterApi = 'https://img.omdbapi.com/?apikey=d8cda59d'
var flixInfoApi = 'https://www.omdbapi.com/?apikey=d8cda59d&'
var flixSearchParr;
var imdbId;

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
  document.getElementById("rotten-tomatoes-score").textContent = Ratings[1].Value || '';
  document.getElementById("imdb-score").textContent = imdbRating;
  document.getElementById('poster').setAttribute('src',Poster);
  imdbId = data.imdbID;
  getRecommendations();
}

async function getTrailer() {
  var trailerApi = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=';
  var trailerApiKey= ' trailer&key= AIzaSyCOS_weDpnl3iKcueqHEqF-ug255aj6x_4';

  var trailerUrl = trailerApi + flixTitleVal + trailerApiKey;
  var response = await fetch(trailerUrl);
  var data = await response.json();
  var trailer = data.items[0].id.videoId;
  var youtubeUrl = "https://www.youtube.com/embed/" + trailer;
  document.getElementById("trailer").setAttribute('src',youtubeUrl);
}

async function getRecommendations() {
  var tmdbUrl = 'https://api.themoviedb.org/3/movie/';
  var tmdbApiKey = '/similar?api_key=80f80a0f6ffe632acbbd9becc8c87009&language=en-US&page=1';
  var tmdbApiUrl = tmdbUrl + imdbId + tmdbApiKey;
  var response = await fetch(tmdbApiUrl);
  var data = await response.json();
  console.log(data);
  var similarFlix = [];
  var recommendedFlix = document.querySelector('#recommendedFlix');
  recommendedFlix.textContent = '';
  var similarFlixTitle = document.createElement('h3');
  similarFlixTitle.classList.add("simFlixTitle");
  similarFlixTitle.textContent = "Similar Flix";
  recommendedFlix.append(similarFlixTitle);
  for (var i = 0; i < 3; i++) {
    similarFlix[i] = data.results[i].original_title;
    console.log(similarFlix[i]);
    var similarFlixList = document.createElement('h6');
    similarFlixList.textContent = similarFlix[i];
    recommendedFlix.append(similarFlixList);
  }

}

flixSearchBtn.addEventListener('click', function() {
  flixTitleVal = document.getElementById('title-input').value;
  window.encodeURIComponent(flixTitleVal);
  getSearchResults();
  getTrailer();
});