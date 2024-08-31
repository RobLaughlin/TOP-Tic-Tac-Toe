import PubSub from "./PubSub.js";

const TicTacToe = (function() {
    let game = (function() {
        const PLAYERS = ['X', 'O'];
        const GAME_STATES = ['PLAYING', 'WINNER', 'DRAW'];

        let currentPlayer = 0;
        let gameState = 0;
        let movesPlayed = 0;
        let board = [
            ['_', '_', '_'], 
            ['_', '_', '_'], 
            ['_', '_', '_']
        ];

        let playMove = function(row, col) {
            if (!squareInBounds(row, col)) {
                throw new RangeError("Row and column must be between 0 and 2 inclusive.");
            }
            
            if (board[row][col] !== '_') {
                throw new Error(`Square already filled with an ${board[row][col]}.`);
            }

            if (gameState === 1) {
                throw new Error("A winner for this game already exists!");
            }
            else if (gameState === 2) {
                throw new Error("The game already ended in a draw.");
            }

            board[row][col] = PLAYERS[currentPlayer];
            movesPlayed++;

            // Swap players
            currentPlayer = (currentPlayer + 1) % PLAYERS.length;

            const winner = checkWinner();

            // Assumes a square board
            // Determines a draw
            if ((!winner && movesPlayed) === (board.length * board[0].length)) {
                gameState = 2;
            }
            else if (winner) {
                gameState = 1;
            };

            PubSub.publish("movePlayed", this);
        };


        const checkWinner = function() {
            // Game board must be 3x3 for this to work
            const allEqual = (arr) => {
                return (arr[0] == arr[1]) && (arr[1] == arr[2]) && !(arr.some(elem => { return elem === '_'}));
            };

            const lDiag = [board[0][0], board[1][1], board[2][2]];
            const lDiagWinner = allEqual(lDiag);
            if (lDiagWinner) { return true; }

            const rDiag = [board[0][2], board[1][1], board[2][0]];
            const rDiagWinner = allEqual(rDiag);
            if (rDiagWinner) { return true; }

            const rowWinner = board.some(row => { return allEqual(row); });
            if (rowWinner) { return true; }

            for (let i = 0; i < board[0].length; i++) {
                const col = [board[0][i], board[1][i], board[2][i]];
                if (allEqual(col)) { return true; }
            }

            return false;
        };

        const squareInBounds = function(row, col) {
            return !(row < 0 || row >= board.length || col < 0 || col >= board[0].length);
        };

        const getSquare = function(row, col) {
            if (!squareInBounds(row, col)) {
                throw new RangeError("Row and column must be between 0 and 2 inclusive.");
            }

            return board[row][col];
        };

        const getBoard = function() {
            return board.map(row => {
                return row.slice();
            });
        };

        const getBoardStr = function() {
            return getBoard().map(row => {
                return row.join("|")
            }).join("\n");
        };

        const getCurrentPlayer = () => { return PLAYERS[currentPlayer]; };

        return { playMove, getSquare, getBoard, getCurrentPlayer, getBoardStr };
    })();

    return { game };
})();

export default TicTacToe;