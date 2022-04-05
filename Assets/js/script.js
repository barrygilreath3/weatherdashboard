var APIKey = 'd19c1a301d9f7f28233bbb27ec5cb0cd';
var userCityEl = document.querySelector('#userCity');
var submitEl = document.querySelector('#submit');

submitEl.addEventListener("click", function(event) {
  event.preventDefault();

  var city = userCityEl.value.trim();
  console.log(city);

  apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey+"&units=imperial";

    fetch(apiUrl)

      .then (response => response.json())
      .then (data => console.log(data))

      .catch(err => alert("Please enter a U.S. city"))

//   var displayData = function (response, data) {
//   if (repos.length === 0) {
//     repoContainerEl.textContent = 'No repositories found.';
//     return;
//   }

//   repoSearchTerm.textContent = searchTerm;

//   for (var i = 0; i < repos.length; i++) {
//     var repoName = repos[i].owner.login + '/' + repos[i].name;

//     var repoEl = document.createElement('div');
//     repoEl.classList = 'list-item flex-row justify-space-between align-center';

//     var titleEl = document.createElement('span');
//     titleEl.textContent = repoName;

//     repoEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (repos[i].open_issues_count > 0) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     repoEl.appendChild(statusEl);

//     repoContainerEl.appendChild(repoEl);
//   }
// };


});

