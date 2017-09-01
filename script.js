//variables columns and rows

var colsCount = 7;
var rowsCount = 7;

$(document).ready(function () {
    //access to html
    var container = $("#container");
    var gameBoard = $("#game-board");
    var headerGameBoard = $("#header-game-board");
    var asideGameBoard = $("#aside-game-board");

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

    var gameBoardWithShips = [
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0]
    ]

    //function that checks fields(empty or ship)
    gameBoard.click(function (e) {

        var coOrdinates = e.target.id.split('_');
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
                    imageUrl: "sweetalert-master/example/images/thumbs-up.jpg"
                });
            }, 10);
            // container.html("Tak jest brawo TY <br><br>"+'<span onclick="location.reload()">Jeszcze raz???</span>');
        }

    });


    //display html
    headerGameBoard.html(writeLetters);
    asideGameBoard.html(writeNumbers);
    gameBoard.html(content);
});