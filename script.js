//variables columns and rows

var colsCount = 7;
var rowsCount = 7;

$(document).ready(function () {
    //access to html
    var container = $("#container");
    var gameBoard = $("#game-board");
    var headerGameBoard = $("#header-game-board");
    var asideGameBoard = $("#aside-game-board");
    var buttonPlay = $(".play-button");
    var buttonRestart = $(".restart-button");
    var firstBoard = $(".first-board");
    var stopwatch = $(".stopwatch");

    //variables with letters and numbers to create header and aside
    var letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    var numbers = [1, 2, 3, 4, 5, 6, 7];

    function createLetters() {

        var writeLetters = "";

        for (var i = 0; i <= rowsCount; i++) {
            writeLetters = writeLetters + '<div class="header-game-board ">' + letters[i] + '</div>';
        }
        return writeLetters;
    }

    function createNumbers() {

        var writeNumbers = "";

        for (var i = 0; i < colsCount; i++) {
            writeNumbers = writeNumbers + '<div class="aside-game-board ">' + numbers[i] + '</div>';
        }
        return writeNumbers;
    }

    function createGameBoard() {
        var content = "";
        for (var i = 0; i < colsCount; i++) {
            for (var j = 0; j < rowsCount; j++) {
                var fieldGameBoard = [
                    [i],
                    [j]
                ];
                var shotResult = gameBoardWithShips[i][j];
                var id = "field_" + i + "_" + j;
                content = content + '<div id="' + id + '" class="game-board-div">' + '</div>';
            }
        }
        return content;
    }

    function startGame() {
        clearGameBoard();
        instertShips();
        restartTime();
        restartHit();
        startGameTimer();
        restartMissCount();
        buttonPlay.off('click');
        buttonPlay.css('cursor', 'default');
        gameBoard.unbind('click'); // ??? - zdejmuje nasluchiwanie klika (jesli ktos kliknie kilka razy to wykona sie to tylko raz)
        gameBoard.click(clickGameBoard); // 
        // isPlaying = true;
        headerGameBoard.html(createLetters());
        asideGameBoard.html(createNumbers());
        gameBoard.html(createGameBoard());
    }

    //create ships
    var hitCount;
    var numberShips = 5;
    var intervalId;
    var time;
    var gameBoardWithShips;
    var missCount;
    var bestTime = 30;
    // var isPlaying = false;

    function restartMissCount() {
        $(".miss-ships").text("0");
        missCount = 0;
    }

    function restartHit() {
        $(".hit-ships").text("0");
        hitCount = 0;
    }

    function restartTime() {
        time = 0;
        $(".time").text(30 - time); //pobieramy nowy czas
    }

    function clearGameBoard() {
        gameBoardWithShips = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
    }

    function insertShip() {

        var row = Math.floor(Math.random() * rowsCount);
        var col = Math.floor(Math.random() * colsCount);
        if (gameBoardWithShips[row][col] !== 1) {

            gameBoardWithShips[row][col] = 1;
        } else {
            insertShip();
        }
    }

    function instertShips() {
        for (var i = 0; i < numberShips; i++) {
            insertShip();
        }
    }

    function startGameTimer() {
        clearInterval(intervalId); // czyścimy ponieważ jeśli ktoś kliknie kilka razy by czas nie leciał szybciej
        intervalId = setInterval(function () {
            time++;
            // console.log(time);
            if (time >= 0) {
                $(".time").text(30 - time);
            }
            if (time === 30) {
                setTimeout(function () {
                    sweetAlert({
                        title: "Oops...",
                        text: "TimeOUT!",
                        type: "error",
                        closeOnCancel: false
                    });
                }, 10);
                gameBoard.off('click');
                gameBoard.attr("style", "cursor: default");
                clearInterval(intervalId);
            }
        }, 1000);
    }

    //function that starts the game and starts the stopwatch
    buttonPlay.click(function () {
        $(".first-board").remove();
        startGame();
        buttonRestart.removeAttr('disabled');
    });

    //function that reload the website
    buttonRestart.click(function () {
        // location.reload();
        startGame();
        gameBoard.attr("style", "cursor: pointer");
    });

    buttonRestart.attr('disabled', 'disabled');

    function clickGameBoard(e) {

        var coordinates = e.target.id.split('_');

        if (coordinates.length < 3) {
            return;
        }
        var shotResult = gameBoardWithShips[coordinates[1]][coordinates[2]];

        var target = $(e.target);
        if (shotResult === 1) {
            target.removeClass("game-board-div");
            target.addClass("hit");
            target.click(false);
            $(".hit-ships").text(hitCount + 1);
            hitCount++;
        } else {
            target.removeClass("game-board-div");
            target.addClass("miss");
            target.click(false);
            $(".miss-ships").text(missCount + 1);
            missCount++;
        }
        if (hitCount === 5) {
            hitCount = 0;
            gameBoard.attr("style", "cursor: default");
            gameBoard.off('click');
            setTimeout(function () {
                swal({
                    title: "Gratki !!!",
                    text: "Przeszedłeś GIERE !!",
                    imageUrl: "sweetalert-master/example/images/thumbs-up.jpg",
                    closeOnCancel: false
                });
            }, 10);
            clearInterval(intervalId);
            if (time < bestTime) {
                bestTime = time;
            }
            $(".result").text((bestTime) + " sekund");



            // container.html("Tak jest brawo TY <br><br>"+'<span onclick="location.reload()">Jeszcze raz???</span>');
        }
    }
});