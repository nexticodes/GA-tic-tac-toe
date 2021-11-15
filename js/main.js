// alert('JS. Works')

// Game knows the following:
// The board.
// The players' color.
// Whose turn it is.
// Is the game still going? aka has there been a winner?
// I guess, the number of turns.

// Game's functions:
// initialize game (init())
// check if winning condition is met.


// CONSTANTS
// store colors the players want their respective colors to be; [blue, red, gray]
const colors = [];
// winning conditions array;
let winningConditions;

// VARIABLES
let boardArr = []; //  = [0,0,0,0,0,0,0,0,0];
let turnCurr; // player 1 or 2.
let turnNum1; // number of turns.
let turnNum2;
let winner; // the winner;
let boardEl;

// Initialize game 
let player1; // (prompt('Player 1. Enter your name: '));
let player2; // (prompt('Player 2. Enter your name: ')) ;


// SET THE STAGE
// Open modal on init
modalController('open', 'intro');

// Add listener to button on intro.
const playButton = document.getElementById('play');
playButton.addEventListener('click', init);

function init() {
    // Close modal and backdrop.
    modalController('close');
    // fill up variables;
    // set boardArray, set random first turn (use Math.random()), number of turns for 1 and 2.
    boardArr = [0,0,0,0,0,0,0,0,0];
    turnCurr = Math.floor(Math.random() * 2 + 1);
    // set winner to '';
    winner = '';
    // set up player object.
    player1 = {
        name: 'Player 1',
        // indeces of cells occupied 
        cells: [],
        color: '#FF615F'
    }
    player2 = {
        name: 'Player 2',
        // indeces of cells occupied 
        cells: [],
        color: '#3DC5F2'
    }
    // add event listeners to the board.
    boardEl = document.querySelector('#board');
    boardEl.addEventListener('click', handleClick);
    // REMEMBER BUBBLING. Apply listener to board component.
    // Maybe make a loop instead? Hmm... 
    // Play the game.
    updateTurnColors();

};



// play function.
// Wait for player 1's turn or click.
// Add 1 to turnNum1.
// Flip the "turn table".
// Wait for player 2's turn or click.
// Add 1 to turnNum2.

// event listener 1. Handle click.
function handleClick(e){
    // Extract the index (VALUE or maybe ID) of the cell.
    const clickedCellId = e.target.id;
    const clickedIndex = clickedCellId.charAt(clickedCellId.length - 1);
    // Fill board array at extracted index with 1 or 2, depending on whose turn it is.
    // Check first if taken. (if the array at index is not 0, means its taken)
    const arrIndexValue = boardArr[clickedIndex];
    if (boardArr[clickedIndex] === 0){
        boardArr[clickedIndex] = turnCurr;
        // Push clickedIndex into player's occupied cells array.
        if (turnCurr == 1) {
            player1.cells.push(clickedIndex);
        } else {
            player2.cells.push(clickedIndex);
        }
    }
    // Check win condition.
    checkWin();
    // render with the clicked index;
    render(clickedIndex);
    // change the turn
    flipTurn();
}

// flip turn
function flipTurn(){
    // switch turns
    if (turnCurr === 1) {
        turnCurr = 2;
    } else if (turnCurr === 2) {
        turnCurr = 1;
    }
    updateTurnColors();
};

// render function when a click is made.
// param: cellIndex, index of the cell clicked 
function render(cellIndex){
    // Retrieve cell from HTML. Ref: id.
    const cell = document.querySelector('#cell-8');
    const clickedCell = document.querySelector(`#cell-${cellIndex}`);
    // If it's player 1's turn, replace cell with X.
    // If it's player 2's turn, replace cell with O.
    // Change background to x or o.
    // MAKE CELL UNCLICKABLE IF TAKEN.
    // CHECK FIRST IF VALUE AT INDEX IS EITHER 1 OR 2.
    if (!clickedCell.classList.contains('clicked')){
        if (turnCurr === 1) {
            clickedCell.classList.add('clicked', 'x');
        } else if (turnCurr === 2){
            clickedCell.classList.add('clicked', 'o');
        }
    }

    // if there's a winner.
    console.log(winner);
    if (winner){
        displayWinner();
    }
}

// Check if win conditions met by player. Should be triggered every move.
// Horizontal win, 0 1 2 , 3 4 5, 6 7 8
function checkHorizontal(){
    if ((boardArr[0] === 1 && boardArr[1] === 1 && boardArr[2] === 1) ||
        (boardArr[3] === 1 && boardArr[4] === 1 && boardArr[5] === 1) || 
        (boardArr[6] === 1 && boardArr[7] === 1 && boardArr[8] === 1)){
        // player 1 wins
        winner = '1';
    } else if ((boardArr[0] === 2 && boardArr[1] === 2 && boardArr[2] === 2) ||
    (boardArr[3] === 2 && boardArr[4] === 2 && boardArr[5] === 2) || 
    (boardArr[6] === 2 && boardArr[7] === 2 && boardArr[8] === 2)){
        // player 2 wins
        winner = '2';
    }
}

// Vertical Win,   0 3 6, 1 4 7, 2 5 8
function checkVertical(){
    if ((boardArr[0] === 1 && boardArr[3] === 1 && boardArr[6] === 1) ||
        (boardArr[1] === 1 && boardArr[4] === 1 && boardArr[7] === 1) || 
        (boardArr[2] === 1 && boardArr[5] === 1 && boardArr[8] === 1)){
        // player 1 wins
        winner = '1';
    } else if ((boardArr[0] === 2 && boardArr[3] === 2 && boardArr[6] === 2) ||
        (boardArr[1] === 2 && boardArr[4] === 2 && boardArr[7] === 2) || 
        (boardArr[2] === 2 && boardArr[5] === 2 && boardArr[8] === 2)){
        // player 2 wins
        winner = '2';
    }
}


// Diagonal Win, 0 4 8, 2 4 6
function checkDiagonal(){
    if ((boardArr[0] === 1 && boardArr[3] === 1 && boardArr[6] === 1) ||
        (boardArr[1] === 1 && boardArr[4] === 1 && boardArr[7] === 1)){
        // player 1 wins
        winner = '1';
    } else if ((boardArr[0] === 2 && boardArr[4] === 2 && boardArr[8] === 2) ||
        (boardArr[2] === 2 && boardArr[4] === 2 && boardArr[6] === 2)){
        // player 2 wins
        winner = '2';
    }
}


function checkWin() {
    // if winner has not been defined / selected yet.
    if (!winner){
        // Horizontal win
        tempWinner = checkHorizontal();
        // Vertical win
        tempWinner = checkVertical();
        // Diagonal win
        tempWinner = checkDiagonal();
    }
}

function displayWinner(){
    // open modal.
    modalController('open', 'winner');
    const winnerEl = document.querySelector('#winner');
    winnerEl.innerText = `PLAYER ${winner}`
    if (winner == 1){
        winnerEl.style.color = player1.color;
    } else if (winner == 2){
        winnerEl.style.color = player2.color;
    }
}

// function to change background based on player's turn.
function updateTurnColors(){
    const bodyEl = document.querySelector('body');
    const playerEl = document.querySelector('.player');

    // If player 1's turn, change the color of the background to player 1's color, vice versa.
    if (turnCurr === 1){
       bodyEl.classList.add('player-1-turn');
       bodyEl.classList.remove('player-2-turn');
       playerEl.innerText = 'Player 1';
       playerEl.classList.remove('player-2');
       playerEl.classList.add('player-1');
    } else if (turnCurr === 2) {
        bodyEl.classList.add('player-2-turn');
        bodyEl.classList.remove('player-1-turn');
        playerEl.innerText = 'Player 2';
        playerEl.classList.add('player-2');
        playerEl.classList.remove('player-1');
    }
}

// modal controller
function modalController(command, content){
    const backdropEl = document.querySelector('.backdrop');
    const modalEl = document.querySelector('.modal');
    if (command === 'open'){
        backdropEl.classList.add('open');
        modalEl.classList.add('open');
    }
    if (command === 'close'){
        backdropEl.classList.remove('open');
        modalEl.classList.remove('open');
    }
    // content switcher.
    if (content === 'intro'){
        modalEl.innerHTML = `
        <h1 id="intro-title">Tic Tac Toe</h1>
        <h4 id="intro-subtitle">Can you outsmart your opponent?</h4>
        <button id="play">PLAY</button>
        `
    }
    if (content === 'winner'){
        // add event listener to backdrop if winner modal is displayed.
        // event listener for click should close the modal on click.
        backdropEl.addEventListener('click', function(){
            backdropEl.classList.remove('open');
            modalEl.classList.remove('open');
        });
        modalEl.innerHTML = `
        <h3 id="announce-winner">WINNER<h3>
        <h1 id="winner"></h1>
        <button id="replay">AGAIN?</button>
        `
        const replay = document.getElementById('replay');
        replay.addEventListener('click', reset);
    }
}

function reset(){
    // // Clear tiles
    // const allTiles = document.querySelectorAll('.tile');
    // allTiles.forEach(e => {
    //     e.classList.remove('x');
    //     e.classList.remove('o');
    // });

    // // Close modal
    // modalController('close');
    // init();
    window.location.reload();
}