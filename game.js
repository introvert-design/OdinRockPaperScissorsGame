const TOOLS = ["rock", "paper", "scissors"]
let machineScore = 0;
let humanScore = 0;

const buttons = document.querySelectorAll('.user-choice');
const restart = document.querySelector('.restart');

const getComputerChoice = () => TOOLS[Math.floor(Math.random()*3)];

const getPlayerChoice = (event) => {
    let playerSelection = event.target.value;
    if (playerSelection) {
        return playerSelection.toLowerCase();
    }
    return event.target.textContent.toLowerCase();
}

const isPlayerChoiceValid = (playerSelection) => 
    playerSelection === "rock" || playerSelection === "paper" || playerSelection === "scissors";

function displayResult(elt, message) {
    const selectElement = document.querySelector(elt)
    selectElement.textContent = message;
}

function disableButton(button) {
    button.classList.add('disabled');
    button.disabled = true;
}

function disableGame() {
    buttons.forEach(button => disableButton(button));
    restart.style.display = 'inline-block';
}

function checkWhetherGameOver(machineScore, humanScore) {
    if (machineScore >= 5) {
        displayResult('.final-result', 'You lost! Game Over...');
        disableGame();
    }
    else if (humanScore >= 5) {
        displayResult('.final-result', 'You beat the crap out of machines!');
        disableGame();
    }
}

function playRound(event) {
    let playerSelection = getPlayerChoice(event);
    let computerSelection = getComputerChoice();
    if (!isPlayerChoiceValid(playerSelection)) {
        displayResult('.play-round-result', `Invalid Input`);
        return;
    }
    if (computerSelection == playerSelection) {
        displayResult('.play-round-result', `You Tie! ${playerSelection} cancels ${computerSelection}`);
        return;
    }
    if ((playerSelection == TOOLS[0] && computerSelection == TOOLS[1]) 
        || (playerSelection == TOOLS[1] && computerSelection == TOOLS[2])
        || (playerSelection == TOOLS[2] && computerSelection == TOOLS[0])) {
        displayResult('.play-round-result', `You Lose! ${computerSelection} beats ${playerSelection}`);
        return 1;
    }
    displayResult('.play-round-result', `You Win! ${playerSelection} beats ${computerSelection}`);
    return 2;
}

function game(event) {
    let playRoundResult = playRound(event);
    if (playRoundResult === 1) {
        displayResult('.machine-score', ++machineScore);
    }
    if (playRoundResult === 2) {
        displayResult('.human-score', ++humanScore);
    }
    checkWhetherGameOver(machineScore, humanScore);
}

buttons.forEach(button => button.addEventListener('click', game));

const resetGame = () => location.reload();

restart.addEventListener('click', resetGame);
