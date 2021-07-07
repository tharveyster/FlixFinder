

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
}


var flixTitleInput = document.getElementById('title-input');


var flixTitleVal = document.getElementById('title-input').value;




var flixSearchBtn = document.getElementById("submitButton")

var genreSelect = document.querySelector(".button")


var selectedGenre = document.querySelector(".button").value;



var flixPosterApi = 'http://img.omdbapi.com/?apikey=d8cda59d'

var flixInfoApi = 'http://www.omdbapi.com/?apikey=d8cda59d&t=caddyshack'

//var flixSearchParr = flixInfoApi + 'plot=full&t=' + flixTitleVal



async function getSearchResults() {

  var response = await fetch(flixInfoApi);
  var data = await response.json();
  var { Actors, Director, Genre, Rated, Runtime, Year, Plot } = data;

  document.getElementById("actors").textContent = Actors;
  document.getElementById("director").textContent = Director;
  document.getElementById("genre2").textContent = Genre;
  document.getElementById("rating").textContent = Rated;
  document.getElementById("runtime").textContent = Runtime;
  document.getElementById("year").textContent = Year;
  document.getElementById("plot").textContent = Plot;

  console.log

}

flixSearchBtn.addEventListener('click', function() {

  getSearchResults()

});