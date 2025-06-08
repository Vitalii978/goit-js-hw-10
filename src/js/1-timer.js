import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  button: document.querySelector('button[data-start]'),
  input: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let isToastVisible = false;
elements.button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const timeToCountdown = selectedDates[0] - Date.now();

    if (timeToCountdown < 0) {
      elements.button.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        color: 'orange',
        position: 'topRight',
      });
      isToastVisible = true;
      return;
    }


    elements.button.disabled = false;
    selectedDate = selectedDates[0];
    if (isToastVisible) {
      iziToast.hide({});
      isToastVisible = false;
    }
  },
};

flatpickr('#datetime-picker', options);

elements.button.addEventListener('click', clickHandler);

function clickHandler() {
  elements.input.disabled = true;
  elements.button.disabled = true;

  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const remainingTime = selectedDate - currentTime;
    if (remainingTime < 0) {
      clearInterval(timerId);
      elements.input.disabled = false;
      elements.button.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    elements.days.innerHTML = days;
    elements.hours.innerHTML = hours;
    elements.minutes.innerHTML = minutes;
    elements.seconds.innerHTML = seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addZero(Math.floor(ms / day));
  const hours = addZero(Math.floor((ms % day) / hour));
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function addZero(n) {
  return String(n).padStart(2, '0');
}