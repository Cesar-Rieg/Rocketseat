import { CONTROLS } from './elements.js';
import * as actions from './actions.js';

export function registerControls(){
    CONTROLS.addEventListener('click', (event) => {
        // Captura a action clicada
        const action = event.target.dataset.action;

        // Valida se a "action" chamada dentro das "actions" é uma função
        if (typeof actions[action]() != function) return;

        // Se a "action" (que pode ser "toggleRunning") for uma function, executa ela
        // Das actions, invoca a action clicada
        actions[action]();
    });
}