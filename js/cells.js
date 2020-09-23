'use strict';

//cell clicked functions
function cellclicked(ev, elCell) {
    if (!gGame.isOn) return;
    ev = ev || window.event;
    var cellCoord = getCellCoord(elCell.id);
    var currCell = gBoard[cellCoord.i][cellCoord.j];
    switch ((ev.which)) {
        case 1: //mouse left click
            if (currCell.isShown || currCell.isMarked) return;
            gElEmoji.innerText = DOUBT_EMO;
            if (currCell.isMine) {
                elCell.classList.add('exploded');
                if (gLivesCount > 1) {
                    gLivesCount--;
                    currCell.isShown = true;
                    elCell.innerText = MINE;
                    switch (gLivesCount) {
                        case 2:
                            gElLives.innerText = `${LIVE + LIVE + LIVE_DOWN}`;
                            break;
                        case 1:
                            gElLives.innerText = `${LIVE + LIVE_DOWN + LIVE_DOWN}`;
                            break;

                    }
                } else {
                    gElLives.innerText = `${LIVE_DOWN + LIVE_DOWN + LIVE_DOWN}`
                    showMines();
                    toggleGameOver();
                }
            } else {
                gEmoInterval = setTimeout(function () { gElEmoji.innerText = NORMAL_EMO; }, 100);
                elCell.classList.add('shown');
                gGame.shownCount++;
                (currCell.isMine) ? elCell.innerText = MINE : expandShown(gBoard, elCell, cellCoord.i, cellCoord.j);
                gBoard[cellCoord.i][cellCoord.j].isShown = true;
            }
            break;
        case 3: // mouse right click
            if (!currCell.isMarked) {
                elCell.innerText = FLAG;
                currCell.isMarked = true;
                if ((currCell.isMine)) gGame.markedCount++;
            } else {
                elCell.innerText = EMPTY;
                currCell.isMarked = false;
                if ((currCell.isMine)) gGame.markedCount--;
            }
            break;
    }
    checkVictory();
}

//gets coordinates form the cell id
function getCellCoord(strCellId) {
    var parts = strCellId.split('-');
    var coord = {
        i: +parts[1],
        j: +parts[2],
    };
    return coord;

}

//expands if needed
function expandShown(board, elCell, rowIdx, colIdx) {
    var currCell = board[rowIdx][colIdx];
    if (currCell.minesAroundCount > 0) {
        elCell.innerText = currCell.minesAroundCount;
    } else {
        for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
            if (i < 0 || i >= board.length) continue;
            for (var j = colIdx - 1; j <= colIdx + 1; j++) {
                if (j < 0 || j >= board[0].length) continue;
                if (i === rowIdx && j === colIdx) continue;
                var thisCell = board[i][j];
                if (thisCell.isMine) continue;
                if (thisCell.isShown) continue;
                var currElCell = document.querySelector(`#cell-${i}-${j}`);
                currElCell.classList.add('shown');
                board[i][j].isShown = true;
                if (thisCell.minesAroundCount === 0) {
                    currElCell.innerText = EMPTY;
                } else {
                    currElCell.innerText = thisCell.minesAroundCount;
                }
                gGame.shownCount++;
            }
        }
        return;
    }
}


