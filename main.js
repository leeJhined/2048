let score = 0;
let rows = 4;
let columns = 4;
let realBoard = document.getElementById('board');
let realScore = document.getElementById('score');

window.onload = function(){
    startGame();
}

//filling the board
function startGame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for (let i=0;i<rows;i++){
        for (let j=0;j<columns;j++){
            let tile = document.createElement('div');
            tile.id = `${i.toString()}-${j.toString()}`;
            let number = board[i][j];
            updateTile(tile, number);
            realBoard.append(tile);
        }
    }
    setTwos();
    setTwos();
}


function updateTile(tile, number){
    tile.innerText = '';
    tile.classList.value = '';
    tile.classList.add('tile');
    if(number>0){
        tile.innerText = number.toString();
        tile.classList.add(`x${number.toString()}`);
    }
}


//make the keys work and toggle the function of each direction
document.onkeyup = (x) => {
    if(x.code == 'ArrowLeft'){
        slideLeft();
        setTwos();
    }
    else if(x.code == 'ArrowRight'){
        slideRight();
        setTwos();
    }
    else if(x.code == 'ArrowUp'){
        slideUp();
        setTwos();
    }
    else if(x.code == 'ArrowDown'){
        slideDown();
        setTwos();
    }
    realScore.innerText = score;
};


//this will return a new array with no zeros
function filterZeros(row){
    return row.filter(num => num != 0);
}


//this function is responsible for all different types of slides
function slide(row){
    row = filterZeros(row);
    for(let i=0; i<row.length-1; i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            row[i+1]=0;
            score+=row[i];
        }
    }
    row = filterZeros(row);
    while(row.length < columns){
        row.push(0);
    }
    return row;
}


//these functions are resposnsible for specific slides, each on of them uses slide() just a diff parameter
function slideLeft(){
    for(let i=0; i<rows; i++){
        let row = board[i];
        row = slide(row);
        board[i] = row
        for(let j=0; j<columns; j++){
            let tile = document.getElementById(`${i.toString()}-${j.toString()}`)
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}


function slideRight() {
    for (let i = 0; i < rows; i++) {
        let row = board[i];
        row.reverse();
        row = slide(row)
        board[i] = row.reverse();   
        for (let j = 0; j < columns; j++){
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let j = 0; j < columns; j++) {
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row = slide(row);
        for (let i = 0; i < rows; i++){
            board[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let j = 0; j < columns; j++) {
        let row = [board[0][j], board[1][j], board[2][j], board[3][j]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let i = 0; i < rows; i++){
            board[i][j] = row[i];
            let tile = document.getElementById(i.toString() + "-" + j.toString());
            let num = board[i][j];
            updateTile(tile, num);
        }
    }
}


function setTwos(){
    if(!empty()){
        return;
    }
    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random()* columns);
        if(board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(`${r.toString()}-${c.toString()}`)
            tile.innerText = '2';
            tile.classList.add('x2');
            found = true;    
        }
    }
}

function empty() {
    for(let i=0; i<rows; i++){
        for(let j=0; j<rows; j++){
            if(board[i][j] == 0) return true
        }
    }
    return false
}