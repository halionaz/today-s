const APIkey = "c137c5b4783c30d1997207a8d897dc55";

const weatherIcon = document.querySelector('#jsWeatherIcon');
const temperature = document.querySelector('#jsTemper');
const description = document.querySelector('#jsDescription');
const comment = document.querySelector('#jsComment');
const locationText = document.querySelector('#jsLocation');
const gage = document.querySelector("#jsGage");
const refresh = document.querySelector("#jsRefresh");
const feelLike = document.querySelector("#jsFeelLike")
const maxTemp = document.querySelector("#jsMaxTemp");
const minTemp = document.querySelector("#jsMinTemp");
const humid = document.querySelector("#jsHumid");
const wind = document.querySelector("#jsWind");

let temperNow;
let prevTemp = -10;

const weatherList = {
    '01' : ['sunny',`맑은 하늘 공활한데 높고 구름 없이`],
    '02' : ['partly-sunny',`꽤 보기 좋은 구름이네요!`],
    '03' : ['cloud',`가끔 구름을 보면 눕고 싶어지지 않아요?`],
    '04' : ['cloud',`하늘은 보기 힘들지만 적어도 비는 안오네요!`],
    '09' : ['rainy',`고연전에서 연세대가 승리했습니다.<br>하늘에선 비가 내립니다.`],
    '10' : ['rainy',`고연전에서 연세대가 승리했습니다.<br>하늘에선 비가 내립니다.`],
    '11' : ['thunderstorm',`토르가 강림합니다!`],
    '13' : ['snow',`엘사공주가 마법을 부렸나봐요!`],
    '50' : ['skull',`공기 대부분이 수증기로 치환된 수준입니다.`]
}


function displayGage(){
    if(temperNow != prevTemp){
        let val = prevTemp;
        let animateTerm;
        const dist = Math.abs(prevTemp-temperNow);
        if(dist > 20){
            animateTerm = 0.5;
        } else if (dist > 5){
            animateTerm = 0.3
        } else {
            animateTerm = 0.1
        }
        gage.value = prevTemp;
        const animateSlide = setInterval(()=>{
            if(Math.abs(val-temperNow) <= animateTerm){
                gage.value = temperNow;
                clearInterval(animateSlide);
            } else if(val > temperNow){
                val -= animateTerm
                gage.value = val;
            } else if(val < temperNow){
                val += animateTerm
                gage.value = val;
            }
        },1);
        prevTemp = temperNow;
    } else {
        gage.value = temperNow;
    }
}

gage.addEventListener('input',displayGage);

function getWeather(coords){
    const APILink = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${APIkey}&lang=kr&units=metric`;
    fetch(APILink)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const name = json.name;
            temperNow = json.main.temp.toFixed(1);
            let iconID = json.weather[0].icon;
            iconID = iconID.substring(0,iconID.length - 1);
            locationText.innerHTML = name;
            temperature.innerHTML = temperNow + 'º';
            feelLike.innerHTML = `체감온도 ${json.main.feels_like.toFixed(1)}º`
            description.innerHTML = json.weather[0].description;
            maxTemp.innerHTML = `최고 ${json.main.temp_max.toFixed(1)}º`;
            minTemp.innerHTML = `최저 ${json.main.temp_min.toFixed(1)}º`;
            weatherIcon.name = weatherList[iconID][0];
            comment.innerHTML = weatherList[iconID][1];
            humid.innerHTML = `습도 ${json.main.humidity}%`;
            wind.innerHTML = `바람 ${json.wind.speed.toFixed(1)}m/s`;

            // 시발
            // const now = new Date();
            // const dist = now.getTimezoneOffset()*60;
            // let sunset = new Date((json.sys.sunrise - dist)*1000);
            // // const sunrise = json.sys.sunrise % (60*60*24) 
            // // const sunsetHour = Math.floor(sunset/(60*60));
            // // const sunsetMin = Math.floor(sunset/(60*60))
            // console.log(dist);
            // console.log(sunset);

            displayGage()
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
setInterval(loadWeather,150000);
refresh.addEventListener('click',loadWeather);