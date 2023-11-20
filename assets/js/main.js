// General Variables

const tempOutput = document.getElementById('tempOutput');
const cloudOutput = document.getElementById('cloudOutput');
const obtainedTimeOutput = document.getElementById('obtainedTimeOutput');
const localTimeOutput = document.getElementById('localTimeOutput');
const windOutput = document.getElementById('windOutput');
const humidityOutput = document.getElementById('humidityOutput');
const sunriseOutput = document.getElementById('sunriseOutput');
const sunsetOutput = document.getElementById('sunsetOutput');
// console.log(sunsetOutput);

let weatherDataArr = [];
let city = "london";


fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30fdaf52b46fd3ed234661d059bf0811`)
    .then(response => {
        console.log(response);
        if(response.ok === false){
            throw new Error('etwas ist schief gegangen');
        }
        return response.json();
    })
    .then(weatherData => {
        console.log(weatherData);

        // Werte aus weatherData(Array) in variablen speichern
        let temperature = `${Math.round((weatherData.main.temp) / 32)}°C`;
        let cloudDescription = weatherData.weather[0].description;
        let currentTime = new Date();
        let currentLocalTime = currentTime.toLocaleString();
        let time = new Date();
        let londonLocaleTime = time.toLocaleTimeString('en-GB', { timeZone: 'Europe/London' });
        let wind = `speed: ${weatherData.wind.speed} m/s`;
        let humidity = `${weatherData.main.humidity} %`;
        let sunriseTime = `${new Date((weatherData.sys.sunrise) * 1000).toLocaleTimeString('en-GB', { timeZone: 'Europe/London' })} AM`;
        let sunsetTime = `${new Date((weatherData.sys.sunset) * 1000).toLocaleTimeString('en-GB', { timeZone: 'Europe/London' })} PM`;

        // Text content definieren
        tempOutput.textContent = temperature;
        cloudOutput.textContent = cloudDescription;
        obtainedTimeOutput.textContent = `Obtained at ${currentLocalTime}`;
        localTimeOutput.textContent = londonLocaleTime;
        windOutput.textContent = wind;
        humidityOutput.textContent = humidity;
        sunriseOutput.textContent = sunriseTime;
        sunsetOutput.textContent = sunsetTime;
        
    })
    .catch(error => console.log(error));


