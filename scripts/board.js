// handles board logic
// creates an empty board using the defined parameters in main.js
function createEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

// "places" a piece on the board at the specified location.
function mergePiece() {
    // for each row and column of a piece
    for (let y = 0; y < currentPiece.piece.length; y++) {
        for (let x = 0; x < currentPiece.piece[y].length; x++) {
            if (currentPiece.piece[y][x]) {
                // sets piece on the board using the piece's information
                board[currentPiece.y + y][currentPiece.x + x] = 1;
            }
        }
    }
}

// clears every line that is filled
function clearLines() {
    // from the bottom row, iterates upwards
    for (let y = ROWS - 1; y >= 0; y--) {
        // if the row is completely filled 
        if (board[y].every(v => v)) {
            // the row is removed, and an empty row is added to the top
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            // y is shifted an extra row down to make sure the bottom most row is filled
            y++;
        }
    }
}