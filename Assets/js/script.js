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
var historyCard = document.querySelector('#historycard')
var cityStorage = localStorage.getItem("#userCity");
var cityBtn = document.querySelector('.cityBtn')

var forecastDate = document.querySelector('.forecastDate');
var forecastTemp = document.querySelector('.forecastTemp');
var forecastWind = document.querySelector('.forecastWind');
var forecastHumidity = document.querySelector('.forecastHumidity');
var cityHistory = JSON.parse(localStorage.getItem("userCity")) || [];

// var UVIndex = document.querySelector('#uvindex');
// var date = document.querySelector ('')

// Submit User City
var formSubmitHandler = function(event) {
  event.preventDefault();

  var city = userCityEl.value.trim();

  // cityBtn.textContent = city;
  cityHistory.push(city)

  var historyCard = document.getElementById('historycard');

  for (var i = 0; i < cityHistory.length; i++) {
    var cityBtn = document.createElement('button');
    cityBtn.textContent = cityHistory[i];
    cityBtn.setAttribute ('class', 'btn cityBtn');
    cityBtn.setAttribute ('type', 'submit');
    cityBtn.setAttribute ('value', cityHistory[i]);
    cityBtn.onclick = function() {
    historySearch(this.value);

    }
    historyCard.appendChild(cityBtn);
  }

  localStorage.setItem("userCity", JSON.stringify(cityHistory));

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
  historyCard.style.display = "block";

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
      buttonBox.innerHTML = ""
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

var tomorrowIcon=document.getElementById('tomorrowIcon');

function writefiveDay (results) {
  console.log (results.daily);

  var fiveDayForecast = document.getElementById('fiveDayForecast');

  for (var i=1; i < 6; i++) {
    console.log (results.daily[i]);

    var fiveDayCard = document.createElement("div");
    console.log(fiveDayCard);
    fiveDayCard.setAttribute('class', 'fiveDayCard');

    var forecastDate = document.createElement('p');
    forecastDate.textContent = moment.unix(results.daily[i].dt).format("MM/DD/YYYY");
    
    var forecastTemp = document.createElement('p');
    forecastTemp.textContent = "Temp:  "+results.daily[i].temp.max + String.fromCharCode(176);

    var forecastWind = document.createElement('p');
    forecastWind.textContent = "Wind:  "+ results.daily[i].wind_speed+' mph';

    var forecastHumidity = document.createElement('p');
    forecastHumidity.textContent = "Humidity:  " + results.daily[i].humidity+'%';

    var tomorrowIcon = document.createElement('img');
    tomorrowIcon.setAttribute('src', "https://openweathermap.org/img/wn/" + results.daily[i].weather[0].icon +".png");

    forecastDate.appendChild(tomorrowIcon);
    fiveDayCard.appendChild(forecastDate);
    fiveDayCard.appendChild(forecastTemp);
    fiveDayCard.appendChild(forecastWind);
    fiveDayCard.appendChild(forecastHumidity);

    fiveDayForecast.appendChild(fiveDayCard);

  }

}



// cityBtn.addEventListener("click", historySearch("boston"));

function historySearch (cityBtn) {
  console.log(cityBtn);
   
  apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityBtn+"&appid="+APIKey+"&units=imperial";
  
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