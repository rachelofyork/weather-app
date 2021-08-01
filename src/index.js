//Light/Dark Themes

function lightTheme(event){
  event.preventDefault();
 
document.getElementById('weather-app').style.background =  '#c4ffdd'
 document.getElementById('weather-app').style.color = 'black'
  document.getElementById('celsius-link').style.color = 'black'
  document.getElementById('fahrenheit-link').style.color = 'black'
  document.getElementById('search-button').style.background = '#5e63b6'
  document.getElementById('search-button').style.color = 'white'
  document.getElementById('current-location').style.background = '#e471a7'
  document.getElementById('current-location').style.background = '#e471a7'
};
 let lightButton = document.querySelector("#light-theme-button")
 lightButton.addEventListener("click", lightTheme)


function darkTheme(event) {
  event.preventDefault();

  document.getElementById('weather-app').style.background = '#303030'
  document.getElementById('weather-app').style.color = 'white'
  document.getElementById('celsius-link').style.color = 'white'
  document.getElementById('fahrenheit-link').style.color = 'white'
  document.getElementById('search-button').style.background = '#3b0944'
  document.getElementById('current-location').style.background = '#b30c7b'
  document.getElementById('dark-theme-button').style.background = 'black'
  document.getElementById('dark-theme-button').style.color = 'white'

  
};
  

//Date and Time

 let darkButton = document.querySelector("#dark-theme-button")
 darkButton.addEventListener("click", darkTheme)


let now = new Date();
let date = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day} ${hour}:${minutes}`;

//Weather Search Engine

function search(inputCity) {
  let apiKey = "ff8c3d30b19a1ec2572571f024a657bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#inputCity").value;
  search(inputCity);
}

function displayTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#weather").innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;


celsiusTemperature = response.data.main.temp;

  let icon = document.querySelector("#icon")
icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description)
}

function displayTemperatureFromLocation(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let icon = document.querySelector("#icon")

  celsiusTemperature = response.data.main.temp;

icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description)
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);



function showLocationTemperature(position) {
  let apiKey = "ff8c3d30b19a1ec2572571f024a657bd";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(displayTemperatureFromLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocationTemperature);

}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);


//Unit conversion

function displayFahrenheit(event) {
  event.preventDefault();
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
 let temperature = document.querySelector("#temperature")
 temperature.innerHTML = Math.round(fahrenheitTemperature)
 fahrenheitLink.classList.remove("active");
 celsiusLink.classList.add("active");
}

function displayCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);








search("London");