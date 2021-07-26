const APIkey = "c137c5b4783c30d1997207a8d897dc55";

const weatherIcon = document.querySelector('#jsWeatherIcon');
const temperature = document.querySelector('#jsTemper');
const comment = document.querySelector('#jsComment');
const locationText = document.querySelector('#jsLocation');

const weatherIconList = ['','sunny','partly-sunny']; 

function getWeather(coords){
    const APILink = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${APIkey}&lang=kr&units=metric`;
    console.log(coords);
    console.log(APILink);
    fetch(APILink)
        .then(response => response.json())
        .then(json => {
            const name = json.name;
            const temperNow = json.main.temp;
            let iconID = json.weather[0].icon;
            iconID = parseInt(iconID.substring(0,iconID.length - 1));
            locationText.innerHTML = name;
            temperature.innerHTML = temperNow + 'º';
            weatherIcon.name = weatherIconList[iconID];
        })
}

function successGetPosition(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coords = [lat,lon];
    localStorage.setItem('coords',JSON.stringify(coords));
    getWeather(coords);
}
function errorGetPosition(){
    console.log('Fail to load');
}

function loadWeather(){
    const CurCoords = localStorage.getItem('coords');
    if(CurCoords === null){
        navigator.geolocation.getCurrentPosition(successGetPosition,errorGetPosition);
    } else {
        const coords = JSON.parse(CurCoords);
        getWeather(coords);
    }
}

loadWeather();