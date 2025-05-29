const apiKey = '17b4b99903a6f0ffb6be643aeb60c028'; // Replace this with your actual working key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    }
});

async function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`API Error: ${response.status} - ${text}`);
        }

        const data = await response.json();
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;

    } catch (error) {
        console.error('Error fetching weather data:', error.message || error);
        locationElement.textContent = '';
        temperatureElement.textContent = '⚠️ Failed to load weather data';
        descriptionElement.textContent = '';
    }
}
