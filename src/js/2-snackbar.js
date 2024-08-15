// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputCountdown = document.querySelector('input[name="delay"]');
const radioStateArray = document.querySelectorAll('input[name="state"]');
const submitForm = document.querySelector('form');

document.addEventListener('DOMContentLoaded', () => {
  iziToast.settings({
    timeout: 3000,
    resetOnHover: true,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    position: 'topRight',
  });
});

const getRadioState = () => {
  let isRadioSelected;
  for (const radio of radioStateArray) {
    if (radio.checked) {
      if (radio.value == 'fulfilled') {
        isRadioSelected = true;
      } else {
        isRadioSelected = false;
      }
      break;
    }
  }
  return isRadioSelected;
};

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const createPromiseNotification = event => {
  let delayValue = Number(inputCountdown.value);
  let selectedRadio = getRadioState();
  event.preventDefault();
  createPromise(delayValue, selectedRadio)
    .then(delay => {
      iziToast.success({
        timeout: delay,
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        timeout: delay,
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
};

submitForm.addEventListener('submit', createPromiseNotification);

