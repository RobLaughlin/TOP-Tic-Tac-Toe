const TicTacToe = (function() {
    const PLAYERS = ['X', 'O'];
    

    let game = (function() {
        let currentPlayer = 0;
        let board = [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', '']
        ];

        let playMove = function(row, col) {
            if (row < 0 || row >= board.length || col < 0 || col > board[0].length) {
                throw new RangeError("Row and column must be between 0 and 2 inclusive.");
            }
            
            if (board[row][col] !== '') {
                throw new Error(`Square already filled with an ${board[row][col]}.`);
            }

            board[row][col] = PLAYERS[currentPlayer];

            // Swap players
            currentPlayer = (currentPlayer + 1) % PLAYERS.length;
        };

        const getSquare = function(row, col) {
            if (row < 0 || row >= board.length || col < 0 || col > board[0].length) {
                throw new RangeError("Row and column must be between 0 and 2 inclusive.");
            }

            return board[row][col];
        };

        const getBoard = function() {
            return board.map(row => {
                return row.slice();
            });
        };

        const getCurrentPlayer = () => { return PLAYERS[currentPlayer]; }

        return { playMove, getSquare, getBoard, getCurrentPlayer };
    })();

    return { game };
})();

console.log(TicTacToe.game);