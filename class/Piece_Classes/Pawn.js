class Pawn {
  constructor(captureCheck, getPiece, setPiece) {
    this.captureCheck = captureCheck;
    this.getPiece = getPiece;
    this.setPiece = setPiece;

    this.pass = 0; //Advanced to the other side of the board?
  }

  move(colour, pre, current) {
    let [px, py] = pre; //preX, preY
    let [cx, cy] = current; //currentX, currentY
    console.log(cy);

    if (this.validMove(colour, pre, current)) {
      this.setPiece(px, py, "");
      if (colour == 0) {
        if (cy == 7) {
          this.setPiece(cx, cy, "Bq");
          gameController.player *= -1;
        } else {
          this.setPiece(cx, cy, "Bp");
          gameController.player *= -1;
        }
      } else {
        if (cy == 0) {
          this.setPiece(cx, cy, "Wq");
          gameController.player *= -1;
        } else {
          this.setPiece(cx, cy, "Wp");
          gameController.player *= -1;
        }
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
