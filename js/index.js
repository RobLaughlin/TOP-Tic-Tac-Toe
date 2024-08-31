import TicTacToe from "./TicTacToe.js";
import PubSub from "./PubSub.js";

const Index = (function() {
    function render(data) {
        const { player, board, gameState } = data;
        console.log(board);
        const boardElem = document.getElementById("TTTBoard");
        let squares = boardElem.getElementsByClassName("square");
        console.log(squares.length);
        for (let i = 0; i < squares.length; i++) {
            let square = squares[i];
            // console.log(square);
            const squareIdx = square.dataset.index;
            // console.log(squareIdx);
            const row = Math.floor((squareIdx-1) / 3);
            const col = (squareIdx-1) % 3;
            if (board[row][col] !== '_') {
                square.classList.add(board[row][col]);
            }
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


