const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
const startButton = document.getElementById('power');
const resetButton = document.getElementById('reset');
const markButton = document.getElementById('mark');

let intervalId;
let timer = 0;
let marks = [];
let isTimerRunning = false;

const formatTime = (time) => {
    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const hundredths = time % 100;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

const addMarkToList = (markIndex, markTime) => {
    const markItem = document.createElement('li');
    markItem.textContent = `Marca ${markIndex}: ${formatTime(markTime)}`;
    marksList.appendChild(markItem);
}

const markTime = () => {
    if (timer > 0) {
        marks.push(timer);
        addMarkToList(marks.length, timer);
    } else {
        alert("Você precisa iniciar o cronômetro antes de salvar um registro.");
    }
}

const toggleTimer = () => {
    const buttonIcon = startButton.querySelector('i');
    if (isTimerRunning) {
        clearInterval(intervalId);
        isTimerRunning = false;
        buttonIcon.classList.remove('fa-pause');
        buttonIcon.classList.add('fa-play');
    } else {
        intervalId = setInterval(() => {
            timer += 1;
            setTimer(timer);
        }, 10);
        isTimerRunning = true;
        buttonIcon.classList.remove('fa-play');
        buttonIcon.classList.add('fa-pause');
    }
}

const resetTimer = () => {
    clearInterval(intervalId);
    timer = 0;
    marks = [];
    setTimer(timer);
    marksList.innerHTML = '';
    isTimerRunning = false;
    const buttonIcon = startButton.querySelector('i');
    buttonIcon.classList.remove('fa-pause');
    buttonIcon.classList.add('fa-play');
}

const setTimer = (time) => {
    timerEl.innerText = formatTime(time);
}

startButton.addEventListener('click', toggleTimer);
markButton.addEventListener('click', markTime);
resetButton.addEventListener('click', resetTimer);