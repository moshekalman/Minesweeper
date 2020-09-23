'use strict';
const MINE = '💣';
const FLAG = '🚩';
const EMPTY = ' ';

const LOSE_EMO = ' 💀';
const WIN_EMO = '😎';
const DOUBT_EMO = '😯';
const NORMAL_EMO = '🙂';
const LIVE = '💖';
const LIVE_DOWN = '💔';

var gElEmoji = document.querySelector('.emoji');
var gElLives = document.querySelector('.lives');
var gEmoInterval; //to clear doubt face after win
var gBoard;
var gGame;
var gLivesCount;
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gPrevLevel = gLevel;

//dissable right click
document.addEventListener('contextmenu', event => event.preventDefault());

// resets init with the chosen diff
function resetGame(elCell) {
    if (!gGame.isOn) toggleGameOver();
    gElEmoji.innerText = NORMAL_EMO;
    console.log(elCell.innerText);
    switch (elCell.innerText.toLowerCase()) {
        case 'easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;
        case 'medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            break;
        case 'hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            break;
        default:
            gLevel.SIZE = gPrevLevel.SIZE;
            gLevel.MINES = gPrevLevel.MINES;
    }
    gPrevLevel = gLevel;
    init();

}

function init() {
    gLivesCount = 3;
    gElLives.innerText = `${LIVE + LIVE + LIVE}`;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard, '.board-container');
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };

}

function buildBoard(SIZE = 4) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = {
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            };
        }
    }
    setMines(board, SIZE);
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            board[i][j].minesAroundCount = getMinesNegsCount(board, i, j);
        }
    }
    console.table(board);
    return board;
}

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            // var cell = (mat[i][j].isMine) ? MINE : mat[i][j].minesAroundCount; //dev cheats
            var cellCoord = `cell-${i}-${j}`;
            strHTML += `<td class="cell" id=${cellCoord} onmouseup="cellclicked(event, this)"></td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}



//some modals
function toggleGameOver() {
    var elModal = document.querySelector('.game-over');
    elModal.classList.toggle('show');
    elModal = document.querySelector('.game-over span');
    elModal.innerText = 'YOU LOST!';
    gGame.isOn = false;
    gElEmoji.innerText = LOSE_EMO;
}

function toggleVictory() {
    clearInterval(gEmoInterval);
    var elModal = document.querySelector('.game-over');
    elModal.classList.toggle('show');
    elModal = document.querySelector('.game-over span');
    elModal.innerText = 'YOU WON';
    gElEmoji.innerText = WIN_EMO;
    gGame.isOn = false;
}

function checkVictory() {
    var maxShown = (gLevel.SIZE ** 2) - gLevel.MINES;
    if (gGame.shownCount === maxShown) {
        toggleVictory();
    }
    return;
}





