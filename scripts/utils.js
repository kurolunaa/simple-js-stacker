// checks if movement will collide with another piece
function collides() {
    // for each row in a piece's grid
    for (let y = 0; y < currentPiece.piece.length; y++) {
        // for each column in a piece's grid
        for (let x = 0; x < currentPiece.piece[y].length; x++) {
            // if either or both is 1, it is considered solid, meaning it can collide with something
            if (currentPiece.piece[y][x]) {
                // compute where the piece would be on the grid by adding the appropriate x and y values
                let newY = currentPiece.y + y;
                let newX = currentPiece.x + x;
                /**
                 * if piece is:
                 * below the bottom of the board,
                 * past the left wall,
                 * past the right wall, 
                 * or inside of another block,
                 */
                if ( newY >= ROWS || newX < 0 || newX >= COLS || board[newY][newX]) {
                    return true;
                }
            }
        }
    }
    // assume false otherwise
    return false;
}

// allows for the piece to instantly hit the top of the stack
function hardDrop(scene) {
    // while piece is not colliding, move the piece all the way to the bottom
    while (!collides()){
        currentPiece.y++;
    }
    currentPiece.y--;
    mergePiece();
    clearLines();
    spawnPiece();
    touchingGround = false;

    if (collides()){
        gameOver(scene);
    }
}

// determines how long a piece can stay until it merges
function handleLockDelay(scene, time) {
    if (!touchingGround) {
        touchingGround = true;
        lockTimer = time;
    } else if (time - lockTimer > lockDelay) {
        mergePiece();
        clearLines();
        spawnPiece();
        touchingGround = false;

        if (collides()){
            gameOver(scene);
        }
    }
}

// regarding game over, the way it works is if a piece spawns inside of another piece (any part of the piece),
// collision == true, which results in game over. if this were to change for whatever reason, replace their if(collides()){gameOver(scene))} with something else.
// for now, it's fine though.
// logic related to enabling and showing the gameover screen on top out
function gameOver(scene) {
    isGameOver = true;
    touchingGround = false;

    scene.overlay.setAlpha(0).setVisible(true);
    scene.gameOverText.setAlpha(0).setVisible(true);
    scene.restartText.setAlpha(0).setVisible(true);

    scene.tweens.add({
        targets: [scene.overlay],
        alpha: 0.6,
        duration: 400,
        ease: 'Linear'
    });

    scene.tweens.add({
        targets: [scene.gameOverText, scene.restartText],
        alpha: 1,
        duration: 800,
        ease: 'Power2',
        delay: 200
    });
}
