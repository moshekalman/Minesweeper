'use strict';

localStorage.clear();

const PLAYER_NAME = document.getElementById('name');
const BTN_INSERT = document.getElementById('btnInsert');
const BEST_SCORES = document.getElementById('best');
var bestScores = {
    easy: Infinity,
    medium: Infinity,
    hard: Infinity
};

BTN_INSERT.onclick = function () {
    const CURR_NAME = PLAYER_NAME.value;
    const CURR_LEVEL = gCurrLevel;
    const SCORE = gTimer;
    localStorage.setItem(`${CURR_NAME}-${CURR_LEVEL}`, SCORE);
    for (var i = 0; i < localStorage.length; i++) {
        const KEY = localStorage.key(i);
        const VALUE = localStorage.getItem(KEY);
        if (+VALUE < bestScores[`${CURR_LEVEL}`]) {
            bestScores[`${CURR_LEVEL}`] = +VALUE;
            var elCurrLevel = document.getElementById(`${CURR_LEVEL}`);
            elCurrLevel.innerText = `${CURR_NAME}- ${VALUE}s`;
        }
    }
};

function showNameFieldset() {
    var elFieldset = document.querySelector('.player-name');
    elFieldset.classList.add('show');
}

function hideNameFieldset() {
    var elFieldset = document.querySelector('.player-name');
    elFieldset.classList.remove('show');
}