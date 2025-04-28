document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;

    try {
        const response = await fetch(`https://weather-function-app-demo.azurewebsites.net/api/http_trigger?city=${city}`);
        const weather = await response.text();
        document.getElementById('weather-info').innerText = weather;
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-info').innerText = 'Error fetching weather data.';
    }
});
