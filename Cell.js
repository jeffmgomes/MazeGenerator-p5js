function Cell(_i,_j,_w){
    this.i = _i;
    this.j = _j;
    this.w = _w;
    this.x = _i * _w;
    this.y = _j * _w;
    this.visited = false;
    this.totalNeighbors = 0;
    this.neighbors = [];
    this.walls = [];

    for(a = 0; a < 4; a++){
        this.walls[a] = new Wall();
    }
}

Cell.prototype.draw = function(){
    if(this.visited){
        noStroke();
        fill(0,0,255);
        rect(this.x, this.y, this.w,this.w);
    }

    //TOP
    if (this.walls[0].up) {
        this.walls[0].draw(this.x, this.y, this.x + w, this.y);
    }
    //RIGHT
    if (this.walls[1].up) {
        this.walls[1].draw(this.x + w, this.y, this.x + w, this.y + w);
    }
    //BOTTOM
    if (this.walls[2].up) {
        this.walls[2].draw(this.x + w, this.y + w, this.x, this.y + w);
    }
    //LEFT
    if (this.walls[3].up) {
        this.walls[3].draw(this.x, this.y + w, this.x, this.y);
    }
}

Cell.prototype.checkNeighbors = function(){
    n = [];
    for(i = 0; i < this.neighbors.length; i++){
        if(!this.neighbors[i].visited){
            n.push(this.neighbors[i]);
        }
    }
    return n;
}

Cell.prototype.addNeighbors = function(grid){
    if (this.j > 0) {
        // TOP
        this.neighbors.push(grid[this.i][this.j - 1]);
    }
    if (this.i < grid.length - 1) {
        // RIGHT
        this.neighbors.push(grid[this.i + 1][this.j]);
    }
    if (this.j < grid[0].length - 1) {
        // BOTTOM
        this.neighbors.push(grid[this.i][this.j + 1]);
    }
    if (this.i > 0) {
        // LEFT
        this.neighbors.push(grid[this.i - 1][this.j]);
    }
}

function Wall(){
    this.up = true;
}

Wall.prototype.draw = function(x1,y1,x2,y2){
    stroke(0);
    line(x1,y1,x2,y2);
}