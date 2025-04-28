// Ensure the web chat is loaded from the Web Chat library
const botAppId = '1e171d0c-be4c-463f-8c96-b97f33a2bd78'; // Bot's App ID

// Function to get Direct Line token from your function app
async function getDirectLineToken() {
    try {
        const response = await fetch('https://weather-function-app-demo.azurewebsites.net/api/getDirectLineToken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.token;
        } else {
            throw new Error('Error fetching Direct Line token');
        }
    } catch (error) {
        console.error('Error fetching Direct Line token:', error);
        alert('Failed to get Direct Line token. Check console for details.');
        throw error;  // Rethrow to stop the bot from initializing
    }
}

// Function to initialize the bot
async function initBot() {
    try {
        const token = await getDirectLineToken();
        
        // Initialize the WebChat with the Direct Line token
        const botConnection = window.WebChat.createDirectLine({
            token: token
        });

        // Render the WebChat inside the div with the ID 'webchat'
        window.WebChat.renderWebChat(
            {
                directLine: botConnection
            },
            document.getElementById('webchat')
        );
    } catch (error) {
        console.error('Error initializing bot:', error);
        document.getElementById('webchat').innerHTML = 'Failed to load bot chat.';
    }
}

// Call the initBot function to load the bot
window.onload = initBot;  // Ensure this runs when the page is fully loaded

// Display current date and time
function displayDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    const formattedDate = now.toLocaleString('en-US', options);
    document.getElementById('date-time').innerHTML = `Current Date & Time: ${formattedDate}`;
}

// Call the function to display the date and time
displayDateTime();

// Handle the Get Weather button click event
document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;

    // Make an API request to your function app to get weather data
    try {
        const response = await fetch(`https://weather-function-app-demo.azurewebsites.net/api/http_trigger?city=${city}`);
        const weatherData = await response.text();
        
        // Show the weather data in the bot chat (or you can update the UI as needed)
        document.getElementById('weatherResponse').innerHTML = weatherData;
    } catch (error) {
        document.getElementById('weatherResponse').innerHTML = 'Error fetching weather data.';
        console.error('Error fetching weather data:', error);
    }
});
