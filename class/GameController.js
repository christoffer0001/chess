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

    //FEN code conveter (between array and FEN)
    this.fenConvert = new Notation();

    //Adds event listener to html btn
    document.getElementById("loadFen").addEventListener("click", () => {
      const fen = document.getElementById("fenCode").value;
      this.pieces = this.fenConvert.fenToBoard(fen);
    });

    //Storage as [y, x] (JS - style)
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
    this.captureCheck = new CaptureValidity(this.getPiece.bind(this));

    //Piece classes init
    this.pawnControll = new Pawn(this.captureCheck, this.getPiece.bind(this), this.setPiece.bind(this));
    this.knightControll = new knight(this.captureCheck, this.getPiece.bind(this), this.setPiece.bind(this));
    this.kingControll = new King(this.captureCheck, this.getPiece.bind(this), this.setPiece.bind(this));
    this.bishopControll = new Bishop(this.captureCheck, this.getPiece.bind(this), this.setPiece.bind(this));
    this.queenControll = new Queen(this.captureCheck, this.getPiece.bind(this), this.setPiece.bind(this));
    this.rookControll = new Rook(this.captureCheck, this.getPiece.bind(this), this.setPiece.bind(this));

    this.check = new Check(this.getPiece.bind(this), this.rookControll, this.bishopControll, this.knightControll, this.queenControll, this.pawnControll, this.kingControll);
    this.checkmate = new Checkmate(this.getPiece.bind(this), this.setPiece.bind(this), this.rookControll, this.bishopControll, this.knightControll, this.queenControll, this.pawnControll, this.kingControll, this.check);

    this.checkingPiecePos;

    this.player = 1; //1 = white, -1 = black
  }

  //Helpers to be able to write [x,y] formate, but removing storage bugs since storage in JS is [y,x]
  getPiece(x, y) {
    return this.pieces[y][x];
  }
  setPiece(x, y, value) {
    this.pieces[y][x] = value;
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
      let [lastX, lastY] = this.lastSquare;
      let [currentX, currentY] = this.currentSquare;

      switch (this.pieces[this.lastSquare[1]][this.lastSquare[0]]) {
        /*Black*/

        //TIP: [0,1] != [0,1], because arrays can't be compared that way :)
        // Player 1 = white, player -1 = black
        //Back piece = -1, white piece = 1
        case "Bp":
          if (this.player === 1) return;
          if (this.pawnControll.validMove(-1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(-1, [lastX, lastY], [currentX, currentY])) {
            this.pawnControll.move(-1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Br":
          if (this.player === 1) return;
          if (this.rookControll.validMove(-1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(-1, [lastX, lastY], [currentX, currentY])) {
            this.rookControll.move(-1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Bkn":
          if (this.player === 1) return;
          if (this.knightControll.validMove(-1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(-1, [lastX, lastY], [currentX, currentY])) {
            this.knightControll.move(-1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Bb":
          if (this.player === 1) return;
          if (this.bishopControll.validMove(-1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(-1, [lastX, lastY], [currentX, currentY])) {
            this.bishopControll.move(-1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Bq":
          if (this.player === 1) return;
          if (this.queenControll.validMove(-1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(-1, [lastX, lastY], [currentX, currentY])) {
            this.queenControll.move(-1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Bk":
          if (this.player === 1) return;
          if (!this.wouldLeaveKingInCheck(-1, [lastX, lastY], [currentX, currentY])) {
            this.kingControll.move(-1, [lastX, lastY], [currentX, currentY]);
          }

          break;

        /*White*/

        case "Wp":
          if (this.player === -1) return;
          if (this.pawnControll.validMove(1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(1, [lastX, lastY], [currentX, currentY])) {
            this.pawnControll.move(1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Wr":
          if (this.player === -1) return;
          if (this.rookControll.validMove(1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(1, [lastX, lastY], [currentX, currentY])) {
            this.rookControll.move(1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Wkn":
          if (this.player === -1) return;
          if (this.knightControll.validMove(1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(1, [lastX, lastY], [currentX, currentY])) {
            this.knightControll.move(1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Wb":
          if (this.player === -1) return;
          if (this.bishopControll.validMove(1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(1, [lastX, lastY], [currentX, currentY])) {
            this.bishopControll.move(1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Wq":
          if (this.player === -1) return;
          if (this.queenControll.validMove(1, [lastX, lastY], [currentX, currentY]) && !this.wouldLeaveKingInCheck(1, [lastX, lastY], [currentX, currentY])) {
            this.queenControll.move(1, [lastX, lastY], [currentX, currentY]);
          }
          break;
        case "Wk":
          if (this.player === -1) return;
          if (!this.wouldLeaveKingInCheck(1, [lastX, lastY], [currentX, currentY])) {
            this.kingControll.move(1, [lastX, lastY], [currentX, currentY]);
          }
      }
      this.checkmate.checkmateCheck(this.player);
    }
  }

  checkSquare(posX, posY) {
    let squareWidth = this.x / 8;
    let squareHeight = this.y / 8;

    let x = Math.floor(posX / squareWidth);
    let y = Math.floor(posY / squareHeight);

    return [x, y];
  }

  display() {
    let squareWPawn = this.x / 8;
    let squareHPawn = this.y / 8;
    let squareW = this.x / 8;
    let squareH = this.y / 8;

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let piece = this.getPiece(x, y);

        let drawXpawn = squareW * x;
        let drawYpawn = squareH * y;
        let drawX = squareW * x;
        let drawY = squareH * y;

        //Black pawn
        if (piece == "Bp") {
          image(this.pawn2, drawXpawn, drawYpawn, squareWPawn, squareHPawn - this.y / 160);
        }

        //White pawn
        else if (piece == "Wp") {
          image(this.pawn1, drawXpawn, drawYpawn, squareWPawn, squareHPawn - this.y / 160);
        }

        //Black Rook
        else if (piece == "Br") {
          image(this.rook2, drawX, drawY, squareW, squareH);
        }

        //White Rook
        else if (piece == "Wr") {
          image(this.rook1, drawX, drawY, squareW, squareH);
        }

        //Black Knight
        else if (piece == "Bkn") {
          image(this.knight2, drawX, drawY, squareW, squareH);
        }

        //White Knight
        else if (piece == "Wkn") {
          image(this.knight1, drawX, drawY, squareW, squareH);
        }

        //Black Bishop
        else if (piece == "Bb") {
          image(this.bishop2, drawX, drawY, squareW, squareH);
        }

        //White Bishop
        else if (piece == "Wb") {
          image(this.bishop1, drawX, drawY, squareW, squareH);
        }

        //Black Queen
        else if (piece == "Bq") {
          image(this.queen2, drawX, drawY, squareW, squareH);
        }

        //White Queen
        else if (piece == "Wq") {
          image(this.queen1, drawX, drawY, squareW, squareH);
        }

        //Black King
        else if (piece == "Bk") {
          image(this.king2, drawX, drawY, squareW, squareH);
        }

        //White King
        else if (piece == "Wk") {
          image(this.king1, drawX, drawY, squareW, squareH);
        }
      }
    }
  }

  wouldLeaveKingInCheck(colour, from, to) {
    let movingPiece = this.getPiece(from[0], from[1]);
    let capturedPiece = this.getPiece(to[0], to[1]);

    //make temp move
    this.setPiece(from[0], from[1], "");
    this.setPiece(to[0], to[1], movingPiece);

    //Check if king is now in check
    let inCheck = this.check.isKingInCheck(colour); //true || false

    //undo made move
    this.setPiece(from[0], from[1], movingPiece);
    this.setPiece(to[0], to[1], capturedPiece);

    // returns whether king would be in check
    return inCheck;
  }
}
