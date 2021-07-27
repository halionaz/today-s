const APIkey = "c137c5b4783c30d1997207a8d897dc55";

const weatherIcon = document.querySelector('#jsWeatherIcon');
const temperature = document.querySelector('#jsTemper');
const description = document.querySelector('#jsDescription');
const comment = document.querySelector('#jsComment');
const locationText = document.querySelector('#jsLocation');

const weatherList = {
    '01' : ['sunny',`맑은 하늘 공활한데 높고 구름 없이`],
    '02' : ['partly-sunny',`꽤 보기 좋은 구름이네요!`],
    '03' : ['cloud',`가끔 구름을 보면 눕고 싶어지지 않아요?`],
    '04' : ['cloud',`하늘은 보기 힘들지만 적어도 비는 안오네요!`],
    '09' : ['rain',`고연전에서 연세대가 승리했습니다.<br>하늘에선 비가 내립니다.`],
    '10' : ['rain',`고연전에서 연세대가 승리했습니다.<br>하늘에선 비가 내립니다.`],
    '11' : ['thunderstorm',`토르가 강림합니다!`],
    '13' : ['snow',`엘사공주가 마법을 부렸나봐요!`],
    '50' : ['skull',`공기가 미세먼지로 치환된 수준입니다.`]
}

function getWeather(coords){
    const APILink = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${APIkey}&lang=kr&units=metric`;
    console.log(coords);
    console.log(APILink);
    fetch(APILink)
        .then(response => response.json())
        .then(json => {
            const name = json.name;
            const temperNow = json.main.temp.toFixed(1);
            let iconID = json.weather[0].icon;
            iconID = iconID.substring(0,iconID.length - 1);
            locationText.innerHTML = name;
            temperature.innerHTML = temperNow + 'º';
            description.innerHTML = json.weather[0].description;
            weatherIcon.name = weatherList[iconID][0];
            comment.innerHTML = weatherList[iconID][1];
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