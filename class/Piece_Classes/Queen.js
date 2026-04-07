class Queen {
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
        this.setPiece(cx, cy, "Bq");
      } else {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Wq");
      }
    }
  }

  validMove(colour, pre, current) {
    let [px, py] = pre;
    let [cx, cy] = current;

    this.diffX = Math.abs(cx - px);
    this.diffY = Math.abs(cy - py);
    this.dirX = px < cx ? 1 : -1;
    this.dirY = py < cy ? 1 : -1;

    if (this.diffX === 0) {
      for (let i = 1; i <= this.diffY; i++) {
        let piece = this.getPiece(px, py + i * this.dirY);
        if (piece != "") {
          if (this.captureCheck.check(colour, [cx, cy]) && py + i * this.dirY == cy) {
            return true;
          } else {
            return false;
          }
        }
      }
      return true;
    } else if (this.diffY === 0) {
      for (let i = 1; i <= this.diffX; i++) {
        let piece = this.getPiece(px + i * this.dirX, py);
        if (piece != "") {
          if (this.captureCheck.check(colour, [cx, cy]) && px + i * this.dirX == cx) {
            return true;
          } else {
            return false;
          }
        }
      }
      return true;
    } else if (this.diffX == this.diffY) {
      for (let i = 1; i <= this.diffX; i++) {
        let piece = this.getPiece(px + i * this.dirX, py + i * this.dirY);
        this.tempPos = [px + i * this.dirX, py + i * this.dirY];
        if (piece !== "") {
          if (this.captureCheck.check(colour, this.tempPos) && i == this.diffX) {
            return true;
          } else {
            return false;
          }
        }
      }
      return true;
    }
  }
}
