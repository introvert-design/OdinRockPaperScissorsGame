const TOOLS = ["Rock", "Paper", "Scissors"]
let machineScore = 0;
let humanScore = 0;

const buttons = () => document.querySelectorAll('.user-choice');
const restart = () => document.querySelector('.restart');

const computerPlay = () => TOOLS[Math.floor(Math.random()*3)];

function disableButton(button) {
    button.classList.add('disabled');
    button.disabled = true;
}

function displayResult(elt, content) {
    const selectElement = document.querySelector(elt)
    selectElement.textContent = content;
}

function resetGame() {
    location.reload();
}

function playRound(event) {
    computerSelection = computerPlay();
    playerSelection = event.target.value;
    if (playerSelection == computerSelection) {
        content = `You Tie! ${playerSelection} cancels ${computerSelection}`;
        displayResult('.play-round-result', content)
    }
    else if ((playerSelection == TOOLS[0] && computerSelection == TOOLS[1]) 
        || (playerSelection == TOOLS[1] && computerSelection == TOOLS[2])
        || (playerSelection == TOOLS[2] && computerSelection == TOOLS[0])) {
            content = `You Lose! ${computerSelection} beats ${playerSelection}`;
            displayResult('.play-round-result', content);
            machineScore++;
            displayResult('.machine-score', machineScore);
            if (machineScore === 5) {
                content = 'You lost! Game Over...';
                displayResult('.final-result', content);
            }
    }
    else {
        content = `You Win! ${playerSelection} beats ${computerSelection}`;
        displayResult('.play-round-result', content);
        humanScore++;
        displayResult('.human-score', humanScore);
        if (humanScore === 5) {
            content = 'You beat the crap out of machines!';
            displayResult('.final-result', content);
        }
    }
    if (machineScore >= 5 || humanScore >= 5) {
        buttons().forEach(button => disableButton(button));
        restart().style.display = 'inline-block';
    }
}

buttons().forEach(button => button.addEventListener('click', playRound));
restart().addEventListener('click', resetGame);
