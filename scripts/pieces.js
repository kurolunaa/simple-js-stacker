// handles pieces logic
// I, O, T, J, L, S, Z pieces
// typically randomized into a "bag" of these 7 pieces, then when the bag is empty, these 7 pieces are thrown back in and rerandomized

// pieces can be done as an array of [x][y] coordinates, the way this is structured is ripped from harddrop.wiki under SRS rotation

function getAllPieces(){
    return {
        I: [[0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        O: [[1, 1],
            [1, 1]
        ],
        T: [[0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        J: [[1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        L: [[0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        S: [[0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        Z: [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
    };
}

// picks the first piece from the bag, if no pieces exist it will regill the bag
// returns a piece that will spawn in the middle top most row of the board
function drawFromBag() {
    if (nextBag.length === 0){
        refillBag();
    }

    const key = nextBag.pop();
    const piece = getAllPieces()[key];
    return { piece, x: 3, y: 0, type: key };
}

// converts getAllPieces() into keys, throws them into a bag and shuffles them in this step.
function refillBag() {
    const keys = Object.keys(getAllPieces());
    nextBag = Phaser.Utils.Array.Shuffle(keys);
}

// function responsible for spawning the piece on the board
function spawnPiece() {
    
    // fills up nextQueue, shows up to 4 pieces on the side of the board
    while (nextQueue.length < 4){
        nextQueue.push(drawFromBag());
    }
    currentPiece = nextQueue.shift();

    // moves a new piece from the bag into the nextQueue
    nextQueue.push(drawFromBag());
}

// moves the piece on the x axis (left to right)
function movePiece(dir) {
    currentPiece.x += dir;

    if (collides()) {
        currentPiece.x -= dir;
    } else {
        touchingGround = false;
    }
}

// handles piece rotation
function rotatePiece(direction = 1) {
    const piece = currentPiece.piece;
    const size = piece.length;
    const prev = piece.map(r => [...r]);

    // determines the center of matrix of pieces (e.g., 1.5 for 4x4, 1 for 3x3)
    // this is critical for making the pieces rotate "properly," essentially to prevent unintended behavior
    const cx = (size - 1) / 2;
    const cy = (size - 1) / 2;

    // creates a new "matrix" to hold the rotated information
    // this is because some pieces, when rotated, are slightly taller or shorter on either or both length or width.
    const rotated = Array.from({ length: size }, () => Array(size).fill(0));

    // for each x and y in the piece
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {

            // calculus jumpscare
            if (piece[y][x]) {
                const dx = x - cx;
                const dy = y - cy;
                let rx, ry;

                // i'm not gonna lie, i used chatgpt for this
                // rotate clockwise; 
                if (direction === 1) {
                    rx = cx + dy;
                    ry = cy - dx;
                } else {
                    // else counter-clockwise
                    rx = cx - dy;
                    ry = cy + dx;
                }
                // rounds to nearest int
                const ix = Math.round(rx);
                const iy = Math.round(ry);

                // checks if the rotated block is within the boundaries of the board
                if (iy >= 0 && iy < size && ix >= 0 && ix < size) {
                    rotated[iy][ix] = 1;
                }
            }
        }
    }
    currentPiece.piece = rotated;
    // simple wall kick to allow piece to still rotate even if it is at directly touching something on the side
    if (collides()) {
        currentPiece.x++;
        if (collides()) {
            currentPiece.x -= 2;
            if (collides()) {
                currentPiece.x++;
                currentPiece.piece = prev; // revert
            }
        }
    }
}