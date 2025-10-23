// initialize game state
// this includes the board and it's associated logic (pieces, gravity, movement speed, etc.)
// all timings are in ms

let board;
let currentPiece;
let nextBag = [];
let nextQueue = [];

// drop speed
let dropTime = 0;
let dropInterval = 500;

// determines softdrop speed
let softDropInterval = 150; // might make this user adjustable

// delayed auto shift (DAS) parameters, the user can hold left or right and it will repeat the action every x ms while movement key is held
let moveDelay = 150;
let moveRepeat = 50;
let lastMoveTime = 0;
let holdDir = 0;
let moveStartTime = 0;

// determines when to "merge" a piece when it touches the ground or top of a piece after x amount of time
let lockDelay = 500;
let lockTimer = 0;
let touchingGround = false;

let isGameOver = false;

function preload() {};

function create() {
    // initialize board and fill bag, pick piece from bag
    board = createEmptyBoard();
    refillBag();
    currentPiece = drawFromBag();

    // initialize actions and bind them to keybind, this is where keybinds should be changed
    this.cursors = this.input.keyboard.createCursorKeys();
    this.hardDropKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.softDropKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.holdKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    // overlay and gameover text
    this.overlay = this.add.rectangle(0, 0, config.width, config.height, 0x000000, 0.6)
        .setOrigin(0, 0)
        .setVisible(false)
        .setDepth(900);

    this.gameOverText = this.add.text(config.width / 2, config.height * 0.20 - 20, "GAME OVER", {
        fontSize: "32px",
        color: "#ff4444",
    }).setOrigin(0.5).setVisible(false).setDepth(1000);

    this.restartText = this.add.text(config.width / 2, config.height * 0.20 + 20, "Press [SPACE] to restart", {
        fontSize: "16px",
        color: "#ffffff",
    }).setOrigin(0.5).setVisible(false).setDepth(1000);
}

function update(time) {
    if (isGameOver) {
        if (Phaser.Input.Keyboard.JustDown(this.hardDropKey)) {

            location.reload();
            isGameOver = false;
        }
        return;
    }

    handleInput(this, time);
    drawBoard(this);
}