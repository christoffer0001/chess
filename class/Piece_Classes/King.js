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
      if (colour == 0) {
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

    this.diffX = Math.abs(px - cx);
    this.diffY = Math.abs(py - cy);

    if (this.diffX > 1 || this.diffY > 1) return false;

    let piece = this.getPiece(cx, cy);
    if (piece == "") {
      return true;
    } else {
      if (this.captureCheck.check(colour, [cx, cy])) return true;
    }
    return false;
  }
}
