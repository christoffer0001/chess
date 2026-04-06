class Bishop {
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
        this.setPiece(cx, cy, "Bb");
      } else {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Wb");
      }
    }
  }

  validMove(colour, pre, current) {
    let [px, py] = pre;
    let [cx, cy] = current;

    this.dirY = py < cy ? 1 : -1; //Ternary operator: (Condition to test) ? true value : false value
    this.dirX = px < cx ? 1 : -1;
    this.diff = Math.abs(px - cx);
    if (cy - py != this.diff * this.dirY) return false;

    for (let i = 1; i <= this.diff; i++) {
      let piece = this.getPiece(px + i * this.dirX, py + i * this.dirY);
      this.tempPos = [px + i * this.dirX, py + i * this.dirY];
      if (piece !== "") {
        //Check if valid capture (and the last square in the move)
        if (this.captureCheck.check(colour, this.tempPos) && i == this.diff) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  }
}
