import state from './state.js';
import * as timer from './timer.js';
import * as el from './elements.js';
import * as sounds from './sounds.js';

export function toggleRunning(){
    state.isRunning = document.documentElement.classList.toggle('running');
    // state.isRunning = !state.isRunning;

    timer.execute();
    sounds.BUTTON_PRESS_AUDIO.play();
}

export function resetTimer(){
    state.isRunning = false;
    document.documentElement.classList.remove('running');
    
    timer.updateDisplay();
    sounds.BUTTON_PRESS_AUDIO.play();
}

export function setTimer(){
    el.MINUTES.setAttribute('contenteditable', true);
    el.MINUTES.focus();
}

export function toggleMusic(){
    state.isMute = document.documentElement.classList.toggle('music-on');
    // state.isMute = !state.isMute;

    if (state.isMute){
        sounds.BG_AUDIO.play();
        return;
    }

    sounds.BG_AUDIO.pause();
}
