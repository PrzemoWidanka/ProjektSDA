var colsCount = 7;
var rowsCount = 7;

$(document).ready(function () {

    var container = $("#container");
    var gameBoard = $("#game-board");
    var headerGameBoard = $("#header-game-board");
    var asideGameBoard = $("#aside-game-board");
    var buttonPlay = $(".play-button");
    var buttonRestart = $(".restart-button");
    var firstBoard = $(".first-board");
    var stopwatch = $(".stopwatch");

    var hitCount;
    var numberShips = 5;
    var intervalId;
    var time = 0;
    var gameBoardWithShips;
    var missCount;
    var bestTime = 30;
    var timeGame = 0;

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

                var shotResult = gameBoardWithShips[i][j];
                var style = shotResult ? ' style="opacity:0.5" ' : '';
                var id = "field_" + i + "_" + j;
                content = content + '<div id="' + id + '" ' + style + 'class="game-board-div">' + '</div>';
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
        init();
        turnOffClickButtonPlay();
        gameBoard.unbind('click');
        gameBoard.click(clickGameBoard);
        gameBoard.attr("style", "cursor: pointer");
        headerGameBoard.html(createLetters());
        asideGameBoard.html(createNumbers());
        gameBoard.html(createGameBoard());
    }

    function restartMissCount() {
        $(".miss-ships").text("0");
        missCount = 0;
    }

    function restartHit() {
        $(".hit-ships").text("0");
        hitCount = 0;
    }

    function updateTimer() {
        if (time >= 0) {
            $(".time").text(30 - time);
        }
    }

    function turnOffClickGameBoard() {
        gameBoard.attr("style", "cursor: default");
        gameBoard.unbind('click');
    }

    function turnOffClickButtonPlay() {
        buttonPlay.attr("style", "cursor: default");
        buttonPlay.unbind('click');
    }

    function displaySweetAlert(title, text, type) {
        setTimeout(function () {
            sweetAlert({
                title: title,
                text: text,
                type: type,
                closeOnCancel: false
            });
        }, 10);
    }

    function restartTime() {
        time = 0;
        updateTimer(0);
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

    function isFieldEmpty(row, col) {
        if (row < 0 || col < 0 || row > rowsCount - 1 || col > colsCount - 1) {
            return true;
        }
        return gameBoardWithShips[row][col] !== 1;
    }

    function insertShip() {

        var row = Math.floor(Math.random() * rowsCount);
        var col = Math.floor(Math.random() * colsCount);
        if (isFieldEmpty(row, col) &&
            isFieldEmpty(row + 1, col + 1) &&
            isFieldEmpty(row - 1, col - 1) &&
            isFieldEmpty(row + 1, col - 1) &&
            isFieldEmpty(row - 1, col + 1) &&
            isFieldEmpty(row + 1, col) &&
            isFieldEmpty(row - 1, col) &&
            isFieldEmpty(row, col + 1) &&
            isFieldEmpty(row, col - 1)) {
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

    function displayTimeGame() {
        $(".result2").text((time) + " sek.");
    }

    function startGameTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(function () {
            time++
            updateTimer();
            if (time === 30) {
                displaySweetAlert("Oops", "TimeOUT", "error");
                turnOffClickGameBoard();
                displayTimeGame();
                clearInterval(intervalId);
            }
        }, 1000);
    }

    function revealField(e, classStyle, classHtmlThatDisplayNumber, numberHitShipsOrMissAttempt) {
        var target = $(e.target);
        target.removeClass("game-board-div");
        target.addClass(classStyle);
        target.click(false);
        $(classHtmlThatDisplayNumber).text(numberHitShipsOrMissAttempt + 1);
        numberHitShipsOrMissAttempt;
    }

    // function missShip(e) {
    //     var target = $(e.target);
    //     target.removeClass("game-board-div");
    //     target.addClass("miss");
    //     target.click(false);
    //     $(".miss-ships").text(missCount + 1);
    //     missCount++;
    // }

    buttonPlay.click(function () {
        startGame();
        firstBoard.remove();
        buttonRestart.removeAttr('disabled');
    });

    buttonRestart.click(function () {
        startGame();
        $(".result2").text("");
    });

    function clickGameBoard(e) {

        var coordinates = e.target.id.split('_');

        if (coordinates.length < 3) {
            return;
        }
        var shotResult = gameBoardWithShips[coordinates[1]][coordinates[2]];

        // var target = $(e.target);
        if (shotResult === 1) {
            revealField(e, "hit", ".hit-ships", hitCount++);
            // target.removeClass("game-board-div");
            // target.addClass("hit");
            // target.click(false);
            // $(".hit-ships").text(hitCount + 1);
            // hitCount++;
        } else {
            revealField(e, "miss", ".miss-ships", missCount++);
            // target.removeClass("game-board-div");
            // target.addClass("miss");
            // target.click(false);
            // $(".miss-ships").text(missCount + 1);
            // missCount++;
        }
        if (missCount === 44) {
            turnOffClickGameBoard();
            displaySweetAlert("Oops", "Przegrałeś", "error");
            displayTimeGame();
            clearInterval(intervalId);
        }
        if (hitCount === 5) {
            hitCount = 0;
            turnOffClickGameBoard();
            displaySweetAlert("Gratki", "Przeszedleś GIERE", "success");
            clearInterval(intervalId);
            if (time < bestTime || time < localStorage.getItem("bestTimeStorage", bestTime)) {
                bestTime = time;
                localStorage.setItem("bestTimeStorage", bestTime);
                $(".result").text((bestTime) + " sek.");
                $(".result2").text((bestTime) + " sek.");
            } else {
                timeGame = time;
                $(".result2").text((timeGame) + " sek.");
            }
        }
    }

    function init() {
        if (localStorage.getItem("bestTimeStorage", bestTime)) {
            bestTime = $(".result").html(localStorage.getItem("bestTimeStorage") + " sek.");
        }
    }
});