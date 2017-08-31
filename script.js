var colsCount = 7;
var rowsCount = 7;
var fieldCount = 49;

$(document).ready(function () {
    var gameBoard = $("#game-board");
    var headerGameBoard = $("#header-game-board");
    var asideGameBoard = $("#aside-game-board");

    var letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    var numbers = [1, 2, 3, 4, 5, 6, 7];

    var content = "";
    var writeLetters = "";
    var writeNumbers = "";

    for (var i = 0; i <= rowsCount; i++) {
        writeLetters = writeLetters + '<div class="header-game-board ">' + letters[i] + '</div>';
    }

    for (var i = 0; i < colsCount; i++) {
        writeNumbers = writeNumbers + '<div class="aside-game-board ">' + numbers[i] + '</div>';
    }

    for (var i = 0; i < colsCount; i++) {
        for (var j = 0; j < rowsCount; j++) {
            var fieldGameBoard = [
                [i],
                [j]
            ];
            var id = "field_" + i + "_" + j;
            content = content + '<div id="' + id + '">' + fieldGameBoard + '</div>';
            console.log(fieldGameBoard);
        }
    }


    headerGameBoard.html(writeLetters);
    asideGameBoard.html(writeNumbers);
    gameBoard.html(content);
});