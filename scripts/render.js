// mainly handles board and piece rendering

function drawBoard(scene) {
    // moves through every spot on the board and clears it
    scene.children.list.filter(obj => obj.type === 'Rectangle').forEach(obj => obj.destroy());

    // draw merged blocks
    // for each column and each row
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            // if something exists at a board's (x,y) coordinate, draw a colored box on the board at the (x,y) coordinate
            if (board[y][x]) {
                drawBlock(scene, x, y, 0x3d6c7e);
            }
        }
    }

    // puts the current piece at it's location
    for (let y = 0; y < currentPiece.piece.length; y++) {
        for (let x = 0; x < currentPiece.piece[y].length; x++) {
            if (currentPiece.piece[y][x]) {
                // eventually, can probably change the color of the piece with a sprite or something
                drawBlock(scene, currentPiece.x + x, currentPiece.y + y, 0x3d6c7e, 1);
            }
        }
    }
}

// responsible for drawing piece on screen
function drawBlock(scene, x, y, color, alpha = 1) {
    // draws a spot on the board at the (coordinate * block_size) - 1
    const rect = scene.add.rectangle(
        x * BLOCK_SIZE,
        y * BLOCK_SIZE,
        BLOCK_SIZE - 1,
        BLOCK_SIZE - 1,
        color
    );

    rect.setOrigin(0, 0);
    rect.setAlpha(alpha);
}