const TOOLS = ["Rock", "Paper", "Scissors"]

function computerPlay() {
    return TOOLS[Math.floor(Math.random()*3)];
}

function playRound(playerSelection, computerSelection, win) {
    if (playerSelection == computerSelection) {
        return [`You Tie! ${playerSelection} cancels ${computerSelection}`, win];
    }
    else if ((playerSelection == TOOLS[0] && computerSelection == TOOLS[1]) 
        || (playerSelection == TOOLS[1] && computerSelection == TOOLS[2])
        || (playerSelection == TOOLS[2] && computerSelection == TOOLS[0])) {
            return [`You Lose! ${computerSelection} beats ${playerSelection}`, --win];
    }
    else if ((playerSelection == TOOLS[0] && computerSelection == TOOLS[2]) 
        || (playerSelection == TOOLS[1] && computerSelection == TOOLS[0])
        || (playerSelection == TOOLS[2] && computerSelection == TOOLS[1])) {
            return [`You Win! ${playerSelection} beats ${computerSelection}`, ++win];
    }
    else {
        return ["", win];
    }
}

let playerSelection = () => 
    prompt("What do you choose? (Rock, Paper or Scissors)")
        .trim()
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase());

function game() {
    let win = 0;
    let message = null;
    for (let i = 0; i < 5; i++) {
        result = playRound(playerSelection(), computerPlay(), win);
        message = result[0];
        win = result[1]
        if (message == "") {
            console.log("Invalid input! Only Rock, Paper or Scissors allowed");
            i--
        }
        else {
            console.log(message);
            console.log(win);
        }
    }
}

game();