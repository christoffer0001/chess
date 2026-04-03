class Rook {
  contructor() {
    this.x = x;
    this.y = y;
  }

  move(colour, pre, current, pieces) {
    console.log("Rook: ");
    console.log(colour, pre, current);

    if (this.validMove(colour, pre, current, pieces)) {
      if (colour == 0) {
        pieces[pre[1]][pre[0]] = ""; // [y, x]
        pieces[current[1]][current[0]] = "Br"; // [y, x]
      } else {
        pieces[pre[1]][pre[0]] = ""; // [y, x]
        pieces[current[1]][current[0]] = "Wr"; // [y, x]
      }
    }
  }

  validMove(colour, pre, current, pieces) {
    //Check that movement is either horizontal or vertical (no diagonal)
    if (current[1] == pre[1] || current[0] == pre[0]) {
      this.diff = current[1] - pre[1] + current[0] - pre[0];
      this.verticalCheck;
      this.dir;
      if (this.diff < 0) {
        this.dir = -1;
      } else {
        this.dir = 1;
      }

      //If not vertical
      if (current[1] - pre[1] != 0) {
        this.verticalCheck = true;
      } else {
        this.verticalCheck = false;
      }

      for (let i = 1; i <= Math.abs(this.diff); i++) {
        if (this.verticalCheck == true) {
          //Check for squares in y direction, for i <= absolute value of difference
          if (pieces[pre[1] + i * this.dir][pre[0]] != "") {
            return false;
          }
        }
        if (this.verticalCheck == false) {
          //Check squares in x direction
          if (pieces[pre[1]][pre[0] + i * this.dir] != "") {
            return false;
          }
        }
      }

      return true;
    }
  }
}
