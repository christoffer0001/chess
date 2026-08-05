class Checkmate {
  constructor(getPieces, setPiece, rook, bishop, knight, queen, pawn, king, check) {
    this.getPiece = getPieces;
    this.setPiece = setPiece;

    this.rook = rook;
    this.bishop = bishop;
    this.knight = knight;
    this.queen = queen;
    this.pawn = pawn;
    this.king = king;
    this.check = check;
  }

  makeTempMove(from, to) {
    let moving = this.getPiece(from[0], from[1]);
    let captured = this.getPiece(to[0], to[1]);

    this.setPiece(from[0], from[1], "");
    this.setPiece(to[0], to[1], moving);

    return captured;
  }

  undoTempMove(from, to, captured) {
    let moving = this.getPiece(to[0], to[1]);

    this.setPiece(to[0], to[1], captured);
    this.setPiece(from[0], from[1], moving);
  }

  checkLegalMoves(colour) {
    for (let fromX = 0; fromX < 8; fromX++) {
      for (let fromY = 0; fromY < 8; fromY++) {
        let piece = this.getPiece(fromX, fromY);

        //empty square
        if (piece == "") continue;

        if (colour == -1 && piece[0] != "B") continue;
        if (colour == 1 && piece[0] != "W") continue;

        //Find correct controller to piece
        let controller;

        let type = piece.slice(1);

        switch (type) {
          case "p":
            controller = this.pawn;
            break;
          case "r":
            controller = this.rook;
            break;
          case "kn":
            controller = this.knight;
            break;
          case "b":
            controller = this.bishop;
            break;
          case "q":
            controller = this.queen;
            break;
          case "k":
            controller = this.king;
            break;
        }

        // Try every move
        for (let toX = 0; toX < 8; toX++) {
          for (let toY = 0; toY < 8; toY++) {
            //Check if move is valid
            if (!controller.validMove(colour, [fromX, fromY], [toX, toY])) continue;

            //Simulate move
            let captured = this.makeTempMove([fromX, fromY], [toX, toY]);

            let legal = !this.check.isKingInCheck(colour);

            this.undoTempMove([fromX, fromY], [toX, toY], captured);

            // Find out if minimum one move is legal
            if (legal) return true;
          }
        }
      }
    }

    return false;
  }

  checkmateCheck(colour) {
    if (this.check.isKingInCheck(colour)) {
      if (!this.checkLegalMoves(colour)) {
        console.log("Checkmate");
      } else {
        console.log("Check");
      }
    }
  }
}
