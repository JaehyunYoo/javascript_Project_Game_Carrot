"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel'
})
// Builder Patten
export class GameBuilder{
    withGameDuration(duration){
        this.withGameDuration = duration;
        return this;
    }

    withCarrotCount(num){
        this.withCarrotCount = num;
        return this;
    }

    withBugCount(num){
        this.withBugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.withGameDuration,
            this.withCarrotCount,
            this.withBugCount
        );
    }
}

class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameStartBtn = document.querySelector(".game__button");

    this.gameStartBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameScore = document.querySelector(".game__score");
    this.gameTime = document.querySelector(".game__timer");
    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
    this.started = false;
    this.timer = undefined;
    this.score = 0;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showScoreAndTime();
    this.gameTimer();
    sound.PlayBackground();
  }
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.onGameStop && this.onGameStop(Reason.cancel);

    sound.PlayAlert();
    sound.stopBackground();
  }
  finshGame(win) {
    this.started = false;
    this.hideGameButton();

    if (win) {
      sound.PlayWin();
    } else {
      sound.Playbug();
    }
    this.stopGameTimer();
    this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);
    sound.stopBackground();
  }
  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.finshGame(true);
      }
    } else if (item === "bug") {
      this.finshGame(false);
    }
  };

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
  initGame() {
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }
  gameTimer() {
    let remainingTime = this.gameDuration;
    this.updateTimerText(remainingTime);
    this.timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(this.timer);
        this.finshGame(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTime);
    }, 1000);
  }
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTime.innerText = `${minutes}:${seconds}`;
  }
  // Show hide Text and button
  showStopButton() {
    const icon = document.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameStartBtn.style.visibility = "visible";
  }
  hideGameButton() {
    this.gameStartBtn.style.visibility = "hidden";
  }

  showScoreAndTime() {
    this.gameScore.style.visibility = "visible";
    this.gameTime.style.visibility = "visible";
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }
}
