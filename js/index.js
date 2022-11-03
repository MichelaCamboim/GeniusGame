// MANIPULAÇÃO DO DOM

const game = new GiniusGame();

const btnStrict = document.getElementById("strict");
const btnOn = document.getElementById("on");
const btnPlay = document.getElementById("play");

// eventListener no botão ligar
btnStrict.addEventListener("click", () => {
  if (btnStrict.checked == true) {
    game.strict = true;
  } else {
    game.strict = false;
  }
  console.log("estou no botão strict");
});

btnOn.addEventListener("click", () => {
  if (btnOn.checked == true) {
    game.on = true;
    game.turnCounter.innerHTML = "-";
  } else {
    game.on = false;
    game.turnCounter.innerHTML = "";
    game.clearColor();
    clearInterval(game.intervalId);
  }
  console.log("estou no botão power");
});

btnPlay.addEventListener("click", () => {
  if (game.on == true || game.win == true) {
    console.log("estou no botão play");
    game.play();
  }
});

game.topLeft.addEventListener("click", () => {
  if (game.on == true) {
    game.playerOrder.push(1);
    game.check();
    game.one();
    if (!game.win) {
      setTimeout(() => {
        game.clearColor();
      }, 300);
    }
  }
});

game.topRight.addEventListener("click", () => {
  if (game.on == true) {
    game.playerOrder.push(2);
    game.check();
    game.two();
    if (!game.win) {
      setTimeout(() => {
        game.clearColor();
      }, 300);
    }
  }
});

game.bottomLeft.addEventListener("click", () => {
  if (game.on == true) {
    game.playerOrder.push(3);
    game.check();
    game.three();
    if (!game.win) {
      setTimeout(() => {
        game.clearColor();
      }, 300);
    }
  }
});

game.bottomRight.addEventListener("click", () => {
  if (game.on == true) {
    game.playerOrder.push(4);
    game.check();
    game.four();
    if (!game.win) {
      setTimeout(() => {
        game.clearColor();
      }, 300);
    }
  }
});
