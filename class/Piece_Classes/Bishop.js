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
      if (colour == -1) {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Bb");
        gameController.player *= -1;
      } else {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Wb");
        gameController.player *= -1;
      }
    }
  }
  validMove(colour, pre, current) {
    let [px, py] = pre;
    let [cx, cy] = current;

    let diffX = Math.abs(px - cx);
    let diffY = Math.abs(py - cy);

    // Bishop must move the same amount horizontally and vertically
    if (diffX !== diffY) return false;

    let dirX = px < cx ? 1 : -1;
    let dirY = py < cy ? 1 : -1;

    // Check squares between start and destination
    for (let i = 1; i < diffX; i++) {
      let piece = this.getPiece(px + i * dirX, py + i * dirY);

      if (piece !== "") {
        return false; // Something blocks the diagonal
      }
    }

    // Check destination
    let destination = this.getPiece(cx, cy);

    if (destination === "") {
      return true;
    }

    // Allow capture only if enemy piece
    return this.captureCheck.check(colour, [cx, cy]);
  }
}
