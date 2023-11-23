let timer_title = document.getElementById("timer_title");
let timer_time_minutes = document.getElementById("timer_time_minutes");
let timer_time_seconds = document.getElementById("timer_time_seconds");

let start_button = document.getElementById("timer_buttons_start");
let stop_button = document.getElementById("timer_buttons_stop");
let reset_button = document.getElementById("timer_buttons_reset");
let skip_button = document.getElementById("timer_buttons_skip");

let work_time = 40;
let break_time = 10;
let seconds = "00";
let long_break_time = 30;

work = true;
start = false;

interval = null;

window.onload = () => {
    timer_time_minutes.innerHTML = work_time;
    timer_time_seconds.innerHTML = seconds;

    stop_button.style = "display: none;";
}

function startTimer() {
    start_button.style = "display: none;";
    stop_button.style = "display: inline;";
    start = true;
    interval = setInterval(timer, 1000);
    if (work) {
        timer_title.innerHTML = "Work";
    } else {
        timer_title.innerHTML = "Break";
    }
}

function stopTimer() {
    timer_title.innerHTML = "Paused";
    clearInterval(interval);
    start = false;
    start_button.style = "display: inline;";
    stop_button.style = "display: none;";
}

function resetTimer() {
    clearInterval(interval);
    start = false;
    start_button.style = "display: inline;";
    stop_button.style = "display: none;";
    timer_time_seconds.innerHTML = seconds;
    if (work) {
        timer_title.innerHTML = "Work";
        timer_time_minutes.innerHTML = work_time;
    } else {
        timer_title.innerHTML = "Break";
        timer_time_minutes.innerHTML = break_time;
    }
}

function skipTimer() {
    work = !work;
    resetTimer();
}

timer = () => {
    if (seconds == "00") {
        seconds = 59;
        timer_time_seconds.innerHTML = seconds;
        timer_time_minutes.innerHTML = timer_time_minutes.innerHTML - 1;
    } else {
        seconds = seconds - 1;
        timer_time_seconds.innerHTML = seconds;
    }

    if (timer_time_minutes.innerHTML == 0 && seconds == 0) {
        if (work) {
            timer_time_minutes.innerHTML = break_time;
            timer_time_seconds.innerHTML = seconds;
            work = false;
        } else {
            timer_time_minutes.innerHTML = work_time;
            timer_time_seconds.innerHTML = seconds;
            work = true;
        }
    }
}