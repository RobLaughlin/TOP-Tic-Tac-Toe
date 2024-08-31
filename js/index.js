import TicTacToe from "./TicTacToe.js";
import PubSub from "./PubSub.js";

const Index = (function() {
    function render(data) {
        const { player, square, gameState } = data;
        const targetSquareIdx = square.row * 3 + square.col;
        
        const board = document.getElementById("TTTBoard");
        let targetSquare = board.getElementsByClassName("square")[targetSquareIdx];
        targetSquare.classList.add(player);
        console.log(gameState);
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
        TicTacToe.game.playMove(2,2);
        TicTacToe.game.playMove(2,1);
    
        document.querySelectorAll("#TTTBoard > .square").forEach(square => {
            square.addEventListener("click", squareClicked);
        });
    }

    return { init }
})();

Index.init();


