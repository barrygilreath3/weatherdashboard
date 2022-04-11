var APIKey = 'd19c1a301d9f7f28233bbb27ec5cb0cd';
var userCityEl = document.querySelector('#userCity');
var today = document.querySelector("#today");
var submitEl = document.querySelector('#submit');
var cityContainerEl = document.querySelector('#cityCard');
var fiveDay = document.querySelector('.fiveDay');
var citySearchTerm = document.querySelector('#city-search-term')
var cityIcon = document.querySelector('#cityIcon');
var cityTemp = document.querySelector('#city-temp');
var cityWind = document.querySelector('#city-wind');
var cityHumidity = document.querySelector('#city-humidity');

var forecastDate = document.querySelector('.forecastDate');
var forecastTemp = document.querySelector('.forecastTemp');
var forecastWind = document.querySelector('.forecastWind');
var forecastHumidity = document.querySelector('.forecastHumidity');

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

    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+APIKey+"&units=imperial").then(function(response) {
      return response.json()
    }).then(function (results){
      console.log(results);
      var uvBtn = document.createElement("button");
      var btnColor;
      if (results.current.uvi < 3) {
        btnColor = 'success';
      }
      else if (results.current.uvi > 7) {
        btnColor = 'danger';
      }
      else {
        btnColor = 'warning';
      }
      uvBtn.setAttribute('class', 'btn btn-'+btnColor);
      uvBtn.textContent = results.current.uvi;
      var buttonBox = document.getElementById("buttonBox");
      buttonBox.appendChild(uvBtn);

      writeDates (results);

      writefiveDay(results);

    })

  let IconUrl=document.getElementById('cityIcon');
  IconUrl.setAttribute('src', 'https://openweathermap.org/img/w/'+data.weather[0].icon +'.png')
  
  citySearchTerm.textContent = data.name;
  cityTemp.textContent = data.main.temp;
  cityWind.textContent = data.wind.speed;
  cityHumidity.textContent = data.main.humidity;
}

function writeDates (results) {
  today.textContent = moment.unix(results.daily[0].dt).format("MM/DD/YYYY");
  console.log (today.textContent);

}

function writefiveDay (results) {

  forecastDate.textContent = moment.unix(results.daily[1].dt).format("MM/DD/YYYY");
  forecastTemp.textContent = results.daily[1].temp.max;
  forecastWind.textContent = results.daily[1].wind_speed;
  forecastHumidity.textContent = results.daily[1].humidity;

  // var tomorrowIcon=document.getElementById('tomorrowIcon');
  // tomorrowIcon.setAttribute('src', 'https://openweathermap.org/img/w/'+data.weather[0].icon +'.png')
  // var tomorrowIcon = document.getElementbyId('tomorrowIcon');
  // tomorrowIcon.textContent = results.daily[0].weather[0].icon;

  // tomorrowIconUrl.setAttribute('src', 'https://openweathermap.org/img/w'+results.daily[0].weather[0].icon)

}