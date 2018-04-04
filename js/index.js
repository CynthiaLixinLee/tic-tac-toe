let board = ["","","","","","","","",""];
let turns = 0;
let hu = "";
let co = "";

/* PLAYER CHOICE */
$(document).ready(function() {
  reset();
  $("#choose-x").on('click', function() {
    $(".game-start").hide();
    $(".game-play").show(); 
    hu = "X";
    co = "O";
  });
  $("#choose-o").on('click', function() {
    $(".game-start").hide();
    $(".game-play").show(); 
    hu = "O";
    co = "X";
  });
/* GAME PLAY */
  $(".game-button").on('click', function() {
    selection = parseInt($(this).attr("id"));
    move(board, selection);
    $(this).html(board[selection]);
    status(board);
  });
});

function move(board, selection) {
  if (board[selection] == "") {
    turns ++;
    board[selection] = hu;
  } 
}

function status(board) {
  if (win(board, hu)) { // If you win
    setTimeout(function() {
      $(".win").show();
    }, 600)
    setTimeout(function() {
     reset();
    }, 3000);
    return;
  } else if (turns == 9) {
    draw();
  } else { 
    // Computer's turn
    turns ++;
    strategy();
    empty = [];
    board[bestMove] = co;
    let coMove = "#" + bestMove;
    setTimeout(function() {
      $(coMove).html(co);
    }, 700);
    if (win(board, co)) { // If computer wins
      setTimeout(function() {
        $(".lose").show();
      }, 800)
      setTimeout(function() { 
        reset();
      }, 3000);
      return;
    } else if (turns == 9) {
        setTimeout(function() {
          $(".draw").show();
        }, 800)
    } else {
      // INDICATE THAT IT'S THE HUMAN'S TURN
      console.log("Your turn!");
    }
   }
}

function draw() {
  $(".draw").show();
  setTimeout(function() {
    reset();
  }, 3000);
  return;
}

function reset() {
  turns = 0;
  board = ["","","","","","","","",""];
  $(".game-button").html("");
  $(".game-start").show();
  $(".game-play").hide(); 
  $(".game-end").hide();
}

/* COMPUTER LOGIC */
let empty = [];
let bestMove = "";

function strategy() {
  for (let i = 0; i<board.length; i++) {
    (board[i] === "") ? empty.push(i) : empty;
  };
  if (checkWin(empty) === true) {
    return bestMove;
  } else if (checkLose(empty) === true) {
    return bestMove;
  } else if (board[4] === "") {
    return bestMove = 4;
  } else if (board[0] === "") {
    return bestMove = 0;
  } else if (board[2] === "") {
    return bestMove = 2;
  } else if (board[6] === "") {
    return bestMove = 6;
  } else if (board[8] === "") {
    return bestMove = 8;
  } else {
    return bestMove = empty[0];
  }
}

function checkWin(empty) {
  for (let i = 0; i<empty.length; i++) {
    board[empty[i]] = co;
    if (win(board, co)) {
      bestMove = empty[i];
      board[empty[i]] = "";
      return true;
    }
    board[empty[i]] = "";
  }
}

function checkLose(empty) {
 for (let i = 0; i<empty.length; i++) {
    board[empty[i]] = hu;
    if (win(board,hu)) {
      bestMove = empty[i];
      board[empty[i]] = "";
      return true;
    }
    board[empty[i]] = "";
 }
}

function win(board, player){
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)) {
    return true;
  }
}