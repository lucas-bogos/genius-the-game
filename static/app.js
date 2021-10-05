let order = []; // escolhida ordem pela machine
let clickedOrder = []; // cor clicada pelo player
let score = 0; // pontuação do player
let countLevel = 0;

const level = document.querySelector('.currentLevel');
const scores = document.querySelector('.currentScore');

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const BEEP = new Audio('../assets/sound/BEEP.wav');
BEEP.loop = false;

const GAMEOVER = new Audio('../assets/sound/GAMEOVER.wav');
GAMEOVER.loop = false;

const WINNER = new Audio('../assets/sound/WINNER.wav');
WINNER.loop = false;

// obtem cor aleatória
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1)
    }
}


let lightColor = (element, time) => {
    time = time * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, time - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    });
}

// checará a ordem do player e feito pela machine
let checkOrder = () => {
    for (let i = 0; i < clickedOrder.length; i++) {
        if(clickedOrder[i] !== order[i]) {
            GAMEOVER.play();
            gameOver();
            break;
        }
    }

    if(clickedOrder.length === order.length) {
        alert(`Parabéns, Você acertou!`);
        WINNER.play();
        nextLevel();
    }

    console.log(clickedOrder);
    console.log(order);
};


let click = (color) => {
    BEEP.play();

    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
};

let createColorElement = (color) => {
    switch(color) {
        case 0:
          return green;
            break;
        case 1:
            return red;
            break;
        case 2:
            return yellow;
            break;
        case 3:
            return blue;
            break;
      }
};

let nextLevel = () => {
    scores.innerHTML = `<td class="currentScore">${score++}</td>`;
    shuffleOrder();
    if (score >= 5) {
        level.innerHTML = `<td class="currentLevel">${countLevel++}</td>`;
    }    
};

let gameOver = () => {
    alert(`Você perdeu o jogo!\nClique em OK para iniciar um novo jogo.`);
    order = [];
    clickedOrder = [];
    playGame();
};

let playGame = () => {
    alert(`Bem vindo ao Gênesis! Iniciando novo jogo!`);
    score = 0;
    nextLevel();
};


green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// inicia o game
playGame();