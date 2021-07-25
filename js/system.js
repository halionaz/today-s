const logo = document.querySelector("#jsLogo");
const date = document.querySelector("#jsDate");

function getToday(){
    const today = new Date();
    let dayList = ['SUN','MON','TUS','WED','THU','FRI','SAT']
    date.innerHTML = `${today.getFullYear()}.${today.getMonth()}.${today.getDate()} (${dayList[today.getDay()]})`;
}

getToday();
setInterval(getToday,60000); //자동 업데이트, 1분마다 이루어짐

logo.addEventListener("click",()=>{
    location.reload();
});