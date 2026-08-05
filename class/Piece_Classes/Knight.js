class knight {
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
        this.setPiece(cx, cy, "Bkn");
        gameController.player *= -1;
      } else {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Wkn");
        gameController.player *= -1;
      }
    }
  }

  validMove(colour, pre, current) {
    let [px, py] = pre;
    let [cx, cy] = current;

    this.diffX = Math.abs(px - cx);
    this.diffY = Math.abs(py - cy);

    if (this.diffX > 2 || this.diffY > 2) return false;

    if ((this.diffX == 2 && this.diffY == 1) || (this.diffX == 1 && this.diffY == 2)) {
      let piece = this.getPiece(cx, cy);
      if (piece === "") return true;
      if (piece !== "") {
        if (this.captureCheck.check(colour, [cx, cy])) return true;
      }
    }
  }
}
