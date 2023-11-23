let timer_title = document.getElementById("timer_title");
let timer_time_minutes = document.getElementById("timer_time_minutes");
let timer_time_seconds = document.getElementById("timer_time_seconds");

let start_button = document.getElementById("timer_buttons_start");
let stop_button = document.getElementById("timer_buttons_stop");
let reset_button = document.getElementById("timer_buttons_reset");
let skip_button = document.getElementById("timer_buttons_skip");
let edit_button = document.getElementById("timer_buttons_edit");

let bell_button = document.getElementById("bell_button");

// Variables

let work_time = 40;
let break_time = 10;
let long_break_time = 30;
let seconds = 0;

let work = true;
let light = false;

let interval = null;
let audio = null;

window.onload = () => {
    timer_time_minutes.innerHTML = work_time;
    timer_time_seconds.innerHTML = String(seconds).padStart(2, '0');

    stop_button.style = "display: none;";
    bell_button.style = "display: none;";
}

function startTimer() {
    start_button.style = "display: none;";
    stop_button.style = "display: inline;";
    edit_button.style = "display: none;";
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
    start_button.style = "display: inline;";
    stop_button.style = "display: none;";
}

function resetTimer() {
    clearInterval(interval);
    start_button.style = "display: inline;";
    stop_button.style = "display: none;";
    seconds = 0;
    timer_time_seconds.innerHTML = String(seconds).padStart(2, '0');
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
    if (seconds == 0) {
        seconds = 59;
        timer_time_seconds.innerHTML = String(seconds).padStart(2, '0');
        timer_time_minutes.innerHTML = String(timer_time_minutes.innerHTML - 1).padStart(2, '0');
    } else {
        seconds = seconds - 1;
        timer_time_seconds.innerHTML = String(seconds).padStart(2, '0');
    }

    if ((timer_time_minutes.innerHTML == 0 && seconds == 0) || timer_time_minutes.innerHTML < 0) {
        if (work) {
            timer_time_minutes.innerHTML = break_time;
            timer_time_seconds.innerHTML = String(seconds).padStart(2, '0');
            work = false;
        } else {
            timer_time_minutes.innerHTML = work_time;
            timer_time_seconds.innerHTML = String(seconds).padStart(2, '0');
            work = true;
        }
        playSound();
        resetTimer();
    }
}

// Sound

function playSound() {
    bell_button.style = "display: inline;";
    if (!work) {
        audio = new Audio("./mp3/intro.mp3");
        
    } else {
        audio = new Audio("./mp3/outro.mp3");
    }
    audio.play();
}

function stopSound() {
    audio.pause();
    audio.currentTime = 0;
    bell_button.style = "display: none;";
}

function clickSound() {
    audio = new Audio("./mp3/click.mp3");
    audio.play();
}

// Modal

function openEditModal() {
    document.getElementById("editModal").style.display = "flex";
    document.getElementById("edit_work_time").value = work_time;
    document.getElementById("edit_break_time").value = break_time;
    document.getElementById("edit_light_mode").value = light;
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

function editTimer() {
    work_time = document.getElementById("edit_work_time").value;
    break_time = document.getElementById("edit_break_time").value;
    light = document.getElementById("edit_light_mode").checked;
    if (light) {
        document.body.classList.add("light");
    }
    else {
        document.body.classList.remove("light");
    }
    resetTimer();
    closeEditModal();
}