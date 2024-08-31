import TicTacToe from "./TicTacToe.js";
import PubSub from "./PubSub.js";

function movePlayed(game) {
    console.log(game.getBoardStr());
};

PubSub.subscribe("movePlayed", movePlayed);

TicTacToe.game.playMove(2,2);
TicTacToe.game.playMove(2,1);

PubSub.unsubscribe("movePlayed", movePlayed);
TicTacToe.game.playMove(2,0); // Should not display in console