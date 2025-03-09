const gameboard = (function () {
    const gameboardArray = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    const getGameboard = () => gameboardArray;
    const modifyGameboard = (index, value) => gameboardArray[index] = value;
    return {getGameboard, modifyGameboard};
})();


const game = (function (){
    let currentPlayer = 'X';
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
    const play = (index) => {
        let character = getCurrentPlayer();
        const tempGameboardArray = gameboard.getGameboard()
        tempGameboardArray[index] = character;
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

const displayController = (function (){
    const updateDisplay = () => {
        const tempGameboardArray = gameboard.getGameboard();
        const cells = document.querySelectorAll(".gameboard div");
        for(let i = 0; i <= 8; ++i){
            cells[i].textContent = tempGameboardArray[i];
        }
    }

    const updateCell = (e) => {
        if(game.checkEnd() === '/'){
            if(e.target.textContent === ' '){
                let index = parseInt(e.target.className.slice(-1));
                game.play(index);
                updateDisplay();
                if(game.checkEnd() !== game.getCurrentPlayer()){
                    if(game.checkEnd() === 'D'){
                        const result = document.querySelector(".result");
                        result.textContent = "Draw";
                    }
                    else{
                        game.changeCurrentPlayer();
                        const turn = document.querySelector(".turn");
                        turn.textContent = `Turn of player with character : ${game.getCurrentPlayer()}`;
                    }
                }
                else{
                    const result = document.querySelector(".result")
                    result.textContent = `Player with ${game.getCurrentPlayer()} has won`;
                }
            }
        }
    };

    return {updateDisplay, updateCell};
})();

displayController.updateDisplay();
const cells = document.querySelectorAll(".gameboard div");
for(const cell of cells){
    cell.addEventListener("click", displayController.updateCell);
}
