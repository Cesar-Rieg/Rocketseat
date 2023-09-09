import state from './state.js';
import * as el from './elements.js';
import {resetTimer} from './actions.js';
import * as sounds from './sounds.js';

export function execute(){
    clearTimeout(state.executionId);

    if (!state.isRunning) return;

    let minutes = Number(el.MINUTES.textContent);
    let seconds = Number(el.SECONDS.textContent);


    seconds--;

    if (seconds < 0){
        seconds = 59;
        minutes--;
    } 

    if (minutes < 0) {
        resetTimer();
        sounds.KICHEN_TIMER.play();
        return;
    }

    updateDisplay(minutes, seconds);

    // callback function que irá invocar o método execute() a cada 1 segundo
    state.executionId = setTimeout(() => {
        execute();
    }, 1000);
}

export function updateDisplay(minutes, seconds){
    minutes = minutes ?? state.minutes;
    seconds = seconds ?? state.seconds;

    el.MINUTES.textContent = String(minutes).padStart(2, "0");
    el.SECONDS.textContent = String(seconds).padStart(2, "0");
}