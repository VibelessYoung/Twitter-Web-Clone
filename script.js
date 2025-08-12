const txtareaEL = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedsEL = document.querySelector(".feedbacks");
const submitEL = document.querySelector('.submit-btn')

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

  if (txtareaEL.value.length < 5 || !txtareaEL.value.includes("#")) {
    [...formEl.elements].forEach((el) => (el.disabled = true));
    setTimeout(() => {
      [...formEl.elements].forEach((el) => (el.disabled = false));
    }, 2000);
  }

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
    txtareaEL.focus();
    return;
  }

  const hashtag = txt.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const date = 0;
  const upvote = 0;
  const letter = company.substring(0,1).toUpperCase();
  const feedItem = `
    <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvote}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${letter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">${txt}</p>
            </div>
            <p class="feedback__date">${date === 0 ? 'New' : `${date}d`}</p>
        </li>
    `;

    feedsEL.insertAdjacentHTML('beforeend',feedItem);
    txtareaEL.value ='';
    submitEL.blur();
    counterEl.textContent = 150;
};

formEl.addEventListener("submit", formhandler);
