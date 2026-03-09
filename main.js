let x = 720,
  y = x;

let board, pieceController;

function preload() {
  pawn1 = loadImage("class/pieces/pawn.png");
  rook1 = loadImage("class/pieces/rook.png");
  knight1 = loadImage("class/pieces/knight.png");
  bishop1 = loadImage("class/pieces/bishop.png");
  queen1 = loadImage("class/pieces/queen.png");
  king1 = loadImage("class/pieces/king.png");

  pawn2 = loadImage("class/pieces/pawn1.png");
  rook2 = loadImage("class/pieces/rook1.png");
  knight2 = loadImage("class/pieces/knight1.png");
  bishop2 = loadImage("class/pieces/bishop1.png");
  queen2 = loadImage("class/pieces/queen1.png");
  king2 = loadImage("class/pieces/king1.png");
}

function setup() {
  createCanvas(x, y);
  board = new Board(x, y);
  pieceController = new PieceControll(x, y, pawn1, pawn2, rook1, rook2, knight1, knight2, bishop1, bishop2, queen1, queen2, king1, king2);
}

function draw() {
  background(220);
  board.drawing();
  pieceController.display();
}
