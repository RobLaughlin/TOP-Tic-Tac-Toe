import TicTacToe from "./TicTacToe.js";
import PubSub from "./PubSub.js";

function render(data) {
    const { player, square, gameState } = data;
    console.log(player);
    console.log(square);
    console.log(gameState);
};

PubSub.subscribe("render", render);

TicTacToe.game.playMove(2,2);
TicTacToe.game.playMove(2,1);

PubSub.unsubscribe("render", render);
TicTacToe.game.playMove(2,0); // Should not display in console