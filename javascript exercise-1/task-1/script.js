function currentTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    hour = update(hour);
    min = update(min);
    sec = update(sec);
    document.getElementById("clock").innerHTML = "Time " + hour + " : " + min + " : " + sec;
    let t = setTimeout(function(){ currentTime() }, 1000);
}

function update(k) {
    if (k < 10) {
        return "0" + k;
    }
    else {
        return k;
    }
}

currentTime();
formatDate();

function formatDate(date) {
    date = new Date();
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July",
                        "Aug", "Sept", "Oct", "Nov", "Dec"];
    let day = date.getDate();
    var monthIndex = monthNames[date.getMonth()];
    let year = date.getFullYear();
    day = update(day);
    document.getElementById("calendar").innerHTML = "Date " + day + " " + monthIndex + " " + year;
    
}
let ms = 0;
let sec = 0;
let min = 0;
let hours = 0;
let interval = null;
function stopWatch() {
    ms++;
    if(ms/100 === 1){
        ms = 0;
        sec++;
       
        if(sec/60 ===1) {
            sec = 0;
            min++;
            if(min/60 === 0) {
                min = 0;
                hours++;
            }
        }
    }
    ms1 = update(ms);
    sec1 = update(sec);
    min1 = update(min);
    hours1 = update(hours);
    document.getElementById("display").innerHTML = hours1 + ":" + min1 + ":" + sec1 + ":" + ms1;
}

function start() {
   
        interval = window.setInterval(stopWatch,10);
        document.getElementById("resume").disabled = true;
        
    
}

function stop() {
    window.clearInterval(interval);
    document.getElementById("start").disabled = false;
    document.getElementById("resume").disabled = false;
}

function resume() {
    
        interval = window.setInterval(stopWatch, 10);
        document.getElementById("start").disabled = true;
    
}

function reset() {
    window.clearInterval(interval);
    ms = 0;
    sec = 0;
    min = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00:00";
    document.getElementById("start").disabled = false;
    document.getElementById("resume").disabled = true;
}

