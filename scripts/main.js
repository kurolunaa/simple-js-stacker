// phaser configs
const config = {
    type: Phaser.AUTO,
    width: 240,
    height: 480,
    backgroundColor: '#000',
    scene: { preload, create, update }
};

const game = new Phaser.Game(config);

// determines the size of the board
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 24;