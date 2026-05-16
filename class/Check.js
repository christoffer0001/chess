//Kings attack
class Check {
  constructor(getPieces, rook, bishop, knight, queen, pawn, king) {
    this.getPieces = getPieces;

    this.rook = rook;
    this.bishop = bishop;
    this.knight = knight;
    this.queen = queen;
    this.pawn = pawn;
    this.king = king;
  }

  //Methode for finding the position of the king
  findKing(colour) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        //Finds the piece
        let piece = this.getPieces(x, y);
        //Check if the piece is a king, and which one? Also ensures it's the right king that's returned
        if (colour == 0 && piece == "Bk") return [x, y];
        if (colour == 1 && piece == "Wk") return [x, y];
      }
    }
  }

  canPieceAttack(from, to, colour, piece) {
    //Check if the pieces has the king as a valid move, from where they are
    switch (piece) {
      case "Bp":
      case "Wp":
        if (this.pawn.validMove(colour, from, to)) {
          gameController.checkingPiecePos = from;
          return true;
        } else {
          return false;
        }

      case "Br":
      case "Wr":
        if (this.rook.validMove(colour, from, to)) {
          gameController.checkingPiecePos = from;
          return true;
        } else {
          return false;
        }

      case "Bkn":
      case "Wkn":
        if (this.knight.validMove(colour, from, to)) {
          gameController.checkingPiecePos = from;
          return true;
        } else {
          return false;
        }

      case "Bb":
      case "Wb":
        if (this.bishop.validMove(colour, from, to)) {
          gameController.checkingPiecePos = from;
          return true;
        } else {
          return false;
        }

      case "Bq":
      case "Wq":
        if (this.queen.validMove(colour, from, to)) {
          gameController.checkingPiecePos = from;
          return true;
        } else {
          return false;
        }

      case "Bk":
      case "Wk":
        if (this.king.validMove(colour, from, to)) {
          gameController.checkingPiecePos = from;
          return true;
        } else {
          return false;
        }
    }
  }

  isSquareAttacked(targetPos, attackColour) {
    let [tx, ty] = targetPos;

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let piece = this.getPieces(x, y);

        //Moves to next itteration
        if (piece == "") continue;

        let colour = piece[0] == "B" ? 0 : 1;

        //Moves to next itteration
        if (colour != attackColour) continue;

        if (this.canPieceAttack([x, y], [tx, ty], colour, piece)) return true;
      }
    }
    return false;
  }

  isKingInCheck(colour, kingPos) {
    //Finds king position
    this.kingPos = kingPos;

    if (!this.kingPos) {
      this.kingPos = this.findKing(colour);
    }

    //Finds the enemy colour to the colour of the king
    let enemyColour = colour == 0 ? 1 : 0;

    //Check if the square is being attacked by the enemy coloured pieces
    return this.isSquareAttacked(this.kingPos, enemyColour);
  }
}
