//Light/Dark Themes

function lightTheme(event){
  event.preventDefault();
 
document.getElementById('weather-app').style.background =  'linear-gradient(68.6deg, rgb(252, 165, 241) 1.8%, rgb(181, 255, 255) 100.5%)';
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

  document.getElementById('weather-app').style.background = 'linear-gradient(177.9deg, rgb(58, 62, 88) 3.6%, rgb(119, 127, 148) 105.8%)'
  document.getElementById('weather-app').style.color = 'white'
  document.getElementById('celsius-link').style.color = 'white'
  document.getElementById('fahrenheit-link').style.color = 'white'
  document.getElementById('search-button').style.background = '#3b0944'
  document.getElementById('current-location').style.background = '#b30c7b'
  document.getElementById('dark-theme-button').style.background = 'black'
  document.getElementById('dark-theme-button').style.color = 'white'

  
};
  
 let darkButton = document.querySelector("#dark-theme-button")
 darkButton.addEventListener("click", darkTheme)

//Date and Time


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
  )}mph`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;


celsiusTemperature = response.data.main.temp;

  let icon = document.querySelector("#icon")
icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord)
};





function displayTemperatureFromLocation(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}mph`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let icon = document.querySelector("#icon")

  celsiusTemperature = response.data.main.temp;

icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description)
getForecast(response.data.coord)
}


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

  getForecast (response.data.coord);
}


let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);


let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

//Forecast Section

function displayForecast(response) {
  let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast")

let forecastHTML = ` <div class = "row">`;

forecast.slice(1).forEach(function(forecastDay, index) {
  if (index < 6)
forecastHTML =  forecastHTML + ` 
        
          <div class = "col-2">
          <div class = "forecast-date" id = "forecast-date">${formatDay(forecastDay.dt)}</div>
            <div><img
              src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
              alt="Overcast"
              class="smallWeatherIcons"
              id = "small-weather-icons"></div>
              <div class = forecast-temperatures> <span class = "max-temperature" id = "max-temperature">${Math.round(forecastDay.temp.max)}??</span> 
                <span class = "min-temperature" id = "min-temperature">${Math.round(forecastDay.temp.min)}??</span></div>

          
      
        </div> `;

      
});



forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates){
  console.log(coordinates);
   let apiKey = "ff8c3d30b19a1ec2572571f024a657bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

  return days[day];

}



search("London");
displayForecast();