class PieceControll {
  constructor(x, y, pawn1, pawn2, rook1, rook2, knight1, knight2, bishop1, bishop2, queen1, queen2, king1, king2) {
    this.x = x;
    this.y = y;
    this.pawn1 = pawn1;
    this.pawn2 = pawn2;
    this.rook1 = rook1;
    this.rook2 = rook2;
    this.knight1 = knight1;
    this.knight2 = knight2;
    this.bishop1 = bishop1;
    this.bishop2 = bishop2;
    this.queen1 = queen1;
    this.queen2 = queen2;
    this.king1 = king1;
    this.king2 = king2;
    /* Pieces registration:
        Black = B-
        White = W-
        Empty = ""
        Pawn = "-p"
        Rook = "-r"
        Knight = "-kn"
        Bishop = "-b"
        Queen = "-q"
        King = "-k"
    */

    this.pieces = [
      ["Br", "Bkn", "Bb", "Bq", "Bk", "Bb", "Bkn", "Br"],
      ["Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp", "Bp"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp", "Wp"],
      ["Wr", "Wkn", "Wb", "Wq", "Wk", "Wb", "Wkn", "Wr"],
    ];
  }

  display() {
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        //Black pawn
        if (this.pieces[i][j] == "Bp") {
          image(this.pawn2, (this.x / 8) * j, (this.y / 8) * i, this.x / 8, this.y / 8 - this.y / 160);
        }

        //White pawn
        else if (this.pieces[i][j] == "Wp") {
          image(this.pawn1, (this.x / 8) * j, (this.y / 8) * i, this.x / 8, this.y / 8 - this.y / 160);
        }

        //Black Rook
        else if (this.pieces[i][j] == "Br") {
          image(this.rook2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Rook
        else if (this.pieces[i][j] == "Wr") {
          image(this.rook1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black Knight
        else if (this.pieces[i][j] == "Bkn") {
          image(this.knight2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Knight
        else if (this.pieces[i][j] == "Wkn") {
          image(this.knight1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black Bishop
        else if (this.pieces[i][j] == "Bb") {
          image(this.bishop2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Bishop
        else if (this.pieces[i][j] == "Wb") {
          image(this.bishop1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black Queen
        else if (this.pieces[i][j] == "Bq") {
          image(this.queen2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White Queen
        else if (this.pieces[i][j] == "Wq") {
          image(this.queen1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //Black King
        else if (this.pieces[i][j] == "Bk") {
          image(this.king2, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }

        //White King
        else if (this.pieces[i][j] == "Wk") {
          image(this.king1, (this.x / 8) * j + this.x / 150, (this.y / 8) * i + this.x / 150, this.x / 9, this.y / 9);
        }
      }
    }
  }
}
