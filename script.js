/* DATA */

const txtareaEL = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedsEL = document.querySelector(".feedbacks");
const submitEL = document.querySelector(".submit-btn");
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";
const hashtagListEL = document.querySelector(".hashtags");

/* FUNCTIONS */

//CHECK MAX CHARACTER
const inputhandler = () => {
  const typedChars = txtareaEL.value.length;
  const maxChars = 150;
  const charsLeft = maxChars - typedChars;
  counterEl.textContent = charsLeft;
};

txtareaEL.addEventListener("input", inputhandler);

//CONTROL FORM INPUTS
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

  //ADD TWITTES
  const hashtag = txt.split(" ").find((word) => word.includes("#"));
  const company = hashtag.substring(1);
  const date = 0;
  const upvote = 0;
  const letter = company.substring(0, 1).toUpperCase();
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
            <p class="feedback__date">${date === 0 ? "New" : `${date}d`}</p>
        </li>
    `;

  feedsEL.insertAdjacentHTML("beforeend", feedItem);
  txtareaEL.value = "";
  submitEL.blur();
  counterEl.textContent = 150;

  //POST DATA TO API
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Something went wrong");
        return;
      }
      console.log("Successfuly submitted");
    })
    .catch((error) => console.log(error));
};

//LOAD DATA FROM API
fetch(`${BASE_API_URL}/feedbacks`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.querySelector(".spinner").remove();
    data.feedbacks.forEach((feedItem) => {
      const feedsItem = `
        <li class="feedback">
                <button class="upvote">
                    <i class="fa-solid fa-caret-up upvote__icon"></i>
                    <span class="upvote__count">${feedItem.upvoteCount}</span>
                </button>
                <section class="feedback__badge">
                    <p class="feedback__letter">${feedItem.badgeLetter}</p>
                </section>
                <div class="feedback__content">
                    <p class="feedback__company">${feedItem.company}</p>
                    <p class="feedback__text">
                    ${feedItem.text}
                    </p>
                </div>
                <p class="feedback__date">${
                  feedItem.daysAgo === 0 ? "NEW" : `${feedItem.daysAgo}d`
                }</p>
            </li>
        `;
      feedsEL.insertAdjacentHTML("beforeend", feedsItem);
    });
  })
  .catch((err) => console.error("Error fetching data:", err));

formEl.addEventListener("submit", formhandler);

//CONTROL VOTES
const clickhandler = (event) => {
  const clickedEL = event.target;
  const upvoteEL = clickedEL.className.includes("upvote");

  if (upvoteEL) {
    const upvotebtnEL = clickedEL.closest(".upvote");
    upvotebtnEL.disabled = true;

    const votecountEL = upvotebtnEL.querySelector(".upvote__count");
    let votecount = +upvotebtnEL.textContent;
    votecountEL.textContent = ++votecount;
  } else {
    clickedEL.closest(".feedback").classList.toggle("feedback--expand");
  }
};

//FILTER
feedsEL.addEventListener("click", clickhandler);

const hashtagClickHandler = (event) => {
  const clickedEl = event.target;

  if (clickedEl.className === "hashtags") return;

  const companyNameFromHastag = clickedEl.textContent.substring(1).trim();

  feedsEL.childNodes.forEach((childNode) => {
    if (childNode.nodeType === 3) return;

    const companyNameFromFeedbackItem = childNode
      .querySelector(".feedback__company")
      .textContent.toLowerCase()
      .trim();

    if (
      companyNameFromHastag.toLowerCase().trim() !== companyNameFromFeedbackItem
    ) {
      childNode.remove();
    }
  });
};
hashtagListEL.addEventListener("click", hashtagClickHandler);
