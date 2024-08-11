import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const currentDate = new Date();
const startBtn = document.querySelector('button[data-start]');
const inputDate = document.querySelector('input');
startBtn.disabled = true;
class Timer {
  constructor() {
    this.isTimerActive = false;
    this.days = document.querySelector('span[data-days]');
    this.hours = document.querySelector('span[data-hours]');
    this.minutes = document.querySelector('span[data-minutes]');
    this.seconds = document.querySelector('span[data-seconds]');
  }
}

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (currentDate < userSelectedDate) {
      startBtn.disabled = false;
    } else {
      alert('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
  },
};

flatpickr(inputDate, options);
flatpickr('.calendar', {});

const onStartClick = () => {
  if (Timer.isTimerActive) {
    return;
  } else {
    startBtn.disabled = true;
    inputDate.disabled = true;
    const timerId = setInterval(() => {
      const currentDate = new Date();
      let secondsInFuture = userSelectedDate - currentDate;
      if (secondsInFuture <= 0) {
        clearInterval(timerId);
      } else {
        let countdownTimeLeft = convertMs(secondsInFuture);
        updateTimer(countdownTimeLeft);
      }
    }, 1000);
  }
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer({ days, hours, minutes, seconds }) {
  let newTimer = new Timer();
  newTimer.days.textContent = days;
  newTimer.hours.textContent = hours;
  newTimer.minutes.textContent = minutes;
  newTimer.seconds.textContent = seconds;
}

startBtn.addEventListener('click', onStartClick);
