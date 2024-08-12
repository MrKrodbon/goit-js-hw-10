// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const inputCountdown = document.querySelector('input');
const radioStateInputs = document.querySelectorAll('fieldset input');
const submitBtn = document.querySelector('button');

document.addEventListener('DOMContentLoaded', () => {
  iziToast.settings({
    timeout: 3000,
    resetOnHover: true,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    position: 'topRight',
  });
});

const createPromise = delay => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (resolve) {
        resolve('ok');
      } else {
        rejected(
          iziToast.error({
            timeout: 3000,
            icon: 'bi bi-check-circle-button',
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
          })
        );
      }
    }, delay);
  });
};

createPromise(1000);
