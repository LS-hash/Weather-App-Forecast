function formatDate(dateElement) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[dayIndex];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "2f9c8d39bd6adfa3a3248039e1c25517";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let dateElement = document.querySelector("#date");
let currentTime = new Date();

console.log(formatDate);
dateElement.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  console.log(response.data);
  let temperatureDiv = document.querySelector("#weather");
  let temperature = Math.round(response.data.main.temp);
  let temperatureDescription = response.data.weather[0].description;
  let degreesDiv = document.querySelector("#degrees");
  let humidityDiv = document.querySelector("#humidity");
  let humidityDescription = response.data.main.humidity;
  let pressureDiv = document.querySelector("#pressure");
  let pressureDescription = response.data.main.pressure;
  let iconElement = document.querySelector("#icon");

  temperatureDiv.innerHTML = `It is ${temperature} degrees, ${temperatureDescription}, in ${response.data.name}`;
  humidityDiv.innerHTML = `Humidity: ${humidityDescription}`;
  pressureDiv.innerHTML = `Air pressure: ${pressureDescription}`;
  degreesDiv.innerHTML = `${temperature}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showYourweather(response) {
  let yourWeather = document.querySelector("#yourPositionsWeather");
  let temperature = Math.round(response.data.main.temp);
  yourWeather.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showYourweather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
