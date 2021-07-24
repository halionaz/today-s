const logo = document.querySelector("#jsLogo");
const date = document.querySelector("#jsDate");

function getToday(){
    const today = new Date();
    let dayList = ['SUN','MON','TUS','WED','THU','FRI','SAT']
    date.innerHTML = `${today.getFullYear()}.${today.getMonth()}.${today.getDate()} (${dayList[today.getDay()]})`;
}

getToday();
setInterval(getToday,10000); //날짜 업데이트

logo.addEventListener("click",()=>{
    location.reload();
});