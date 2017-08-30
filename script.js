var colsCount = 7;
var rowsCount = 7;

$(document).ready(function () {
    var gameBoard = $("#game-board");
    var headerGameBoard = $("#header-game-board");
    var asideGameBoard = $("#aside-game-board");

    var letters = ['A', 'B', 'C', 'D', 'E', 'F','G'];
    var numbers = [0, 1, 2, 3, 4, 5, 6];

    var content = [];
    var writeLetters = "";

    for (var i = 0; i < rowsCount; i++){
        writeLetters = writeLetters +  '<div class="header-game-board ">' + letters[i] + '</div>';
    }


    for (var i = 0; i < colsCount; i++) {
        for (var j = 0; j < rowsCount; j++) {

            var id = i + "" + j;
            content = content + '<div id="' + id + '">' + '</div>';
        }
    }
    headerGameBoard.html(writeLetters);
    gameBoard.html(content);
});