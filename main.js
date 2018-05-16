// to-do list
// draw maze
// make square etc. for movable character
//  ability to move square
// wall detection
// start and end point
//15
//21

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W                   W",
    "W                   W",
    "W                   W",
    "W                   W",
    "W                   W",
    "W                   W",
    "W                   W",
    "W                   F",
    "S                   W",
    "W                   W",
    "W                   W",
    "W                   W",
    "W                   W",
    "WWWWWWWWWWWWWWWWWWWWW"
];
let boxTop = 8;// box position
let boxLeft = 8;
let x = 0;
let y = 0;

let mazeDiv = document.getElementById("maze");
let box = document.getElementById("box");
for (let i = 0; i < map.length; i++){
    let row = map [i];
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("id", "row" + (i + 1));
    rowDiv.setAttribute("class", "row");

    for (let j = 0; j < row.length; j++){
        let colDiv = document.createElement("div");
        colDiv.setAttribute("id", "cell" + (j + 1));
        if (map[i][j] == "W"){
            colDiv.setAttribute("class", "cellW");
        // colDiv.textContent = map[i][j];
    } else if (map[i][j] == " "){
        colDiv.setAttribute("class", "cellE");
    }else if (map[i][j] == "S"){
        boxTop += i*20;
        boxLeft += j*20;
        box.style.top = boxTop + "px";
        box.style.left = boxLeft + "px";
        x = j;
        y = i;
        colDiv.setAttribute("class", "cellS");
    }else if (map[i][j] == "F"){
        colDiv.textContent="F";
    }
       
        rowDiv.appendChild(colDiv);
        
    }
    mazeDiv.appendChild(rowDiv);
}


document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  
  if (event.key === "ArrowLeft"){
      
      if ([" ","S","F"].indexOf(map[y][x-1]) > -1){
         //console.log(map[x-1][y])  
        x = x - 1;
        boxLeft -= 20;
     
    }
  }else if (event.key === "ArrowRight"){
      //console.log([" ","S","F"].indexOf(map[y][x+1]));
    if ([" ","S","F"].indexOf(map[y][x+1])> -1){
      x = x + 1
      boxLeft += 20;
      
  }
}
  if (event.key === "ArrowUp"){
    if ([" ","S","F"].indexOf(map[y-1][x])> -1){
        y = y - 1;
        boxTop -= 20;
        
      }
     
  }else if (event.key === "ArrowDown"){
    if ([" ","S","F"].indexOf(map[y+1][x])> -1){
      y = y + 1;
      boxTop += 20;
      
  }
 }

 

  //console.log('keydown event\n\n' + 'key: ' + keyName);
  document.getElementById("box").style.left = boxLeft + "px";
  document.getElementById("box").style.top = boxTop + "px";
  if (map[y][x] == "F"){
    alert("win")
  }
 
});
