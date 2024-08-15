import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let timer;

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

  addLeadingZero() {
    this.days.textContent = this.days.textContent.padStart(2, '0');
    this.hours.textContent = this.hours.textContent.padStart(2, '0');
    this.minutes.textContent = this.minutes.textContent.padStart(2, '0');
    this.seconds.textContent = this.seconds.textContent.padStart(2, '0');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  iziToast.settings({
    timeout: 3000,
    resetOnHover: true,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    position: 'topRight',
  });
});

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = new Date();
    userSelectedDate = selectedDates[0];
    if (currentDate < userSelectedDate) {
      startBtn.disabled = false;
    } else {
      iziToast.error({
        timeout: 3000,
        icon: 'bi bi-check-circle-button',
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      return;
    }
  },
};

flatpickr(inputDate, options);

const onStartClick = () => {
  timer = new Timer();
  if (timer.isTimerActive) {
    return;
  } else {
    startBtn.disabled = true;
    inputDate.disabled = true;
    const timerId = setInterval(() => {
      const currentDate = new Date();
      let secondsInFuture = userSelectedDate - currentDate;
      if (secondsInFuture <= 0) {
        inputDate.disabled = false;
        clearInterval(timerId);
      } else {
        let countdownTimeLeft = convertMs(secondsInFuture);
        updateTimer(countdownTimeLeft, timer);
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

function updateTimer({ days, hours, minutes, seconds }, timer) {
  timer.days.textContent = days;
  timer.hours.textContent = hours;
  timer.minutes.textContent = minutes;
  timer.seconds.textContent = seconds;
  timer.addLeadingZero();
}

startBtn.addEventListener('click', onStartClick);
