/**
 * Generate a chess board.
 *
 * @param {*} whiteQueen
 * @param {*} blackQueen
 * @returns
 */
function generateBoard(whiteQueen, blackQueen) {
  // Set up an array of pieces, this could be useful later
  // if we want to add more piece types.
  // For now, we only have queens, and we don't even distinguish
  // between black and white, they're both just id=1.
  const pieces = [
    {
      id: 1,
      pos: whiteQueen,
    },
    {
      id: 1,
      pos: blackQueen,
    },
  ];
  const board = [];
  // Generate the board, adding the queens as we go
  for (let y = 0; y < 8; y++) {
    // Push a new row for the board
    board.push([]);
    for (let x = 0; x < 8; x++) {
      // Determine if there's a piece to place on this square
      let matchedPiece;
      for (let p = 0; p < pieces.length; p++) {
        const [px, py] = pieces[p].pos;
        if (px == x && py == y) {
          matchedPiece = pieces[p];
          break;
        }
      }
      // If there's a piece to place, place its id.
      // Otherwise, place a blank square, with `0`
      if (matchedPiece) {
        board[y].push(matchedPiece.id);
      } else {
        board[y].push(0);
      }
    }
  }
  // Return the board
  return board;
}

/**
 * Detect whether two queens on the board are mutually threatening.
 */
function queenThreat(board) {
  /**
   * Traverse the board, finding the positions of any pieces.
   *
   * Note: We assume squares with `0` to be empty, and we assume
   * all other values to be meaningful.
   */
  const pieces = [];
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      const square = board[x][y];
      if (square !== 0) {
        pieces.push({
          id: square,
          pos: [x, y],
        });
      }
    }
  }
  /**
   * We expect to find two pieces, and we expect both these pieces
   * to be queens, which are represented with the id `1`.
   * If these expectations aren't met, we return false, since according
   * to our parameters, there is no queen threat we can find.
   */
  const queens = pieces.filter((piece) => piece.id == 1);
  if (queens.length !== 2) {
    return false;
  }
  const [queenOne, queenTwo] = pieces;
  /**
   * The queens are threatening each other if:
   * - they are in the same row, ie they share their y position
   * - they are in the same column, ie they share their x position
   * - they are at a diagonal
   */
  const [q1x, q1y] = queenOne.pos;
  const [q2x, q2y] = queenTwo.pos;
  const isSameRow = q1y == q2y;
  const isSameCol = q1x == q2x;
  /**
   * Two pieces are at a diagonal if the difference between the piece
   * positions has  x and y components with the same absolute value
   */
  const [deltaX, deltaY] = [[q2x - q1x], [q2y - q1y]];
  const isAtDiagonal = Math.abs(deltaX) === Math.abs(deltaY);
  // Collect the queen threat factors, and return the result
  const hasQueenThreat = isSameRow || isSameCol || isAtDiagonal;
  return hasQueenThreat;
}

let whiteQueen = [0, 5];
let blackQueen = [5, 0];
let generatedBoard = generateBoard(whiteQueen, blackQueen);
console.log(generatedBoard);
console.log(queenThreat(generatedBoard));

whiteQueen = [0, 0];
blackQueen = [5, 7];
generatedBoard = generateBoard(whiteQueen, blackQueen);
console.log(generatedBoard);
console.log(queenThreat(generatedBoard));
