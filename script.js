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

    var yes = new Audio("video/Ding.wav");
    var no = new Audio("video/no.wav");
    var win = new Audio("video/Victory.wav");
    var lose = new Audio("video/fail.wav");

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
                content = content + '<div id="' + id + '" class="game-board-div hover-effect">' + '</div>';
            }
        }
        return content;
    }

    function startGame() {
        clearGameBoard();
        instertShips();
        startGameTimer();
        restartTime();
        restartHit();
        // startGameTimer();
        restartMissCount();
        init();
        turnOffClickButtonPlay();
        displayBlock();
        gameBoard.unbind('click');
        gameBoard.click(clickGameBoard);
        gameBoard.attr("style", "cursor: pointer");
        $('.remove').removeClass('main-container');
        headerGameBoard.html(createLetters());
        asideGameBoard.html(createNumbers());
        gameBoard.html(createGameBoard());
    }

    function displayBlock() {
        $(container).css('display','block');
        $(stopwatch).css('display','block');
        $('.best-time').css('display','block');
        $('.restart-button').css('display','block');
        $('.hit-field').css('display','block');
        $('.miss-field').css('display','block');
        $('.play-button').css('display','none');
        $('.pirat').css('display','none');
        $('.instruction').css('display','none');
        $('.moje').css('display','block');
        
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
            time++;
            updateTimer();
            if (time === 30) {
                lose.play();
                displaySweetAlert("Oops", "TimeOUT", "error");
                turnOffClickGameBoard();
                buttonRestart.attr('disabled', true);
                setTimeout(function(){
                    buttonRestart.attr('disabled', false);
                },3500);
                displayTimeGame();
                clearInterval(intervalId);
                gameBoard.children().removeClass("hover-effect");
            }
        }, 1000);
    }

    function revealField(e, classStyle, classHtmlThatDisplayNumber, numberHitShipsOrMissAttempt) {
        var target = $(e.target);
        target.addClass(classStyle);
        target.click(false);
        target.removeClass("game-board-div");
        $(classHtmlThatDisplayNumber).text(numberHitShipsOrMissAttempt + 1);
        numberHitShipsOrMissAttempt;
    }

    buttonPlay.click(function () {
        startGame();
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

        if (shotResult === 1) {
            revealField(e, "hit", ".hit-ships", hitCount++);
            yes.play();

        } else {
            revealField(e, "miss", ".miss-ships", missCount++);
            no.play();
        }
        if (missCount === 44) {
            turnOffClickGameBoard();
            displaySweetAlert("Oops", "Przegrałeś", "error");
            displayTimeGame();
            clearInterval(intervalId);
            lose.play();
        }
        if (hitCount === 5) {
            hitCount = 0;
            turnOffClickGameBoard();
            displaySweetAlert("Gratki", "Przeszedleś GIERE", "success");
            clearInterval(intervalId);
            win.play();
            buttonRestart.attr('disabled', true);
            setTimeout(function(){
                buttonRestart.attr('disabled', false);
            },5000);
            if (time < bestTime || time < localStorage.getItem("bestTimeStorage", bestTime)) {
                bestTime = time;
                if(localStorage){
                    localStorage.setItem("bestTimeStorage", bestTime);
                }
                $(".result").text((bestTime) + " sek.");
                $(".result2").text((bestTime) + " sek.");
            } else {
                timeGame = time;
                $(".result2").text((timeGame) + " sek.");
            }
        }
    }

    function init() {
        if (localStorage && localStorage.getItem("bestTimeStorage", bestTime)) {
            bestTime = $(".result").html(localStorage.getItem("bestTimeStorage") + " sek.");
        }
    }
});