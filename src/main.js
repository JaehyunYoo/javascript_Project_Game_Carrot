"use strict";

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';


const gameFinishPopUp = new PopUp();
const game = new GameBuilder()
.withGameDuration(8)
.withCarrotCount(11)
.withBugCount(25)
.build();


gameFinishPopUp.setClickListener(() => {
    game.start();
});
game.setGameStopListener((reason) => {
    let message;
    switch(reason){
        case Reason.cancel :
            message = 'REPLAY ❓';
        break;
        case Reason.win :
            message = 'YOU WIN ⛅';
        break;
        case Reason.lose :
            message = 'YOU FAIL 🤪 💢';
        break;
        default:
            throw new Error('not valid reson');
    }
    gameFinishPopUp.showWithText(message);
});











