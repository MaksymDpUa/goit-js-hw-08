import throttle from 'lodash.throttle';

// Виконуй це завдання у файлах 03-feedback.html і 03-feedback.js. Розбий його на декілька підзавдань:

// Відстежуй на формі подію input, і щоразу записуй у локальне сховище об'єкт з полями email і message, у яких зберігай поточні значення полів форми. Нехай ключем для сховища буде рядок "feedback-form-state".
// Під час завантаження сторінки перевіряй стан сховища, і якщо там є збережені дані, заповнюй ними поля форми. В іншому випадку поля повинні бути порожніми.
// Під час сабміту форми очищуй сховище і поля форми, а також виводь у консоль об'єкт з полями email, message та їхніми поточними значеннями.
// Зроби так, щоб сховище оновлювалось не частіше, ніж раз на 500 мілісекунд. Для цього додай до проекту і використовуй бібліотеку lodash.throttle.

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const emailInput = document.querySelector('input');
const messageArea = document.querySelector('textarea');
form.addEventListener('input', throttle(onInput), 500);
form.addEventListener('submit', onSubmit);
document.addEventListener('DOMContentLoaded', onLoad);

const dataForm = {
  email: '',
  message: ''
};

function onInput(event) {
  event.preventDefault();

  if (event.srcElement.name === 'email') {
    dataForm.email += event.data;
  } else if (event.srcElement.name === 'message') {
    dataForm.message += event.data;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

function onLoad() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    return;
  }
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  emailInput.value = savedData.email;
  messageArea.value = savedData.message;
}

function onSubmit(event) {
    event.preventDefault();
    const finalData=JSON.parse(localStorage.getItem(STORAGE_KEY))
  console.log(finalData);
  form.reset();
  localStorage.clear();
}
