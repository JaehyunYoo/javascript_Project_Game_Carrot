'use strict';

const carrotSound = new Audio('sound/carrot_pull.mp3');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const winSound = new Audio('sound/game_win.mp3');

export function PlayCarrot(){
    playSound(carrotSound);
}

export function Playbug(){
    playSound(bugSound);
}

export function PlayAlert(){
    playSound(alertSound);
}

export function PlayWin(){
    playSound(winSound);
}

export function PlayBackground(){
    playSound(bgSound);
}

export function stopBackground(){
    stopSound(bgSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}