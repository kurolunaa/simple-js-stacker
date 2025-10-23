// this defines what the defined buttons do, to (re)initialize buttons, check game.js

function handleInput(scene, time) {
  const cursors = scene.cursors;

  // Drop timer
    if (time > dropTime + dropInterval) {
        currentPiece.y++;
        if (collides()) {
            currentPiece.y--;
            handleLockDelay(scene, time);
        } else {
            touchingGround = false;
        }
        dropTime = time;
    }

    // Rotation
    // clockwise
    if (Phaser.Input.Keyboard.JustDown(cursors.down)){
        rotatePiece(-1);
    } 

    // counter-clockwise
    if (Phaser.Input.Keyboard.JustDown(cursors.up)){
        rotatePiece(1);
    }

    // Hard drop
    if (Phaser.Input.Keyboard.JustDown(scene.hardDropKey)){
        hardDrop(scene);
    }

    // Soft drop
    if (scene.softDropKey.isDown) {
        // if down button is pressed, record time since last softdrop, and if time exceeds time since last softdrop + softDropInterval
        if (!scene.lastSoftDropTime || time > scene.lastSoftDropTime + softDropInterval) {
            // pushes down piece until it collides with something, then starts the timer before merging the piece
            currentPiece.y++;
            if (collides()) {
                currentPiece.y--;
                handleLockDelay(scene, time);
            } else {
                // if no collision, it's not touching the ground so it will keep pushing the piece down
                touchingGround = false;
            }
            scene.lastSoftDropTime = time;
        }
    } else {
        // if button is not pressed, reset time since last softdrop so it is immediate when it's pressed again.
        scene.lastSoftDropTime = 0;
    }

    // delayed auto shift (DAS), or hold movement keys to repeat movement (left or right)
    let dir = 0;
    // if left arrow is pressed, piece goes <-
    if (cursors.left.isDown) {
        dir = -1;
        // else if right arrow is pressed, piece goes ->
    } else if (cursors.right.isDown) {
        dir = 1;
    }

    if (dir !== 0) {
        // if direction has changed, immediately move piece in that direction, then repeat movement
        if (holdDir !== dir) {
            holdDir = dir;
            moveStartTime = time;
            movePiece(dir);
            lastMoveTime = time;
        } else {
            // else, if movement has not changed, repeat movement
            const timeHeld = time - moveStartTime;
            if (timeHeld > moveDelay && time - lastMoveTime > moveRepeat) {
                movePiece(dir);
                lastMoveTime = time;
            }
        }
    } else {
        // else piece doesn't move
        holdDir = 0;
    }
}