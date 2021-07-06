var flixTitleInput = document.getElementById('flix-input');
    
var flixTitleVal = document.getElementById('flix-input').value;

var flixSearchBtn = document.getElementById("submitButton")

var genreSelect = document.getElementById("dropDownButton")

var selectedGenre = document.getElementById("dropDownButton").value;


var flixPosterApi = 'http://img.omdbapi.com/?apikey=d8cda59d'

var flixInfoApi = 'http://www.omdbapi.com/?apikey=d8cda59d&t=caddyshack'

var flixSearchParr = flixInfoApi + 'plot=full&t=' + flixTitleVal
   
   
   
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

    
   }

   getSearchResults();





















