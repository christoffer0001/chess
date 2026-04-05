class Pawn {
  constructor(captureCheck, getPiece, setPiece) {
    this.captureCheck = captureCheck;
    this.getPiece = getPiece;
    this.setPiece = setPiece;
  }

  move(colour, pre, current) {
    let [px, py] = pre; //preX, preY
    let [cx, cy] = current; //currentX, currentY

    if (this.validMove(colour, pre, current)) {
      this.setPiece(px, py, "");
      if (colour == 0) {
        this.setPiece(cx, cy, "Bp");
      } else {
        this.setPiece(cx, cy, "Wp");
      }
    }
  }

  validMove(colour, pre, current) {
    let [px, py] = pre; //preX, preY
    let [cx, cy] = current; //currentX, currentY

    //Black piece
    if (colour == 0) {
      //Check if move (else capture)
      if (this.getPiece(cx, cy) == "") {
        //If on black starting square && pre == current in x direction
        if (py == 1 && px == cx) {
          //calc the difference in vertical squares (y)
          let diff = cy - py;

          if (diff == 1) {
            return true;
          } else if (diff == 2) {
            //Check current square -1 in vertical sqaures wasn't occupied (no jumping pieces)
            if (this.getPiece(cx, cy - 1) == "") {
              return true;
            }
          }
        } else {
          if (cy - py == 1 && px == cx) {
            return true;
          }
        }
      } else {
        //capture logic
        this.tempPos = [cx, cy]; //[y, x]
        if (this.captureCheck.check(colour, this.tempPos) && cy - py == 1 && (cx == px - 1 || cx == px + 1)) {
          return true;
        } else {
          return false;
        }
      }
    }

    //White pieces
    else if (colour == 1) {
      //Check if move (else capture)
      if (this.getPiece(cx, cy) == "") {
        //If on black starting square && pre == current in x direction ([x, y])
        if (py == 6 && px == cx) {
          //calc the difference in vertical squares (y)
          let diff = py - cy;

          if (diff == 1) {
            return true;
          } else if (diff == 2) {
            //Check current square +1 in vertical sqaures wasn't occupied (no jumping pieces)
            if (this.getPiece(cx, cy + 1) == "") {
              return true;
            }
          }
        } else {
          if (py - cy == 1 && px == cx) {
            return true;
          }
        }
      } else {
        //capture logic
        this.tempPos = [cx, cy]; //[y, x]
        if (this.captureCheck.check(colour, this.tempPos) && py - cy == 1 && (cx == px - 1 || cx == px + 1)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
