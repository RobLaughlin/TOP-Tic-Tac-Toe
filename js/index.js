import TicTacToe from "./TicTacToe.js";
import PubSub from "./PubSub.js";

const Index = (function() {
    function render(data) {
        const { player, board, gameState } = data;

        const boardElem = document.getElementById("TTTBoard");
        let squares = boardElem.getElementsByClassName("square");
        for (let i = 0; i < squares.length; i++) {
            let square = squares[i];
            const squareIdx = square.dataset.index;
            const row = Math.floor((squareIdx-1) / 3);
            const col = (squareIdx-1) % 3;

            if (board[row][col] !== '_') {
                square.classList.add(board[row][col]);
            }
            else {
                square.classList.remove('X');
                square.classList.remove('O');
            }
        }

        // Render the current player's turn
        let playerIcon = boardElem.parentNode.querySelector("#TTTWinner > .playerIcon");
        playerIcon.classList.remove(player);
        
        // Render the game state
        let winnerText = boardElem.parentNode.querySelector("#TTTWinner > .TTTWinnerText");
        switch (gameState) {
            case "PLAYING": 
                playerIcon.classList.add(player === 'X' ? 'O' : 'X');
                break;
            case "DRAW":
                playerIcon.classList.remove(player);
                winnerText.textContent = "Draw!";
                break;
            case "WINNER":
                playerIcon.classList.add(player);
                winnerText.textContent = "'s Wins!";
                break;
            default: break;
        }
    };

    function squareClicked(e) {
        const squareIdx = e.target.dataset.index;
        const row = Math.floor((squareIdx-1) / 3);
        const col = (squareIdx-1) % 3;
        try {
            TicTacToe.game.playMove(row, col);
        } catch {};
    }

    function init() {
        PubSub.subscribe("render", render);
    
        document.querySelectorAll("#TTTBoard > .square").forEach(square => {
            square.addEventListener("click", squareClicked);
        });
    }

    return { init }
})();

Index.init();


