import { CONTROLS } from './elements.js';
import * as actions from './actions.js';
import * as el from './elements.js';
import state from './state.js';
import { updateDisplay } from './timer.js';

export function registerControls(){
    CONTROLS.addEventListener('click', (event) => {
        // Captura a action clicada
        const action = event.target.dataset.action;

        // Valida se a "action" chamada dentro das "actions" é uma função
        if (typeof actions[action] != "function") return;

        // Se a "action" (que pode ser "toggleRunning") for uma function, executa ela
        // Das actions, invoca a action clicada
        actions[action]();
    });
}

export function setMinutes() {
    el.MINUTES.addEventListener('focus', () => {
        el.MINUTES.textContent = "";
    })

    el.MINUTES.onkeypress = (event) => {
        //regex
        return /\d/.test(event.key)
    }

    el.MINUTES.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent;

        time = time > 60 ? 60 : time;

        state.minutes = time;
        state.seconds = 0;

        updateDisplay();

        el.MINUTES.removeAttribute('contenteditable');
    })
}