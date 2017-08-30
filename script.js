var square = 49;

$(document).ready(function () {
    var gameboard = $("#gameboard");
});

var letters = ['', 'A', 'B', 'C', 'D', 'E', 'F'];
var numbers = [0, 1, 2, 3, 4, 5, 6];

var content = ""

for (var i = 0; i < square; i++) {
    var id = i;
    if (i > 0 && i < 7) {
        content = content + '<div class="header-gameboard"  id="' + id + '">' + letters[i] + '</div>';
    } else if (i % 7 === 0 && i > 0) {
        content = content + '<div class="aside-gameboard" id="' + id + '">' + numbers[i / 7] + '</div>';
    } else content = content + '<div id="' + id + '">' + '</div>';
}

gameboard.innerHTML = content;