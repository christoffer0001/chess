class CaptureValidity {
  constructor() {}

  check(colour, pieces, position) {
    this.colour = colour; //White = 1, Black = 0
    this.pieces = pieces;
    this.position = position;

    this.piece = this.pieces[this.position[0]][this.position[1]];

    if ((this.piece[0] == "W" && this.colour == 0) || (this.piece[0] == "B" && this.colour == 1)) {
      return true;
    } else {
      return false;
    }
  }
}
