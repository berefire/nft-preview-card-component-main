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

/**
 * Returns the first element of a collection.
 * Returns null when the collection is empty.
 */
export function getFirstElement(collection){
    if (!isCollection(collection)){
        throw new Error(`[DOM] getFirstElement expects a NodeList or HTMLCollection`);
    }

    return collection[0] ?? null;
}

export function addSafeEventListener(element, event, handler, context = "unknown") {
    if (!isValidElement(element)){
        throw new Error(`[${context}] Invalid element passed to addSafeEventListener: ${element}`);
    }

    if (isCollection(element)){
        Array.from(element).forEach( el => el.addEventListener(event, handler));
        return;
    }

    element.addEventListener(event, handler);
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