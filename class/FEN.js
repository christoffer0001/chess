//https://dev.to/kschneider0/make-a-javascript-chess-board-4cmo
class Notation {
  constructor() {}

  fenToBoard(fen) {
    let board = [];
    // Only use the board section (before the first space)
    let rows = fen.split(" ")[0].split("/"); //https://www.w3schools.com/jsref/jsref_split.asp

    for (let y = 0; y < 8; y++) {
      let row = [];
      let x = 0;

      //https://www.geeksforgeeks.org/javascript/how-to-iterate-over-characters-of-a-string-in-javascript
      for (let char of rows[y]) {
        // Number means empty squares (https://www.w3schools.com/jsref/jsref_isnan.asp)
        if (!isNaN(char)) {
          let empty = Number(char);

          for (let i = 0; i < empty; i++) {
            row.push("");
            x++;
          }
        }
        // Piece
        else {
          let colour = char === char.toUpperCase() ? "W" : "B";
          let piece;

          switch (char.toLowerCase()) {
            case "p":
              piece = "p";
              break;
            case "r":
              piece = "r";
              break;
            case "n":
              piece = "kn";
              break;
            case "b":
              piece = "b";
              break;
            case "q":
              piece = "q";
              break;
            case "k":
              piece = "k";
              break;
          }

          row.push(colour + piece);
          x++;
        }
      }

      board.push(row);
    }

    return board;
  }

  boardToFen() {
    let board = gameController.pieces;

    let rows = [];

    for (let y = 0; y < 8; y++) {
      let row = "";
      let empty = 0;

      for (let x = 0; x < 8; x++) {
        let piece = board[y][x];

        if (piece === "") {
          empty++;
        } else {
          // Write number of empty squares before the piece
          if (empty > 0) {
            row += empty;
            empty = 0;
          }

          let colour = piece[0];
          let type = piece.substring(1);

          let fenPiece;

          switch (type) {
            case "p":
              fenPiece = "p";
              break;
            case "r":
              fenPiece = "r";
              break;
            case "kn":
              fenPiece = "n";
              break;
            case "b":
              fenPiece = "b";
              break;
            case "q":
              fenPiece = "q";
              break;
            case "k":
              fenPiece = "k";
              break;
          }

          // White = uppercase, Black = lowercase
          row += colour === "W" ? fenPiece.toUpperCase() : fenPiece;
        }
      }

      // Empty squares at end of row
      if (empty > 0) {
        row += empty;
      }

      rows.push(row);
    }

    return rows.join("/");
  }
}
