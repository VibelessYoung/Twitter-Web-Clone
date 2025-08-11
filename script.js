const txtareaEL = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

const inputhandler = () =>{
    const typedChars = txtareaEL.value.length;
    const maxChars = 150;
    const charsLeft = maxChars - typedChars;
    counterEl.textContent = charsLeft;
}

txtareaEL.addEventListener('input' , inputhandler);