const btn = document.querySelector("button");
const gameBoard = document.querySelector("#jsGameboard");
const deckOfCard = document.getElementsByTagName("img");
const attempts = document.getElementById("jsAttemtsCounter");

imgArr = [];
let first = false;
let firstCard = "";
let secondCard = "";
let openedCards = [];
let matchedPair = "";
let attempt = 1;

//DRY(don't repeat yourself)version of the code
function imgArray() {
  let img;
  for (let i = 1; i <= 9; i++) {
    img = new Image();
    img.src = `img/${i}.png`;
    imgArr.push(img);
  }
}

const cardOpen = (selected) => {
  openedCards.push(selected);
  let length = openedCards.length;

  if (length === 2) {
    attempts.innerText = `Attempts:${attempt++}`;
    if (openedCards[0].firstChild.type === openedCards[1].firstChild.type) {
      console.log("its a match");
      openedCards = [];
      matchedPair++;
      finishGame(matchedPair);
    } else {
      disableUnpickedCards();
      setTimeout(() => {
        console.log("no match");
        openedCards.forEach((cardImg) =>
          cardImg.firstChild.classList.remove("show")
        );
        openedCards.forEach((cardImg) => cardImg.classList.remove("disabled"));
        // openedCards[0].firstChild.classList.remove("show");
        // openedCards[1].firstChild.classList.remove("show");
        // openedCards[0].classList.remove("disabled");
        // openedCards[1].classList.remove("disabled");
        enableCards();
        openedCards = [];
      }, 1000);
    }
  }
};

const pickCard = (e) => {
  let card = e.target;

  cardOpen(card);

  e.target.firstChild.classList.toggle("show");
  e.target.classList.toggle("disabled");
};

const disableUnpickedCards = () => {
  const unpickedCard = Array.from(deckOfCard).filter(
    (card) => card.classList.value == ""
  );
  unpickedCard.forEach((unpicked) =>
    unpicked.parentNode.classList.add("disabled")
  );
};

const enableCards = () => {
  Array.from(deckOfCard).forEach((card) =>
    card.parentNode.classList.remove("disabled")
  );
};

const randomizeImg = () => {
  gameBoard.innerHTML = "";
  //reason why it use -.5 is because it's mean value
  // gives equal probability to be negative or positive[-.5,.5]
  randomImg = imgArr.sort(() => Math.random() - 0.5);
  randomImg.forEach((img) => {
    // const name = img.src.slice(26, 27);
    const name = img.src.match(/\d.png$/)[0];

    const div = document.createElement("div");
    div.classList.add("card");

    if (name === "1.png" || name === "2.png") {
      img.type = 1;
    } else if (name === "3.png" || name === "4.png") {
      img.type = 2;
    } else if (name === "5.png" || name === "6.png") {
      img.type = 3;
    } else if (name === "7.png" || name === "8.png") {
      img.type = 4;
    } else {
      img.type = 5;
    }

    div.addEventListener("click", pickCard);
    div.appendChild(img);
    gameBoard.appendChild(div);
  });
};

const finishGame = (pairs) => {
  if (pairs === 4) alert("congraturations!");
};

const restart = () => {
  Array.from(deckOfCard).forEach((card) => {
    card.classList.value = "";
    card.parentNode.classList.value = "";
    openedCards = [];
    attempt = 1;
    attempts.innerText = `Attempts:0`;
  });
  randomizeImg();
};

function init() {
  imgArray();
  console.log(matchedPair);
  btn.addEventListener("click", restart);
}

init();
