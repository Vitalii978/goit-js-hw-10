import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const delay = +e.currentTarget.elements.delay.value;
  const state = e.currentTarget.elements.state.value;

  startPromise(delay, state);
}

function startPromise(delay, state) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(value => {
      iziToast.show({
        color: 'green',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(value => {
      iziToast.show({
        color: 'red',
        position: 'topRight',
        message: `❌ Rejected promise in ${value}ms`,
      });
    });
}