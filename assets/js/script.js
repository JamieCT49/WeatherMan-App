const apiKey = 'f60b90ef04a5c9990ea1033710477267';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    const cityName = cityInput.value.trim();
    if (cityName) {
        fetchWeather(cityName);
    }
});

function fetchWeather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            return fetchForecast(data.coord.lat, data.coord.lon);
        })
        .then(forecastData => displayForecast(forecastData))
        .catch(error => console.error('Error', error));
}

// It says this is unaurthorized and i don't understand why.
function fetchForecast(lat, lon) {
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => data.daily.slice(1, 6));
}
function displayCurrentWeather(data) {
    const { name, main, wind} = data;

    currentWeather.innerHTML = `
    <h2>${name}</h2>
    <p>${new Date().toDateString()}</p>
    <p>Temperature: ${main.temp}C</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Wind Speed: ${wind.speed}m/s</p>
    `;
}

// function displayForecast(forecastData) {
//     forecast.innerHTML = '<h2>5-Day Forecast:</h2>';
//     forecastData.forEach(day => {
//         const date = new Date(day.dt * 1000).toDateString();
//         const forecastItem = document.createElement('div');
//         forecastItem.classList.add('forecast-item');
//         forecastItem.innerHTML = `
//           <p>${date}</p>
//           <p>Temperature: ${day.temp.day}°C</p>
//           <p>Humidity: ${day.humidity}%</p>
//           <p>Wind Speed: ${day.wind_speed} m/s</p>
//         `;
//         forecast.appendChild(forecastItem);
//     });
// }
