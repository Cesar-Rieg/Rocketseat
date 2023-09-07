import state from './state.js';
import * as timer from './timer.js';

export function toggleRunning(){
    state.isRunning = document.documentElement.classList.toggle('running');
    // state.isRunning = !state.isRunning;

    timer.exeute();
}

export function resetTimer(){
    state.isRunning = false;
    document.documentElement.classList.remove('running');
    
    timer.updateDisplay();
}

export function setTimer(){

}

export function toggleMusic(){
    state.isMute = document.documentElement.classList.toggle('music-on');
    // state.isMute = !state.isMute;
}
