class GameController {
  constructor(x, y, pawn1, pawn2, rook1, rook2, knight1, knight2, bishop1, bishop2, queen1, queen2, king1, king2) {
    this.x = x;
    this.y = y;
    this.pawn1 = pawn1;
    this.pawn2 = pawn2;
    this.rook1 = rook1;
    this.rook2 = rook2;
    this.knight1 = knight1;
    this.knight2 = knight2;
    this.bishop1 = bishop1;
    this.bishop2 = bishop2;
    this.queen1 = queen1;
    this.queen2 = queen2;
    this.king1 = king1;
    this.king2 = king2;

    this.lastSquare;
    this.currentSquare;
    /* Pieces registration:
        Black = B-
        White = W-
        Empty = ""
        Pawn = "-p"
        Rook = "-r"
        Knight = "-kn" (Lower Case)
        Bishop = "-b"
        Queen = "-q"
        King = "-k"
    */

    //pieces[y, x]
    this.pieces = [
      ["Br", "Bkn", "Bb", "Bq", "Bk", "Bb", "Bkn", "Br"],
      ["Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp"],
      ["Wr", "Wkn", "Wb", "Wq", "Wk", "Wb", "Wkn", "Wr"],
    ];

    //Capture validity checker
    this.captureCheck = new CaptureValidity();

    //Piece classes init
    this.pawnControll = new Pawn(this.captureCheck);
    this.knightControll = new knight(this.captureCheck);
    this.kingControll = new King(this.captureCheck);
    this.bishopControll = new Bishop(this.captureCheck);
    this.queenControll = new Queen(this.captureCheck);
    this.rookControll = new Rook(this.captureCheck);
  }

  moveController(coord1, coord2) {
    if (this.currentSquare) {
      this.lastSquare = this.currentSquare;
    } else {
      this.lastSquare = this.checkSquare(coord1, coord2);
    }
    this.currentSquare = this.checkSquare(coord1, coord2); //this. because js class, not global function.

    if (this.lastSquare && this.currentSquare) {
      //Tap into class for specifik piece
      switch (this.pieces[this.lastSquare[1]][this.lastSquare[0]]) {
        /*Black*/

        case "Bp":
          this.pawnControll.move(0, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Br":
          this.rookControll.move(0, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Bkn":
          this.knightControll.move(0, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Bb":
          this.bishopControll.move(0, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Bq":
          this.queenControll.move(0, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Bk":
          this.kingControll.move(0, this.lastSquare, this.currentSquare, this.pieces);
          break;

        /*White*/

        case "Wp":
          this.pawnControll.move(1, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Wr":
          this.rookControll.move(1, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Wkn":
          this.knightControll.move(1, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Wb":
          this.bishopControll.move(1, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Wq":
          this.queenControll.move(1, this.lastSquare, this.currentSquare, this.pieces);
          break;
        case "Wk":
          this.kingControll.move(1, this.lastSquare, this.currentSquare, this.pieces);
          break;
      }
    }
  }

  checkSquare(posX, posY) {
    let squareWidth = this.x / 8;
    let squareHeight = this.y / 8;

    let row = Math.floor(posX / squareWidth);
    let col = Math.floor(posY / squareHeight);

    return [row, col]; //[x, y]
  }

  display() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        //Black pawn
        if (this.pieces[i][j] == "Bp") {
          image(this.pawn2, (this.x / 8) * j, (this.y / 8) * i, this.x / 8, this.y / 8 - this.y / 160);
        }

        //White pawn
        else if (this.pieces[i][j] == "Wp") {
          image(this.pawn1, (this.x / 8) * j, (this.y / 8) * i, this.x / 8, this.y / 8 - this.y / 160);
        }

        //Black Rook
        else if (this.pieces[i][j] == "Br") {
          image(this.rook2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Rook
        else if (this.pieces[i][j] == "Wr") {
          image(this.rook1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black Knight
        else if (this.pieces[i][j] == "Bkn") {
          image(this.knight2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Knight
        else if (this.pieces[i][j] == "Wkn") {
          image(this.knight1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black Bishop
        else if (this.pieces[i][j] == "Bb") {
          image(this.bishop2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Bishop
        else if (this.pieces[i][j] == "Wb") {
          image(this.bishop1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black Queen
        else if (this.pieces[i][j] == "Bq") {
          image(this.queen2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Queen
        else if (this.pieces[i][j] == "Wq") {
          image(this.queen1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black King
        else if (this.pieces[i][j] == "Bk") {
          image(this.king2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White King
        else if (this.pieces[i][j] == "Wk") {
          image(this.king1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }
      }
    }
  }
}
