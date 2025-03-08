const gameboard = (function () {
    const gameboardArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const getGameboard = () => gameboardArray;
    const modifyGameboard = (index, value) => gameboardArray[index] = value;
    return {getGameboard, modifyGameboard};
})();


const game = (function (){
    let currentPlayer;
    do{
        currentPlayer = prompt("Initial Player (X or O) : ");
    }
    while(currentPlayer != 'X' && currentPlayer != 'O');
    const getCurrentPlayer = () => currentPlayer;
    const changeCurrentPlayer = () => {
        if(getCurrentPlayer() === 'X')
            currentPlayer = 'O';
        else
            currentPlayer = 'X';
    };
    const showGameboard = () => {
        const tempGameboardArray = gameboard.getGameboard();
        console.log(`${tempGameboardArray[0]} | ${tempGameboardArray[1]} | ${tempGameboardArray[2]}`);
        console.log(`${tempGameboardArray[3]} | ${tempGameboardArray[4]} | ${tempGameboardArray[5]}`);
        console.log(`${tempGameboardArray[6]} | ${tempGameboardArray[7]} | ${tempGameboardArray[8]}`);
    };
    const play = () => {
        let character = getCurrentPlayer();
        const tempGameboardArray = gameboard.getGameboard()
        let round;
        let result;
        do{
            round = prompt(`Player ${character}, choose an index between 0 and 8 : `);
            if(parseInt(round) <= 8 && parseInt(round) >= 0 &&  tempGameboardArray[parseInt(round)] === ' '){
                gameboard.modifyGameboard(parseInt(round), character);
                result = true;
            }
            else
                result = false;
        }
        while(result === false);
    };

    const checkVertical = () => {
        const character = getCurrentPlayer();
        const tempGameboardArray = gameboard.getGameboard();
        if((tempGameboardArray[0] === character && tempGameboardArray[3] === character && tempGameboardArray[6] === character) || (tempGameboardArray[1] === character && tempGameboardArray[4] === character && tempGameboardArray[7] === character) || (tempGameboardArray[2] === character && tempGameboardArray[5] === character && tempGameboardArray[8] === character))
            return true;
        else
            return false;
    };

    const checkHorizontal = () => {
        const character = getCurrentPlayer();
        const tempGameboardArray = gameboard.getGameboard();
        if((tempGameboardArray[0] === character && tempGameboardArray[1] === character && tempGameboardArray[2] === character) || (tempGameboardArray[3] === character && tempGameboardArray[4] === character && tempGameboardArray[5] === character) || (tempGameboardArray[6] === character && tempGameboardArray[7] === character && tempGameboardArray[8] === character))
            return true;
        else
            return false;
    };

    const checkDiagonal = () => {
        const character = getCurrentPlayer();
        const tempGameboardArray = gameboard.getGameboard();
        if((tempGameboardArray[0] === character && tempGameboardArray[4] === character && tempGameboardArray[8] === character) || (tempGameboardArray[2] === character && tempGameboardArray[4] === character && tempGameboardArray[6] === character))
            return true;
        else
            return false;
    };

    const checkFull = () => {
        const tempGameboardArray = gameboard.getGameboard();
        for(let i = 0; i <= 8; ++i){
            if(tempGameboardArray[i] === ' ')
                return false;
        }
        return true;
    };
    const checkEnd = () => {
        const character = getCurrentPlayer();
        if(checkDiagonal() || checkHorizontal() || checkVertical())
            return character;
        else if(checkFull())
            return 'D';
        else
            return '/';
    };
    return {getCurrentPlayer, changeCurrentPlayer, checkEnd, showGameboard, play};
})();

const Player = (name, character) => {
    const getName = () => name;
    const getCharacter = () => character;
    return {getName, getCharacter};
};

let start = prompt("Start the game ? ");
if(start !== "n"){
    const pl1 = Player("Mark", 'X');
    const pl2 = Player("Twain", 'O');
    game.showGameboard();
    do{
        game.play();
        game.showGameboard();
        console.log("\n");
        if(game.checkEnd() === '/')
            game.changeCurrentPlayer();
    }
    while(game.checkEnd() === '/');
    if(game.checkEnd() === 'D')
        console.log("Draw.");
    else{
        if(pl1.getCharacter() == game.getCurrentPlayer())
            console.log(`${pl1.getName()}, you won the game !`);
        else
            console.log(`${pl2.getName()}, you won the game !`);

    }
}