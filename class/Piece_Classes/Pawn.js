class Pawn {
  contructor() {
    this.x = x;
    this.y = y;
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
    //make sure square isn't occupied
    if (pieces[current[1]][current[0]] == "") {
      //Black piece
      if (colour == 0) {
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
      }

      //White pieces
      if (colour == 1) {
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
      }
    }
  }
}
