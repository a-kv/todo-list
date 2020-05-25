export const saveState = (key, state) => {
    let stateAsString = JSON.stringify(state)
    localStorage.setItem(key, stateAsString)
}
export const restoreStore = (key, defaultState) => {

    let stateAsString = localStorage.getItem(key);
    if (stateAsString) {
        defaultState = JSON.parse(stateAsString);
    }
    return defaultState;
}

