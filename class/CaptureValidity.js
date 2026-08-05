class CaptureValidity {
  constructor(getPieces) {
    this.getPieces = getPieces;
  }

  check(colour, position) {
    let [x, y] = position;
    let piece = this.getPieces(x, y);

    if ((piece[0] == "W" && colour == -1) || (piece[0] == "B" && colour == 1)) {
      return true;
    } else {
      return false;
    }
  }
}
