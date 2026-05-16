class Rook {
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
        this.setPiece(cx, cy, "Br");
        gameController.player *= -1;
      } else {
        this.setPiece(px, py, "");
        this.setPiece(cx, cy, "Wr");
        gameController.player *= -1;
      }
    }
  }

  validMove(colour, pre, current) {
    let [px, py] = pre; //preX, preY
    let [cx, cy] = current; //currentX, currentY

    //Check that movement is either horizontal or vertical (no diagonal)
    if (px == cx || py == cy) {
      this.diff = cx - px + cy - py; //Finds the difference
      this.verticalCheck;

      //Controlls the dirrection of the piece
      this.dir;
      if (this.diff < 0) {
        this.dir = -1;
      } else {
        this.dir = 1;
      }

      //If not vertical
      if (cy - py != 0) {
        this.verticalCheck = true;
      } else {
        this.verticalCheck = false;
      }

      for (let i = 1; i <= Math.abs(this.diff); i++) {
        if (this.verticalCheck == true) {
          let piece = this.getPiece(px, py + i * this.dir);
          //Check for squares in y direction, for i <= absolute value of difference
          if (piece != "") {
            this.tempPos = [px, py + i * this.dir];

            //Check if valid capture (and the last square in the move)
            if (this.captureCheck.check(colour, this.tempPos) && i == Math.abs(this.diff)) {
              return true;
            } else {
              return false;
            }
          }
        }
        if (this.verticalCheck == false) {
          //Check squares in x direction
          let piece = this.getPiece(px + i * this.dir, py);
          if (piece != "") {
            this.tempPos = [pre[1], pre[0] + i * this.dir];
            this.tempPos = [px + i * this.dir, py];

            //Check if valid capture (and the last square in the move)
            if (this.captureCheck.check(colour, this.tempPos) && i == Math.abs(this.diff)) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
      return true;
    }
  }
}
