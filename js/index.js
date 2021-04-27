const btn = document.querySelector("button");
const gameBoard = document.querySelector("#jsGameboard");

imgArr = [];

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

const firstPick = () => {};

const secondPick = (firstCard) => {};

const pickCard = (e) => {
  //if(e.target.id === 1 && )
  console.log(e.target.classList.value);
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
      img.classList.add("1");
    } else if (name === "3" || name === "4") {
      img.classList.add("2");
    } else if (name === "5" || name === "6") {
      img.classList.add("3");
    } else if (name === "7" || name === "8") {
      img.classList.add("4");
    } else {
      img.classList.add("5");
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
