class Pawn {
  constructor(captureCheck) {
    this.captureCheck = captureCheck;
  }

  move(colour, pre, current, pieces) {
    console.log("Pawn: ");
    console.log(colour, pre, current);

    if (this.validMove(colour, pre, current, pieces)) {
      if (colour == 0) {
        pieces[pre[1]][pre[0]] = ""; // [y, x]
        pieces[current[1]][current[0]] = "Bp"; // [y, x]
      } else {
        pieces[pre[1]][pre[0]] = ""; // [y, x]
        pieces[current[1]][current[0]] = "Wp"; // [y, x]
      }
    }
  }

  validMove(colour, pre, current, pieces) {
    this.colour = colour;
    //Black piece
    if (this.colour == 0) {
      //Check if move (else capture)
      if (pieces[current[1]][current[0]] == "") {
        //If on black starting square && pre == current in x direction ([x, y])
        if (pre[1] == 1 && pre[0] == current[0]) {
          //calc the difference in vertical squares (y)
          let diff = current[1] - pre[1];

          if (diff == 1) {
            return true;
          } else if (diff == 2) {
            //Check current square -1 in vertical sqaures wasn't occupied (no jumping pieces)
            if (pieces[current[1] - 1][current[0]] == "") {
              return true;
            }
          }
        } else {
          if (current[1] - pre[1] == 1 && pre[0] == current[0]) {
            return true;
          }
        }
      } else {
        //capture logic
        this.tempPos = [current[1], current[0]]; //[y, x]
        if (this.captureCheck.check(this.colour, pieces, this.tempPos) && current[1] - pre[1] == 1 && (current[0] == pre[0] - 1 || current[0] == pre[0] + 1)) {
          return true;
        } else {
          return false;
        }
      }
    }

    //White pieces
    else if (this.colour == 1) {
      //Check if move (else capture)
      if (pieces[current[1]][current[0]] == "") {
        //If on black starting square && pre == current in x direction ([x, y])
        if (pre[1] == 6 && pre[0] == current[0]) {
          //calc the difference in vertical squares (y)
          let diff = pre[1] - current[1];

          if (diff == 1) {
            return true;
          } else if (diff == 2) {
            //Check current square +1 in vertical sqaures wasn't occupied (no jumping pieces)
            if (pieces[current[1] + 1][current[0]] == "") {
              return true;
            }
          }
        } else {
          if (pre[1] - current[1] == 1 && pre[0] == current[0]) {
            return true;
          }
        }
      } else {
        //capture logic
        this.tempPos = [current[1], current[0]]; //[y, x]
        if (this.captureCheck.check(this.colour, pieces, this.tempPos) && pre[1] - current[1] == 1 && (current[0] == pre[0] - 1 || current[0] == pre[0] + 1)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
