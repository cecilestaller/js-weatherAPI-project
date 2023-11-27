// General Variables

const tempOutput = document.getElementById('tempOutput');
const cloudOutput = document.getElementById('cloudOutput');
const obtainedTimeOutput = document.getElementById('obtainedTimeOutput');
const localTimeOutput = document.getElementById('localTimeOutput');
const windOutput = document.getElementById('windOutput');
const humidityOutput = document.getElementById('humidityOutput');
const sunriseOutput = document.getElementById('sunriseOutput');
const sunsetOutput = document.getElementById('sunsetOutput');

const locationOutput = document.getElementById('locationOutput');
const weatherIcon = document.getElementById('weatherIcon');
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');

let weatherDataArr = [];
let apiKey = `https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=30fdaf52b46fd3ed234661d059bf0811`;

// durch eingabe nach ort suchen
const searchLocation = () =>
{
    let city = locationInput.value;
    fetchRequest(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=30fdaf52b46fd3ed234661d059bf0811`);
};

const fetchRequest = (apiKey) => 
{
    fetch(apiKey)
        .then(response => {
            if(response.ok === false){
                throw new Error('etwas ist schief gegangen');
            }
            return response.json();
        })
        .then(weatherData => {
            // ort als headline ausgeben
            let cityName = weatherData.name;
            let country = weatherData.sys.country;
            locationOutput.textContent = `Weather in ${cityName}, ${country}`;
            
            // wetter icons dynamisch anzeigen
            let iconName = weatherData.weather[0].icon;
            let weatherDesc = weatherData.weather[0].description;
            weatherIcon.setAttribute('src', `./assets/img/${iconName}.svg`);
            weatherIcon.setAttribute('alt', `animated icon: ${weatherDesc}`);
    
            // Werte aus weatherData(Array) in variablen speichern
            let temperature = `${Math.round(weatherData.main.temp - 273.15)}°C`;
            let cloudDescription = weatherData.weather[0].description;
            let obtainDate = new Date();
            let userTimeDiff = obtainDate.getTimezoneOffset() / 60;
            let obtainedDateString = obtainDate.toLocaleString();

            // Function für AM or PM (der local Time) bestimmen:
            // + Local Time dynamisch bestimmen lassen anhand timezone
            let time = new Date();
            let currentHour = time.getHours();
            let localMinutesNum = time.getMinutes();
            let localMinutes = localMinutesNum.toString().padStart(2, "0");
            let timeZone = (weatherData.timezone) / 3600; // + errechnet UTC timestamp
            let localHourNum = Math.abs(currentHour + timeZone + userTimeDiff);
            let localHour = localHourNum.toString().padStart(2, "0");
            let localTime = `${localHour}:${localMinutes}`;
            let amOrPmOutput = "";
        
        const amOrPm = () => {
            if(localHour < '12'){
                return amOrPmOutput = "AM";
            } else {
                return amOrPmOutput = "PM";
            }
        }
        amOrPm();

        let wind = `speed: ${weatherData.wind.speed} m/s`;
        let humidity = `${weatherData.main.humidity} %`;

        // Bearbeitung der sunrise / sunset daten
        let sunriseCurrentTime = new Date((weatherData.sys.sunrise) * 1000);
        let sunriseLocalHourNum = (sunriseCurrentTime.getHours()) + userTimeDiff + timeZone;
        let sunriseLocalHour = sunriseLocalHourNum.toString().padStart(2, "0");
        let sunriseLocalMinuteNum = sunriseCurrentTime.getMinutes();
        let sunriseLocalMinute = sunriseLocalMinuteNum.toString().padStart(2, "0");
        let sunriseTime = `${sunriseLocalHour}:${sunriseLocalMinute} AM`;
        let sunsetCurrentTime = new Date((weatherData.sys.sunset) * 1000);
        let sunsetLocalHourNum = Math.abs(sunsetCurrentTime.getHours() + userTimeDiff + timeZone);
        let sunsetLocalHour = sunsetLocalHourNum.toString().padStart(2, "0");
        let sunsetLocalMinuteNum = sunsetCurrentTime.getMinutes();
        let sunsetLocalMinute = sunsetLocalMinuteNum.toString().padStart(2, "0");
        let sunsetTime = `${sunsetLocalHour}:${sunsetLocalMinute} PM`;

        // Text content definieren
        tempOutput.textContent = temperature;
        cloudOutput.textContent = cloudDescription;
        obtainedTimeOutput.textContent = `Obtained at ${obtainedDateString}`;
        localTimeOutput.textContent = `${localTime} ${amOrPmOutput}`;
        windOutput.textContent = wind;
        humidityOutput.textContent = humidity;
        sunriseOutput.textContent = sunriseTime;
        sunsetOutput.textContent = sunsetTime;
    })
    .catch(error => console.log(error));
}
fetchRequest(apiKey);