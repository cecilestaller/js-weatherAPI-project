
fetch('https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&appid=30fdaf52b46fd3ed234661d059bf0811')
    .then(response => {
        console.log(response);
        if(response.ok === false){
            throw new Error('etwas ist schief gegangen');
        }
        return response.json();
    })
    .then(weatherData => {
        console.log(weatherData);
    })
    .catch(error => console.log(error));