const btn = document.querySelector("button");
const gameBoard = document.querySelector("#jsGameboard");

imgArr = [];
let first = false;
let firstCard = "";
let secondCard = "";
let openedCards = [];

//DRY(don't repeat yourself)version of the code
function imgArray() {
  let img;
  for (let i = 1; i <= 9; i++) {
    img = new Image();
    img.src = `img/${i}.png`;
    imgArr.push(img);
  }
}

// let imgArr = new Array();

// imgArr[0] = new Image();
// imgArr[0].src = `img/1.png`;

// imgArr[1] = new Image();
// imgArr[1].src = `img/2.png`;

// imgArr[2] = new Image();
// imgArr[2].src = `img/3.png`;

// imgArr[3] = new Image();
// imgArr[3].src = `img/4.png`;

// imgArr[4] = new Image();
// imgArr[4].src = `img/5.png`;

// imgArr[5] = new Image();
// imgArr[5].src = `img/6.png`;

// imgArr[6] = new Image();
// imgArr[6].src = `img/7.png`;

// imgArr[7] = new Image();
// imgArr[7].src = `img/8.png`;

// imgArr[8] = new Image();
// imgArr[8].src = `img/9.png`;

const cardOpen = (selected) => {
  openedCards.push(selected);
  let length = openedCards.length;

  if (length === 2) {
    if (openedCards[0].firstChild.type === openedCards[1].firstChild.type) {
      console.log(openedCards);
      console.log("its a match");
      openedCards = [];
    } else {
      setTimeout(() => {
        console.log("no match");
        openedCards[0].firstChild.classList.remove("show");
        openedCards[1].firstChild.classList.remove("show");
        openedCards[0].classList.remove("disabled");
        openedCards[1].classList.remove("disabled");

        openedCards = [];
      }, 2000);
    }
  }
};

const pickCard = (e) => {
  let card = e.target;
  cardOpen(card);

  e.target.firstChild.classList.toggle("show");
  e.target.classList.toggle("disabled");
};

const randomizeImg = () => {
  gameBoard.innerHTML = "";
  //reason why it use -.5 is because it's mean value
  // gives equal probability to be negative or positive[-.5,.5]
  randomImg = imgArr.sort(() => Math.random() - 0.5);
  randomImg.forEach((img) => {
    const name = img.src.slice(26, 27);

    const div = document.createElement("div");
    div.classList.add("card");

    if (name === "1" || name === "2") {
      img.type = 1;
    } else if (name === "3" || name === "4") {
      img.type = 2;
    } else if (name === "5" || name === "6") {
      img.type = 3;
    } else if (name === "7" || name === "8") {
      img.type = 4;
    } else {
      img.type = 5;
    }

    div.addEventListener("click", pickCard);
    div.appendChild(img);
    gameBoard.appendChild(div);
  });
};

const handleClick = (e) => {
  randomizeImg();
};

function init() {
  imgArray();
  btn.addEventListener("click", handleClick);
}

init();
