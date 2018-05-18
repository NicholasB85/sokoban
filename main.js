// to-do list
// draw maze
// make square etc. for movable character
//  ability to move square
// wall detection
// start and end point
//15
//21

// const map = [
//     "WWWWWWWWWWWWWWWWWWWWW",
//     "W                   W",
//     "W            W      W",
//     "W    W              W",
//     "W                   W",
//     "W          W        W",
//     "W                   W",
//     "W                   W",
//     "W      W            F",
//     "S                   W",
//     "W                   W",
//     "W              W    W",
//     "W                   W",
//     "W                   W",
//     "WWWWWWWWWWWWWWWWWWWWW"
// ];

const map = [
    "    WWWWW          ",
    "    W   W          ",
    "    WB  W          ",
    "  WWW  BWW         ",
    "  W       W        ",
    "WWW W WW W   WWWWWW",
    "W   W WW WWWWW  OOW",
    "W B  B          OOW",
    "WWWWW WWW WSWW  OOW",
    "    W     WWWWWWWWW",
    "    WWWWWWW        "
]
let playerTop = 8; // box position
let playerLeft = 8;
let currentPlayerColIndex = 0;
let currentPlayerRowIndex = 0;
let nextPlayerColIndex = 0;
let nextPlayerRowIndex = 0;


let mazeDiv = document.getElementById("maze");
let player = document.getElementById("box");


for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    let mapRow = map[rowIndex];
    let divRow = document.createElement("div");
    divRow.setAttribute("data-row", (rowIndex + 1));
    divRow.setAttribute("class", "row");


    for (let colIndex = 0; colIndex < mapRow.length; colIndex++) {
        let divCol = document.createElement("div");
        divCol.setAttribute("data-row", (rowIndex + 1));
        divCol.setAttribute("data-col", (colIndex + 1));
        if (map[rowIndex][colIndex] == "W") {
            divCol.setAttribute("class", "cellW");
            divCol.setAttribute("data-row", (rowIndex + 1));
            divCol.setAttribute("data-col", (colIndex + 1));
            // colDiv.textContent = map[i][j];
        } else if (map[rowIndex][colIndex] == " ") {
            divCol.setAttribute("class", "cellE");
            divCol.setAttribute("data-row", (rowIndex + 1));
            divCol.setAttribute("data-col", (colIndex + 1));
        } else if (map[rowIndex][colIndex] == "B") {
            divCol.setAttribute("class", "cellB");
            divCol.setAttribute("data-row", (rowIndex + 1));
            divCol.setAttribute("data-col", (colIndex + 1));

        } else if (map[rowIndex][colIndex] == "S") {
            playerTop += rowIndex * 50;
            playerLeft += colIndex * 50;
            player.style.top = playerTop + "px";
            player.style.left = playerLeft + "px";
            currentPlayerRowIndex = rowIndex;
            currentPlayerColIndex = colIndex;
            divCol.setAttribute("class", "cellS");
            divCol.setAttribute("data-row", (rowIndex + 1));
            divCol.setAttribute("data-col", (colIndex + 1));
        } else if (map[rowIndex][colIndex] == "O") {
            divCol.setAttribute("class", "cellO");
            divCol.setAttribute("data-row", (rowIndex + 1));
            divCol.setAttribute("data-col", (colIndex + 1));
        }

        divRow.appendChild(divCol);

    }
    mazeDiv.appendChild(divRow);
}

function movePlayer(rowOffset, colOffset) {
    playerTop += (rowOffset * 50);
    playerLeft += (colOffset * 50);
}

document.addEventListener('keydown', event => {
    if (!event.key.startsWith("Arrow")) return false;

    let rowOffset = 0;
    let colOffset = 0;
    if (event.key === "ArrowLeft") colOffset = -1;
    if (event.key === "ArrowRight") colOffset = +1;
    if (event.key === "ArrowUp") rowOffset = -1;
    if (event.key === "ArrowDown") rowOffset = +1;
    
    nextPlayerRowIndex = currentPlayerRowIndex + rowOffset;
    nextPlayerColIndex = currentPlayerColIndex + colOffset;
    
    const secondCellRowIndex = nextPlayerRowIndex + rowOffset;
    const secondCellColIndex = nextPlayerColIndex + colOffset;

    const firstCell = document.querySelector("[data-row= '" + (nextPlayerRowIndex + 1) + "'][data-col= '" + (nextPlayerColIndex + 1) + "']");
    const secondCell = document.querySelector("[data-row= '" + (secondCellRowIndex + 1) + "'][data-col= '" + (secondCellColIndex + 1) + "']");
    
    if (!firstCell.classList.contains("cellW")) {
        if (!firstCell.classList.contains("cellB")) {
            movePlayer(rowOffset, colOffset);

            currentPlayerRowIndex = nextPlayerRowIndex;
            currentPlayerColIndex = nextPlayerColIndex;
            nextPlayerRowIndex += rowOffset;
            nextPlayerColIndex += colOffset;
        }
    }
    if (firstCell.classList.contains("cellB") && !secondCell.classList.contains("cellW")) {
        if (firstCell.classList.contains("cellB") && !secondCell.classList.contains("cellB")){
        console.log("firstCell", firstCell)
        console.log("secondCell", secondCell)
        firstCell.classList.remove("cellB");
        firstCell.classList.add("cellE");
        secondCell.classList.remove("cellE");
        secondCell.classList.add("cellB");

        

        }
    }

    // console.log("and this should be at position (row/col):", (playerRowIndex + rowOffset), "/", (playerColIndex + colOffset))

    //console.log('keydown event\n\n' + 'key: ' + keyName);
    document.getElementById("box").style.left = playerLeft + "px";
    document.getElementById("box").style.top = playerTop + "px";

    // if (map[y][x] == "F") {
    //     alert("win")
    // }

});