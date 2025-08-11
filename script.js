const txtareaEL = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");

const inputhandler = () => {
  const typedChars = txtareaEL.value.length;
  const maxChars = 150;
  const charsLeft = maxChars - typedChars;
  counterEl.textContent = charsLeft;
};

txtareaEL.addEventListener("input", inputhandler);

const formhandler = (event) => {
  event.preventDefault();
  const txt = txtareaEL.value;

  if (txt.includes("#")) {
    formEl.classList.add("form--valid");
    setTimeout(() => {
      formEl.classList.remove("form--valid");
    }, 3000);
  } else {
    formEl.classList.add("form--invalid");
    setTimeout(() => {
      formEl.classList.remove("form--invalid");
    }, 3000);
  }
  
  if (txtareaEL.value.length < 5 || !txtareaEL.value.includes("#")) {
    [...formEl.elements].forEach(el => el.disabled = true);
    setTimeout(() => {
        [...formEl.elements].forEach(el => el.disabled = false);
    }, 3000);
  }
};

formEl.addEventListener("submit", formhandler);
