//variable columns and rows

var colsCount = 7;
var rowsCount = 7;

$(document).ready(function () {
    //access to html
    var gameBoard = $("#game-board");
    var headerGameBoard = $("#header-game-board");
    var asideGameBoard = $("#aside-game-board");

    //variable with letters and numbers
    var letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];
    var numbers = [1, 2, 3, 4, 5, 6, 7];

    //empty variable to assigment new html
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

    //create gameboard
    for (var i = 0; i < colsCount; i++) {
        for (var j = 0; j < rowsCount; j++) {
            var fieldGameBoard = [
                [i],
                [j]
            ];
            var id = "field_" + i + "_" + j;
            content = content + '<div id="' + id + '">' + '</div>';
            console.log(fieldGameBoard);
        }
    }

    //create ships
    var hitCount = 0;

    var gameBoardWithShips = [
        [0,0,0,1,0,0,0],
        [0,0,1,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0],
        [1,0,0,0,0,0,0]
    ]

    gameBoard.click(function(e){

        var coOrdinates = event.target.id.split('_');
        // console.log(coOrdinates[1], coOrdinates[2]);
        var shootResult = gameBoardWithShips[coOrdinates[1]][coOrdinates[2]];
        if(shootResult === 1){
            shootResult = 2;
            hitCount++;  
            e.target.style.background = "red";   
            if(hitCount === 5){
                setTimeout(function(){alert("WIN"); }, 10);
            }
        }
        // console.log(gameBoardWithShips[coOrdinates[1]][coOrdinates[2]]);
   
    });

        
    //display html
    headerGameBoard.html(writeLetters);
    asideGameBoard.html(writeNumbers);
    gameBoard.html(content);
});