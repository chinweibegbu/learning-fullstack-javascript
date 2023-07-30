// All code should be written in this file.
let playerOneMoveOneType, playerOneMoveOneValue;
let playerOneMoveTwoType, playerOneMoveTwoValue;
let playerOneMoveThreeType, playerOneMoveThreeValue;
let playerTwoMoveOneType, playerTwoMoveOneValue;
let playerTwoMoveTwoType, playerTwoMoveTwoValue;
let playerTwoMoveThreeType, playerTwoMoveThreeValue;

function checkTypes(types) {
    // Check if type is undefined
    if (types.includes(undefined)) {
        return false;
    }

    // Check if type is valid
    for (let i=0; i<types.length; i++) {
        let type = types[i];
        if ((type !== 'rock') && (type !== 'paper') && (type !== 'scissors')) {
            return false;
        }
    }

    return true;
}

function checkValues(values) {
    // Check if value is undefined
    if (values.includes(undefined)) {
        return false;
    }

    // Check individual values
    const totalValue = values.reduce((accumulator, value) => {
        return accumulator + value;
    })
    if (totalValue > 99) {
        return false;
    }

    // Check sum value
    for (let i=0; i<values.length; i++) {
        let value = values[i];
        if ((value < 1 ) || (value > 99)) {
            return false;
        }
    }

    return true;
}

function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
    // Check passed types and values
    const types = [moveOneType, moveTwoType, moveThreeType];
    const values = [moveOneValue, moveTwoValue, moveThreeValue];
    if ((checkTypes(types) === false) || (checkValues(values) === false)) {
        return;
    }


    if (player === 'Player One') {
        playerOneMoveOneType = moveOneType;
        playerOneMoveOneValue = moveOneValue;
        playerOneMoveTwoType = moveTwoType;
        playerOneMoveTwoValue = moveTwoValue;
        playerOneMoveThreeType = moveThreeType;
        playerOneMoveThreeValue = moveThreeValue;
    } else if (player === 'Player Two') {
        playerTwoMoveOneType = moveOneType;
        playerTwoMoveOneValue = moveOneValue;
        playerTwoMoveTwoType = moveTwoType;
        playerTwoMoveTwoValue = moveTwoValue;
        playerTwoMoveThreeType = moveThreeType;
        playerTwoMoveThreeValue = moveThreeValue;
    }
}

function getRoundWinner(roundNumber) {
    // Check round number
    if ((roundNumber < 1) || (roundNumber > 3)) {
        return null;
    }

    let playerOneType, playerOneValue;
    let playerTwoType, playerTwoValue;
    let roundWinner;
    if (roundNumber === 1) {
        // Check if any attribute is undefined
        const attributes = [playerOneMoveOneType, playerOneMoveOneValue, playerTwoMoveOneType, playerTwoMoveOneValue];
        if (attributes.includes(undefined)) {
            return null;
        }

        // Set attributes
        playerOneType = playerOneMoveOneType;
        playerOneValue = playerOneMoveOneValue;
        playerTwoType = playerTwoMoveOneType;
        playerTwoValue = playerTwoMoveOneValue;
    } else if (roundNumber === 2)  {
        // Check if any attribute is undefined
        const attributes = [playerOneMoveTwoType, playerOneMoveTwoValue, playerTwoMoveTwoType, playerTwoMoveTwoValue];
        if (attributes.includes(undefined)) {
            return null;
        }

        // Set attributes
        playerOneType = playerOneMoveTwoType;
        playerOneValue = playerOneMoveTwoValue;
        playerTwoType = playerTwoMoveTwoType;
        playerTwoValue = playerTwoMoveTwoValue;
    } else if (roundNumber === 3) {
        // Check if any attribute is undefined
        const attributes = [playerOneMoveThreeType, playerOneMoveThreeValue, playerTwoMoveThreeType, playerTwoMoveThreeValue];
        if (attributes.includes(undefined)) {
            return null;
        }

        // Set attributes
        playerOneType = playerOneMoveThreeType;
        playerOneValue = playerOneMoveThreeValue;
        playerTwoType = playerTwoMoveThreeType;
        playerTwoValue = playerTwoMoveThreeValue;
    }

    if (playerOneType === playerTwoType) {
        if (playerOneValue > playerTwoValue) {
            roundWinner = 'Player One';
        } else if (playerOneValue < playerTwoValue) {
            roundWinner = 'Player Two';
        } else {
            roundWinner = 'Tie';
        }
    } else {
        if (
            ((playerOneType === "rock") && (playerTwoType === "scissors")) ||
            ((playerOneType === "paper") && (playerTwoType === "rock")) ||
            ((playerOneType === "scissors") && (playerTwoType === "paper"))
        ) {
            roundWinner = 'Player One';
        } else if (
            ((playerOneType === "scissors") && (playerTwoType === "rock")) ||
            ((playerOneType === "rock") && (playerTwoType === "paper")) ||
            ((playerOneType === "paper") && (playerTwoType === "scissors"))
         ) {
            roundWinner = 'Player Two';
        }
    }
    return roundWinner;
}

function getGameWinner() {
    const winners = [getRoundWinner(1), getRoundWinner(2), getRoundWinner(3)];

    // Check if any attribute is undefined
    if (winners.includes(null)) {
        return null;
    }

    const oneWinnerCount = winners.filter((winner) => winner === 'Player One').length;
    const twoWinnerCount = winners.filter((winner) => winner === 'Player Two').length;
    const tieWinnerCount = winners.filter((winner) => winner === 'Tie').length;

    if (oneWinnerCount === 2) {
        return 'Player One';
    } else if (twoWinnerCount === 2) {
        return 'Player Two';
    } else if ((tieWinnerCount === 2) || ((oneWinnerCount === 1) && (twoWinnerCount === 1) && (tieWinnerCount === 1))) {
        return 'Tie';
    }
}

function setComputerMoves() {
    const validMoveTypes = ['rock', 'paper', 'scissors'];
    let maxValue = 99;

    // Set move one attributes
    computerTypeIndex1 = Math.floor(Math.random() * 3);
    playerTwoMoveOneType = validMoveTypes[computerTypeIndex1];
    playerTwoMoveOneValue = Math.floor(Math.random() * maxValue);

    maxValue -= playerTwoMoveOneValue;

    // Set move two attributes
    computerTypeIndex2 = Math.floor(Math.random() * 3);
    playerTwoMoveTwoType = validMoveTypes[computerTypeIndex2];
    playerTwoMoveTwoValue = Math.floor(Math.random() * maxValue);

    maxValue -= playerTwoMoveTwoValue;

    // Set move three attributes
    computerTypeIndex3 = Math.floor(Math.random() * 3);
    playerTwoMoveThreeType = validMoveTypes[computerTypeIndex3];
    playerTwoMoveThreeValue = maxValue;
}
