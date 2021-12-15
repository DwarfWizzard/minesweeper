/**
 * Game config
 */
const tableRows = 9;
const tableCols = 9;

let minesMax = 1;
minesMaxField = document.querySelector('#minesMax');
minesMaxField.addEventListener("input", function () {
    minesMax = this.value;
});

const minesweeperTable = document.querySelector('.minesweeper');

/**
 * Game matrix
 */
let gameMatrix = new Array();

/**
 * Generate minesweeper table
 */
for (let i = 0; i < tableRows; i++) {
    let tableRow = document.createElement("tr");
    minesweeperTable.appendChild(tableRow);
    gameMatrix[i] = [];

    for (let j = 0; j < tableCols; j++) {
        gameMatrix[i][j] = 0;
        let tableCell = document.createElement("td");
        let tableCellButton = document.createElement("button");
        tableCell.classList.add("minesweeper-cell");
        tableCell.dataset.row = i;
        tableCell.dataset.col = j;

        tableCellButton.classList.add("minesweeper-button");
        tableRow.appendChild(tableCell);
        tableCell.appendChild(tableCellButton);
    }
}


/**
 * Generate random mines
 */
for (let i = 0; i < minesMax; i++) {
    let randomRow = Math.floor(Math.random() * tableRows);
    let randomCol = Math.floor(Math.random() * tableCols);
    if (gameMatrix[randomRow][randomCol] > -1) {
        gameMatrix[randomRow][randomCol] = -1;
    }
    else
        i--;
}

/**
 * Generate numbers
 */
function CountMines(x, y){
    let count = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            try{
                if(gameMatrix[x+i][y+j]==-1)
                    count++;
            }
            catch{}
        }
    }
    return count;
}

for(let i = 0; i < tableRows; i++){
    for(let j = 0; j < tableCols; j++){
        if(gameMatrix[i][j] != -1){
            gameMatrix[i][j] = CountMines(i, j);
        }
    }
}

/** 
 * Button click event
 */
minesweeperTable.querySelectorAll('.minesweeper-button').forEach(minesweeperButton => {
    minesweeperButton.addEventListener("click", function () {
        let currentButton = this;
        if(currentButton.classList.contains("flag") == false)
        {
            let currentCell = minesweeperButton.parentNode;
            let row = currentCell.dataset.row;
            let col = currentCell.dataset.col;

            /* Check cell for mine */
            if(gameMatrix[row][col] < 0) {
                currentCell.classList.add("mined");
                currentCell.classList.add("exploded");
                for (let i = 0; i < tableRows; i++) {
                    for (let j = 0; j < tableRows; j++) {
                        if(gameMatrix[i][j] == -1) {
                            let minedCell = minesweeperTable.querySelector(`[data-row="${i}"][data-col="${j}"]`);
                            minedCell.classList.add("mined");
                            minedCell.removeChild(minedCell.firstChild);
                        }
                    }
                }
            }
            if(gameMatrix[row][col] > 0) {
                currentCell.innerHTML = gameMatrix[row][col];
            }
            if(gameMatrix[row][col]==0) {
                RemoveEmpty(row, col)
            } 
            this.remove();
        }
    });
    minesweeperButton.addEventListener("contextmenu", function (event) {
        let currentButton = this;
        event.preventDefault();
        
        if(currentButton.classList.contains("flag"))
            currentButton.classList.remove("flag");
        else
            currentButton.classList.add("flag");
    });
});



function RemoveEmpty(row, col) {
    row = Number(row)
    col = Number(col)
    let minedCell = minesweeperTable.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    gameMatrix[row][col]=-3
    minedCell.removeChild(minedCell.firstChild);


    
    if(row>0) {
        if(gameMatrix[row-1][col]==0)
            RemoveEmpty(row-1, col)
    }
    if(row<tableRows-1) {
        if(gameMatrix[row+1][col]==0)
            RemoveEmpty(row+1, col)
    }
    if(col > 0) {
        if(gameMatrix[row][col-1]==0)
            RemoveEmpty(row, col-1)
    }
    if(col < tableCols-1) {
        if(gameMatrix[row][col+1]==0)
            RemoveEmpty(row, col+1)
    }
    if(row>0&&col>0) {
        if(gameMatrix[row-1][col-1]==0)
            RemoveEmpty(row-1, col-1)
    }
    if(row<tableRows-1 && col<tableCols-1) {
        if(gameMatrix[row+1][col+1]==0)
            RemoveEmpty(row+1, col+1)
    }
    if(row > 0 && col<tableCols-1) {
        if(gameMatrix[row-1][col+1]==0)
            RemoveEmpty(row-1, col+1)
    }
    if(row<tableRows-1 && col>0) {
        if(gameMatrix[row+1][col-1]==0)
            RemoveEmpty(row+1, col-1)
    }


    return
}