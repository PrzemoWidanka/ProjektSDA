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

    //empty variables to assigment new content html
    var content = "";
    var writeLetters = "";
    var writeNumbers = "";

    //create letters 
    for (var i = 0; i <= rowsCount; i++) {
        writeLetters = writeLetters + '<div class="header-game-board ">' + letters[i] + '</div>';
    }

    //create numbers
    for (var i = 0; i < colsCount; i++) {
        writeNumbers = writeNumbers + '<div class="aside-game-board ">' + numbers[i] + '</div>';
    }

    //create game board
    for (var i = 0; i < colsCount; i++) {
        for (var j = 0; j < rowsCount; j++) {
            var fieldGameBoard = [
                [i],
                [j]
            ];
            var id = "field_" + i + "_" + j;
            content = content + '<div id="' + id + '" class="game-board-div">' + '</div>';
        }
    }

    //create ships
    var hitCount = 0;
    var col, row;
    var numberShips = 5;

    var gameBoardWithShips = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    function insertShip() {

        row = Math.floor(Math.random() * rowsCount);
        col = Math.floor(Math.random() * colsCount);
        if (gameBoardWithShips[row][col] !== 1) {

            gameBoardWithShips[row][col] = 1;
        } else {
            insertShip()
        }
    }

    for (var i = 0; i < numberShips; i++) {
        insertShip();
    }

    //function that checks fields(empty or ship)
    gameBoard.click(function (e) {

        var coOrdinates = e.target.id.split('_');

        if (coOrdinates.length < 3) {
            return;
        }
        var shotResult = gameBoardWithShips[coOrdinates[1]][coOrdinates[2]];

        var target = $(e.target);
        if (shotResult === 1) {
            target.removeClass("game-board-div");
            target.addClass("hit");
            target.click(false);
            hitCount++;
        } else {
            target.removeClass("game-board-div");
            target.addClass("miss");
            target.click(false);
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
            // container.html("Tak jest brawo TY <br><br>"+'<span onclick="location.reload()">Jeszcze raz???</span>');
        }

    });

    buttonPlay.click(function () {
        $(".first-board").remove();
        var time = 0;
        setInterval(function () {
            time++;
            if (time <= 30) {
                $(".time").text(time);
                buttonPlay.off('click');
                buttonPlay.css('cursor','default');
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
                gameBoard.off('click')
                clearInterval(time);
            }
        }, 1000);
    });

    buttonRestart.click(function(){
        location.reload()
    });

    //display html
    headerGameBoard.html(writeLetters);
    asideGameBoard.html(writeNumbers);
    gameBoard.html(content);
});