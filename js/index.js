const startButton = document.querySelector("#jsStart");
const gameBoard = document.querySelector("#jsGameboard");
const deckOfCard = document.getElementsByTagName("img");
const attempts = document.getElementById("jsAttemtsCounter");
const formContainer = document.getElementById("jsFormContainer");
const form = document.querySelector("#jsForm");
const NameButton = document.querySelector("#EnterName");
const inputName = document.querySelector("#jsInputName");
const ranking = document.querySelector("#jsRank");

const PLAYERINFO_LS = "playerInfo";

imgArr = [];
let first = false;
let firstCard = "";
let secondCard = "";
let openedCards = [];
let matchedPair = "";
let attempt = 1;
let playerInfo = [];
let imageName = "";
let playerName = "";

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
    attempts.innerText = `Attempts: ${attempt++}`;
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
    const imageName = img.src.match(/\d.png$/)[0];

    const div = document.createElement("div");
    div.classList.add("card");

    if (imageName === "1.png" || imageName === "2.png") {
      img.type = 1;
    } else if (imageName === "3.png" || imageName === "4.png") {
      img.type = 2;
    } else if (imageName === "5.png" || imageName === "6.png") {
      img.type = 3;
    } else if (imageName === "7.png" || imageName === "8.png") {
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
  if (pairs === 4) {
    alert("congraturations!");
    const playerInfoObj = {
      playerName,
      value: attempt - 1,
    };
    playerInfo.push(playerInfoObj);
    ranking.innerHTML = "";
    sortLeaderboard();
    savePlayerInfo();
    console.log(playerInfo);
  }
};

/*----------------------
leaderboard Functions 
----------------------*/
const sortLeaderboard = () => {
  const sortedRank = playerInfo.sort(
    (first, second) => first.value - second.value
  );
  postEndResult(sortedRank);
};

const postEndResult = (sortedRank) => {
  sortedRank.forEach((item) => {
    const li = document.createElement("li");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    div1.className = "player__name";
    div2.className = "player__score";
    div1.innerText = `${item.playerName}`;
    div2.innerText = `Attempts: ${item.value}`;
    li.appendChild(div1);
    li.appendChild(div2);
    ranking.appendChild(li);
    // li.innerText = `${item.playerName}:  Attempts:${item.value}`;
    // ranking.appendChild(li);
  });
};

const postLeaderBoard = () => {
  const loadedRankings = localStorage.getItem(PLAYERINFO_LS);
  if (loadedRankings != null) {
    const parsedLoadedRankings = JSON.parse(loadedRankings);
    parsedLoadedRankings.forEach((rank) => {
      const li = document.createElement("li");
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      div1.className = "player__name";
      div2.className = "player__score";
      div1.innerText = `${rank.playerName}`;
      div2.innerText = `Attempts: ${rank.value}`;
      li.appendChild(div1);
      li.appendChild(div2);
      // li.innerText = `${rank.playerName}:  Attempts:${rank.value}`;
      ranking.appendChild(li);
    });
  }
};
// leaderboard Functions //

/*----------------------
 save && load functions
----------------------*/
const savePlayerInfo = () => {
  localStorage.setItem(PLAYERINFO_LS, JSON.stringify(playerInfo));
};

const loadPlayerInfo = () => {
  const loadedInfo = localStorage.getItem(PLAYERINFO_LS);
  if (!loadedInfo) {
    return;
  } else {
    const parsedLoadedInfo = JSON.parse(loadedInfo);
    parsedLoadedInfo.forEach((info) => {
      playerInfo.push(info);
    });
  }
};
// save && load functions //

const restart = () => {
  if (playerName === "") {
    alert("Pleaser enter your name");
  } else {
    Array.from(deckOfCard).forEach((card) => {
      card.classList.value = "";
      card.parentNode.classList.value = "";
      openedCards = [];
      attempt = 1;
      attempts.innerText = `Attempts:0`;
    });
    randomizeImg();
    matchedPair = 0;
  }
};

const getPlayerName = (e) => {
  e.preventDefault();
  playerName = e.target.playerName.value;
  greetPlayer(playerName);
};

const greetPlayer = (playerName) => {
  form.remove();
  const span = document.createElement("span");
  span.innerText = `Hello ${playerName} let's play the game!`;
  formContainer.appendChild(span);
};

function init() {
  imgArray();
  startButton.addEventListener("click", restart);
  form.addEventListener("submit", getPlayerName);
  postLeaderBoard();
  loadPlayerInfo();
}

init();
