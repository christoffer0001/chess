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
      } else {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Wk");
      }
    }
  }

  validMove() {
    let [px, py] = pre;
    let [cx, cy] = current;
  }
}
