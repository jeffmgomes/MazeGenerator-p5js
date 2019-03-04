var grid = [];
var current;
var stack = [];
var scl = 20;
var w = 600;
var h = 600;

var cols;
var rows;


function setup(){
    cols = w / scl;
    rows = h/ scl;

    createCanvas(w,h);

    // Fill the grid with Cells
    for (i = 0; i < cols; i++) {
        grid[i] = [];
        for (j = 0; j < rows; j++) {            
            grid[i][j] = new Cell(i,j,scl);
        }
    }

    // Add to every Cell its neighbors
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    current = grid[floor(random(0,cols))][floor(random(0,rows))]; // Randomly choose a cell
    current.visited = true; // Set the current Cell as visited
}

function draw(){
    update();
    // Draw all the cells
    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            grid[i][j].draw();
        }
    }

    // Paint the Current cell to green
    noStroke();
    fill(0,0,255);    
    rect(current.x, current.y, scl, scl);
}

function update(){
    var neighbors = current.checkNeighbors();
    var r = floor(random(0, neighbors.length));

    if(neighbors.length > 0){
        var neighbor = neighbors[r];

        //STEP 2 - Put the current Cell in the Stack (Backtrack)
        stack.push(current);

        //STEP 3 - Check which neihgbor was chosen and remove the walls between
        if (current.i + 1 == neighbor.i) {
            neighbor.walls[3].up = false;
            current.walls[1].up = false;
        }
        if (current.j + 1 == neighbor.j) {
            neighbor.walls[0].up = false;
            current.walls[2].up = false;
        }
        if (current.i - 1 == neighbor.i) {
            neighbor.walls[1].up = false;
            current.walls[3].up = false;
        }
        if (current.j - 1 == neighbor.j) {
            neighbor.walls[2].up = false;
            current.walls[0].up = false;
        }

        // STEP 4 - Set the chosen neighbor as visited and set as current Cell   
        neighbor.visited = true;
        current = neighbor;

    } else{
        // If the stack is not empty
        if (!stack.length == 0) {
            // Return one step in the backtrack and set as the Current Cell
            current = stack.pop();
        } else {
            noLoop();
        }
    }
}