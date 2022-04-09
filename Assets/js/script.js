var APIKey = 'd19c1a301d9f7f28233bbb27ec5cb0cd';
var userCityEl = document.querySelector('#userCity');
var submitEl = document.querySelector('#submit');
var cityContainerEl = document.querySelector('#cityCard');
var fiveDay = document.querySelector('.fiveDay');
var citySearchTerm = document.querySelector('#city-search-term')
var cityIcon = document.querySelector('#cityIcon');
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

  // var buttonBox = document.getElementById('buttonBox')
  // var btn = getUV (data.coord.lat, data.coord.lon);
  // // buttonBox.append(btn);
  // console.log(btn);

    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid="+APIKey).then(function(response) {
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
    })

  let IconUrl=document.getElementById('cityIcon');
  IconUrl.setAttribute('src', 'https://openweathermap.org/img/w/'+data.weather[0].icon +'.png')
  // $('#cityIcon').attr('src', IconUrl);
  // 'https://openweathermap.org/img/w/'+data.weather[0].icon +'.png'
  


  // cityIcon.textContent = IconUrl.textContent;
  citySearchTerm.textContent = data.name;
  cityTemp.textContent = data.main.temp;
  cityWind.textContent = data.wind.speed;
  cityHumidity.textContent = data.main.humidity;
  // UVIndex.textcontent = 

  // for (var i=0; i < 4; i++) {
  //   var cityName = city[i] + '/'
  // }
}


