
const logo = document.querySelector("#jsLogo");
const date = document.querySelector("#jsDate");

function getToday(){
    const today = new Date();
    let dayList = ['일','월','화','수','목','금','토']
    date.innerHTML = `${today.getFullYear()}.${today.getMonth()+1}.${today.getDate()} (${dayList[today.getDay()]})`;
}

getToday();
setInterval(getToday,60000); //자동 업데이트, 1분마다 이루어짐

logo.addEventListener("click",()=>{
    location.reload();
});