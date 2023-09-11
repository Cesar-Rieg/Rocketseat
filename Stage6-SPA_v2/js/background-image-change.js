import {
    MOUNTAINS_UNIVERSE_1,
    MOUNTAINS_UNIVERSE_2,
    MOUNTAINS_UNIVERSE_3
} from './constants.js';

export function backgroundImageChange(route){
    const body = document.querySelector('body');

    switch (route) {
        case '/':
            body.style.backgroundImage = `url(${MOUNTAINS_UNIVERSE_1})`;
            break;

        case '/o-universo':
            body.style.backgroundImage = `url(${MOUNTAINS_UNIVERSE_2})`;
            break;

        case '/exploracao':
            body.style.backgroundImage = `url(${MOUNTAINS_UNIVERSE_3})`;
            break;

        default:
            break;
    }
}
