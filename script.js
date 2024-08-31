const apiKey = '2af7cc6393ce026b840f3bdde502dbc4'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = 'Loading...';

    try {
        // Fetch coordinates from the location input
        const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            weatherDiv.innerHTML = 'Location not found';
            return;
        }

        const { lat, lon } = geoData[0];

        // Fetch weather data using the coordinates
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            weatherDiv.innerHTML = 'Weather data not found';
            return;
        }

        const { main, weather } = weatherData;

        weatherDiv.innerHTML = `
            <h2>Weather in ${location}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Conditions: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherDiv.innerHTML = 'Error fetching weather data';
    }
}
