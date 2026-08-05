class King {
  constructor(captureCheck, getPiece, setPiece) {
    this.captureCheck = captureCheck;
    this.getPiece = getPiece;
    this.setPiece = setPiece;
  }

  move(colour, pre, current) {
    let [px, py] = pre; //preX, preY
    let [cx, cy] = current; //currentX, currentY

    if (this.validMove(colour, pre, current)) {
      if (colour == -1) {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Bk");
        gameController.player *= -1;
      } else {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Wk");
        gameController.player *= -1;
      }
    }
  }

  validMove(colour, pre, current) {
    let [px, py] = pre;
    let [cx, cy] = current;

    this.diffX = px - cx;
    this.diffY = Math.abs(py - cy);

    if (this.checkCastle(colour, pre, current)) {
      if (colour == -1) {
        if (this.diffX < 0) {
          this.setPiece(4, 0, "");
          this.setPiece(6, 0, "Bk");

          this.setPiece(7, 0, "");
          this.setPiece(5, 0, "Br");
          gameController.player *= -1;
        } else {
          this.setPiece(4, 0, "");
          this.setPiece(2, 0, "Bk");

          this.setPiece(0, 0, "");
          this.setPiece(3, 0, "Br");
          gameController.player *= -1;
        }
      }

      if (colour == 1) {
        if (this.diffX < 0) {
          this.setPiece(4, 7, "");
          this.setPiece(6, 7, "Wk");

          this.setPiece(7, 7, "");
          this.setPiece(5, 7, "Wr");
          gameController.player *= -1;
        } else {
          this.setPiece(4, 7, "");
          this.setPiece(2, 7, "Wk");

          this.setPiece(0, 7, "");
          this.setPiece(3, 7, "Wr");
          gameController.player *= -1;
        }
      }
    }

    if (Math.abs(this.diffX) > 1 || this.diffY > 1) return false;

    let piece = this.getPiece(cx, cy);
    if (piece == "") {
      return true;
    } else {
      if (this.captureCheck.check(colour, [cx, cy])) return true;
    }
    return false;
  }

  checkCastle(colour, pre, current) {
    let [px, py] = pre;
    let [cx, cy] = current;

    let diffX = px - cx;
    let diffY = py - cy;

    if (Math.abs(diffX) != 2 || diffY != 0) return false;

    //For black
    if (colour == -1) {
      if ((px - cx == -2 && this.getPiece(0, 0) == "Br") || (px - cx == 2 && this.getPiece(7, 0) == "Br")) return true;
    }

    //For White
    if (colour == 1) {
      if ((px - cx == -2 && this.getPiece(7, 7) == "Wr") || (px - cx == 2 && this.getPiece(0, 7) == "Wr")) return true;
    }
  }
}
