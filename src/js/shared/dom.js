import { REQUIRED_ELEMENTS } from '@js/shared/constants.js';

const SELECTORS = {
    // Images
    cardImage: ".card__image",
    avatarIcon: ".avatar-icon",
}

function isCollection(value){
    return (value instanceof NodeList || value instanceof HTMLCollection);
}

function isValidElement(value){
    if ( value instanceof Element){
        return true;
    }

    if (isCollection(value)){
        return value.length > 0;
    }

    return false;
}

function initDOMElements(){
    const DOM = {
        // Images
        cardImage: document.querySelector(SELECTORS.cardImage),
        avatarIcon: document.querySelector(SELECTORS.avatarIcon),
    };

    Object.entries(DOM).forEach(([key, element]) => {
        const isRequired = REQUIRED_ELEMENTS.includes(key);

        if( isRequired && !isValidElement(element)) {
            throw new Error(`[DOM] Missing required element: ${key}`);
        }
    });

    return Object.freeze(DOM);
}

export const DOM = initDOMElements();