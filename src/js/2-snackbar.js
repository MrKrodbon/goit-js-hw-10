// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputCountdown = document.querySelector('input[name="delay"]');
const radioStateArray = document.querySelectorAll('input[name="state"]');
const createPromiseBtn = document.querySelector('button');
createPromiseBtn.disabled = true;

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

const getDelayInput = () => Number(inputCountdown.value);

const createPromise = (delay, state) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (state) {
        resolve();
      } else {
        rejected();
      }
    }, delay);
  });
};

const createPromiseNotification = event => {
  let delayValue = getDelayInput();
  let selectedRadio = getRadioState();

  createPromiseBtn.disabled = false;
  createPromise(delayValue, selectedRadio)
    .then(() => {
      iziToast.success({
        timeout: 3000,
        title: 'Success',
        message: `✅ Fulfilled promise in ${delayValue}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        timeout: 3000,
        title: 'Error',
        message: `❌ Rejected promise in ${delayValue}ms`,
      });
    });
  event.preventDefault();
};

const checkInputToZero = () => {
  let delayValue = getDelayInput();
  if (delayValue <= 0) {
    createPromiseBtn.disabled = true;
    iziToast.error({
      timeout: 4000,
      title: 'Attention!',
      message: `Choose delay equal or more than 1ms`,
    });
  } else {
    createPromiseBtn.disabled = false;
  }
};

inputCountdown.addEventListener('change', checkInputToZero);

createPromiseBtn.addEventListener('click', createPromiseNotification);
