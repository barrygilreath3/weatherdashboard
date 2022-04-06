var APIKey = 'd19c1a301d9f7f28233bbb27ec5cb0cd';
var userCityEl = document.querySelector('#userCity');
var submitEl = document.querySelector('#submit');
var cityContainerEl = document.querySelector('#cityCard');
var fiveDay = document.querySelector('.fiveDay');
var citySearchTerm = document.querySelector('#city-search-term')
var cityTemp = document.querySelector('#city-temp');
var cityWind = document.querySelector('#city-wind');
var cityHumidity = document.querySelector('#city-humidity');
// var UVIndex = document.querySelector('#uvindex');
// var date = document.querySelector ('')


// Submit User City
var formSubmitHandler = function(event) {
  event.preventDefault();

  var city = userCityEl.value.trim();
  console.log(city);

  getCity(city);

};

submitEl.addEventListener("click", formSubmitHandler);

function getCity (city) {

  apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey+"&units=imperial";

  fetch(apiUrl)
    .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
      console.log(data);
      displayCity(data);
      return data;

      });
    } else {
      alert('Error: '+ response.statusText);
    }
  })
  .catch(function (error) {
    alert("Unable to connect to Open Weather Map");
  });
};

var displayCity = function (data) {
  if (data.name.length === 0) {
    cityContainerEl.textContent = 'No city found.  Try again.';
    return;
  }

  cityContainerEl.style.display = "block";
  fiveDay.style.display = "block";
  citySearchTerm.textContent = data.name;
  cityTemp.textContent = data.main.temp;
  cityWind.textContent = data.wind.speed;
  cityHumidity.textContent = data.main.humidity;
  // UVIndex.textcontent = 

  for (var i=0; i < 4; i++) {
    var cityName = city[i] + '/'
  }
}