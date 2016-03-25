
var win //= false;
var winner //= "";
var currentPlayer //= "Player 1";

var Pit = function(value) {
  this.value = value;
}

var startGame = function() {
  win = false;
  winner = "";
  currentPlayer = "Player 1";

  mochi1 = new Pit(0);
  mochi2 = new Pit(0);

  pit0 = new Pit(4);
  pit1 = new Pit(4);
  pit2 = new Pit(4);
  pit3 = new Pit(4);
  pit4 = new Pit(4);
  pit5 = new Pit(4);
  pit6 = new Pit(4);
  pit7 = new Pit(4);
  pit8 = new Pit(4);
  pit9 = new Pit(4);
  pit10 = new Pit(4);
  pit11 = new Pit(4);

  board = [pit0, pit1, pit2, pit3, pit4, pit5, pit6, pit7, pit8, pit9, pit10, pit11];

  updateMoveCSS();
  // setUpBoard.play();
  render();
  $('#winner').remove();
}

clickOn();

var countMove = 0;
var iterator = 0;
var seedsInHand = 0;

var move = function (index) {
  seedsInHand = board[index].value;
  countMove = board[index].value;
  board[index].value = 0;

  for (var i = countMove; i >= 0; i--) {

    if (currentPlayer === "Player 1" && seedsInHand === 1 && index === 11) {
        // console.log("1");
        mochi1.value++;
        // mochilaSound.

        fadeInRight();
        seedsInHand = -1;
    } else if (currentPlayer === "Player 1" && seedsInHand > 1 && index === 11) {
        // console.log("2");
        mochi1.value++;
        // mochiPlus.play();
        fadeInRight();
        index = 0;
        board[index].value++;
        seedsInHand -= 2;
    } else if (currentPlayer === "Player 1" && seedsInHand > 0) {
          // console.log("3");
          index++;
          board[index].value++
          // plusOne.play();
          seedsInHand--;
    } else if (currentPlayer === "Player 1" && seedsInHand === 0
            && board[index].value === 1 && ((6 <= index) &&  (index <= 11))
            && board[11-index].value > 0) {
      eatOpp(index);
    }

    if (currentPlayer === "Player 2" && seedsInHand === 1 && index === 5) {
        // console.log("1");
        mochi2.value++;
        // mochilaSound.play();
        fadeInLeft();
        fadeInLeft();
        seedsInHand = -1;
    } else if (currentPlayer === "Player 2" && seedsInHand > 1 && index === 5) {
        // console.log("2");
        mochi2.value++;
        // mochilaPlus.play();
        fadeInLeft();
        index++;
        board[index].value++;
        seedsInHand -=2;
    } else if (currentPlayer === "Player 2" && seedsInHand > 0) {
        // console.log("3");
        if (index === 11) {
          index = 0;
          board[index].value++;
          // plusOne.play();
          seedsInHand--;
        }
        index++;
        board[index].value++;
        // plusOne.play();
        seedsInHand--;
    } else if (currentPlayer === "Player 2" && seedsInHand === 0
            && board[index].value === 1 && ((0 <= index) && (index <=5))
            && board[11-index].value > 0) {
        eatOpp(index);
    }
  }
  gameEnd();
  gameWinner();
  changePlayer(index);
  render();
}

function invalid (index) {
  console.log(index)
  if ((currentPlayer === "Player 1" && index >= 6) && board[index].value != 0) {
    move(index);
  } else if (( currentPlayer == "Player 2" && index <= 5) && board[index].value != 0) {
    move(index);
  } else if ((currentPlayer === "Player 1" && (index < 6))
    || (currentPlayer === "Player 2" && (index > 5))
    || board[index].value === 0) {
    // invalidSound.play()
    console.log("INVALID MOVE")
  };
}

function changePlayer(index) {
  if (currentPlayer === "Player 1") {
    if (seedsInHand === -1 && index === 11) {
      console.log("player goes again");
      currentPlayer = "Player 1";
    } else {
      currentPlayer = "Player 2";
      console.log("I am supposed to change players");
    }
  } else if (currentPlayer === "Player 2") {
    if (seedsInHand === -1 && index === 5) {
      console.log("player goes again");
      currentPlayer = "Player 2";
    } else {
      currentPlayer = "Player 1";
      console.log("I am supposed to change players");
    }
  }

  //update legal move css
  updateMoveCSS();
}

function fadeInLeft() {
  $(".left").text("+1").fadeIn("slow").fadeOut("slow");
}

function fadeInRight() {
  $(".right").text("+1").fadeIn("slow").fadeOut("slow");

}

function updateMoveCSS() {
  if (currentPlayer === "Player 1") {
    $(".player1").removeClass("lock");
    $(".player2").addClass("lock");
    $("#playerOne").addClass("currentPlayer");
    $("#playerTwo").removeClass("currentPlayer");
  } else {
    $(".player2").removeClass("lock");
    $(".player1").addClass("lock");
    $("#playerTwo").addClass("currentPlayer");
    $("#playerOne").removeClass("currentPlayer");

  }
}

var eatOpp = function (index) {
  if (currentPlayer === "Player 1") {
    mochi1.value += board[index].value + board[11-index].value;
    $(".right").text("+" + (board[index].value + board[11-index].value)).fadeIn("slow").fadeOut("slow");
    // capture.play();
  } else {
    mochi2.value += board[index].value + board[11-index].value;
    $(".left").text("+" + (board[index].value + board[11-index].value)).fadeIn("slow").fadeOut("slow");
    // capture.play();
  }
  board[11-index].value = 0;
  board[index].value = 0;
}


function gameEnd() {
  if ((board[0].value === 0 &&
       board[1].value === 0 &&
       board[2].value === 0 &&
       board[3].value === 0 &&
       board[4].value === 0 &&
       board[5].value === 0)
    ||
      (board[6].value === 0 &&
       board[7].value === 0 &&
       board[8].value === 0 &&
       board[9].value === 0 &&
       board[10].value === 0 &&
       board[11].value === 0)) {
    win = true;

    for (var i = 0; i <= 5; i++) {
      mochi2.value += board[i].value;
      board[i].value = 0;
    }

    for (var i = 6; i <=11; i++) {
      mochi1.value += board[i].value;
      board[i].value = 0;
    }
  }
}


function gameWinner() {
  if (win === true) {
    if (mochi1.value > mochi2.value) {
      winner = "Player 1";
    } else if (mochi2.value > mochi1.value) {
      winner = "Player 2";
    } else { winner = "It's a TIE!!"
    } $('body').append($('<div id="winner">').text("The winner is " + winner + "!!").fadeIn("slow"));
  }
}


function render() {
  $('#currentPlayer').text("Current Player: "+ currentPlayer);
  for (var i = 0; i < board.length; i += 1) {
      $('#pit' + i).text(board[i].value)
    }
  $('#mochi1').text(mochi1.value);
  $('#mochi2').text(mochi2.value);
}

function clickOn() {
  $('.pit').on('click', function(event) {
    event.preventDefault();
    var index = parseInt(event.target.id.slice(3));
    invalid(index);
  });
}

startGame();

$("#restart").on("click", startGame);



