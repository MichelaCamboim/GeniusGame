class GiniusGame {
  constructor() {
    this.order = []; // vai acompanhar a ordem das luzes
    this.playerOrder = [];
    this.flash = 0;
    this.turn = 0;
    this.on = false; // se o botão power está ligado ou não
    this.strict = false; //botão ligado ou desligado
    this.win = false; // se o player ganhou ou não
    this.compTurn = false; //(true or false)
    this.noise = true; // noise é o som
    this.correct = true; // se o player não errou ainda (true or false)
    this.intervalId = null; // a ordem aleatória se repete no intervalo
    this.topLeft = document.querySelector("#topLeft");
    this.topRight = document.querySelector("#topRight");
    this.bottomLeft = document.querySelector("#bottomLeft");
    this.bottomRight = document.querySelector("#bottomRight");
    this.turnCounter = document.getElementById("turn");
  }

  // métodos:

  clearColor() {
    this.topLeft.style.backgroundColor = "darkgreen";
    this.topRight.style.backgroundColor = "darkred";
    this.bottomLeft.style.backgroundColor = "goldenrod";
    this.bottomRight.style.backgroundColor = "darkblue";
  }

  /*
    quanto aperta o botão play, primeria função chamada é play()
    função play é um loop com todas as jogadas da máquina.
    ela chama um gerador aleatório de uma sequencia de 4 dígitos (1 até 4).
    em cada resultado, 1, 2, 3, ou 4, ela chama uma função diferente, tb
    nomeadas por números. ela continua gerando esse loop até que o número de
    luzes que piscaram se igualem ao número mostrado no count (que é a partida)
*/

  play() {
    this.win = false;
    this.order = [];
    this.playerOrder = [];
    this.flash = 0;
    this.intervalId = 0;
    this.turn = 1;
    this.turnCounter.innerHTML = 1;
    this.correct = true;
    for (let i = 0; i < 20; i++) {
      this.order.push(Math.floor(Math.random() * 4) + 1);
    }
    this.compTurn = true;
    //console.log(this.turn);
    //console.log(this.flash);
    //console.log(this.compTurn);

    this.intervalId = setInterval(() => {
      this.on = false; // quando on é false, nenhuma luz acende
      console.log("dentro do gameturn");

      // quando o número de flashs = número mostrado no count
      // a vez do computador acabou
      // primeiro if: se a vez do computador acabou, então:

      if (this.flash == this.turn) {
        console.log("dentro do gameturn if");
        clearInterval(this.intervalId);
        this.compTurn = false;
        this.clearColor();
        this.on = true;
      }

      if (this.compTurn == true) {
        this.clearColor();
        setTimeout(() => {
          if (this.order[this.flash] == 1) {
            this.one();
          }
          if (this.order[this.flash] == 2) {
            this.two();
          }
          if (this.order[this.flash] == 3) {
            this.three();
          }
          if (this.order[this.flash] == 4) {
            this.four();
          }
          this.flash++;
        }, 200);
      }
    }, 800);
  }

  /*  as funções 1 a 4 (abaixo) definem o que acontece quando o número
  aleatório de 1 a 4 é sorteado. basicamente, ele acende uma luz e toca
  um som diferente. */

  one() {
    if (this.noise) {
      let audio = document.getElementById("clip1");
      audio.play();
    }
    this.noise = true;
    this.topLeft.style.backgroundColor = "lightgreen";
  }

  two() {
    if (this.noise) {
      let audio = document.getElementById("clip2");
      audio.play();
    }
    this.noise = true;
    this.topRight.style.backgroundColor = "tomato";
  }

  three() {
    if (this.noise) {
      let audio = document.getElementById("clip3");
      audio.play();
    }
    this.noise = true;
    this.bottomLeft.style.backgroundColor = "yellow";
  }

  four() {
    if (this.noise) {
      let audio = document.getElementById("clip4");
      audio.play();
    }
    this.noise = true;
    this.bottomRight.style.backgroundColor = "lightskyblue";
  }

  flashColor() {
    this.topLeft.style.backgroundColor = "lightgreen";
    this.topRight.style.backgroundColor = "tomato";
    this.bottomLeft.style.backgroundColor = "yellow";
    this.bottomRight.style.backgroundColor = "lightskyblue";
  }

  /* quando a máquina termina o seu loop, ela espera o jogador.
  quando o jogador aperta qualquer botão de cores (esses eventlistenes estão no
    arquivo index.js) os eventlisteners dos botões coloridos chamam a função check()
    
    a função check verifica se o jogador fez tudo correto (correct)
    se sim, ele verifica se o player ganhou o jogo, se não, passa a vez pra máquina
    se errar, e o botão strict não tiver marcado, ele fica repetindo a sequencia
    daquela partida até o player acertar
    se o strict tiver marcado, o jogo volta pro começo*/

  check() {
    if (
      this.playerOrder[this.playerOrder.length - 1] !==
      this.order[this.playerOrder.length - 1]
    ) {
      this.correct = false;
    }

    if (this.playerOrder.length == 20 && this.correct) {
      this.winGame();
    }

    if (this.correct == false) {
      this.flashColor();
      this.turnCounter.innerHTML = "NO!";
      setTimeout(() => {
        this.turnCounter.innerHTML = this.turn;
        this.clearColor();
        // turncounter vai dizer no, mas em menos de um minuto vai
        // escrever o número igual ao turn

        if (this.strict == true) {
          this.play();
        } else {
          this.compTurn = true;
          this.flash = 0;
          this.playerOrder = [];
          this.correct = true;
          this.intervalId = setInterval(() => {
            this.on = false; // quando on é false, nenhuma luz acende
            console.log("dentro do gameturn");

            // quando o número de flashs = número mostrado no count
            // a vez do computador acabou
            // primeiro if: se a vez do computador acabou, então:

            if (this.flash == this.turn) {
              console.log("dentro do gameturn if");
              clearInterval(this.intervalId);
              this.compTurn = false;
              this.clearColor();
              this.on = true;
            }

            if (this.compTurn == true) {
              this.clearColor();
              setTimeout(() => {
                if (this.order[this.flash] == 1) {
                  this.one();
                }
                if (this.order[this.flash] == 2) {
                  this.two();
                }
                if (this.order[this.flash] == 3) {
                  this.three();
                }
                if (this.order[this.flash] == 4) {
                  this.four();
                }
                this.flash++;
              }, 200);
            }
          }, 700);
        }
      }, 700);
      // se o strict tiver apertado, vou repetir tudo, comecando do zero
      // strict false, começo de onde parei

      this.noise = false; // estamos no correct=false, jogador errou, nenhum som toca
    }
    // abaixo o jogador acertou a ordem, mas ainda não ganhou o jogo
    if (this.turn == this.playerOrder.length && this.correct && !this.win) {
      this.turn++;
      this.playerOrder = [];
      this.compTurn = true;
      this.flash = 0;
      this.turnCounter.innerHTML = this.turn;
      this.intervalId = setInterval(() => {
        this.on = false; // quando on é false, nenhuma luz acende
        //console.log("dentro do gameturn");

        // quando o número de flashs = número mostrado no count
        // a vez do computador acabou
        // primeiro if: se a vez do computador acabou, então:

        if (this.flash == this.turn) {
          console.log("dentro do gameturn if");
          clearInterval(this.intervalId);
          this.compTurn = false;
          this.clearColor();
          this.on = true;
        }

        if (this.compTurn == true) {
          this.clearColor();
          setTimeout(() => {
            if (this.order[this.flash] == 1) {
              this.one();
            }
            if (this.order[this.flash] == 2) {
              this.two();
            }
            if (this.order[this.flash] == 3) {
              this.three();
            }
            if (this.order[this.flash] == 4) {
              this.four();
            }
            this.flash++;
          }, 200);
        }
      }, 700);
    }
  }

  winGame() {
    this.flashColor();
    this.turnCounter.innerHTML = "WIN!";
    this.on = false; // aqui o jogador não consegue mais clicar em nada
    this.win = true;
  }
}
