class Board {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  drawing() {
    //colour the squares
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        push();
        if ((i % 2) - (j % 2) == 0) {
          fill(255);
        } else {
          fill(90);
        }
        //fill(random(1, 255), random(1, 255), random(1, 255));
        rect((this.x / 8) * i, (this.y / 8) * j, this.x / 8, this.y / 8);
        pop();
      }

      //Name the squares
      let sqrName = ["", "a", "b", "c", "d", "e", "f", "g", "h"];

      text(`${sqrName[i]}`, (x / 8) * (i - 1) + x / 8 - 15, y - 5);
      text(`${i + 1}`, 5, y - (y / 8) * i - 5);
    }
  }
}
