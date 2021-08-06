var maze = [];
var xxx = 31;
var yyy = xxx;
var walk = [];
nowdirect = '';

var yourhero = {
    body: { x: 2, y: 2 }
}

$('body').css('background-color', 'black');
$('body').css('text-align', 'center');
$('.btn btn-outline-primary').css('text-align', 'center');
//  生成迷宮
for (var i = 0; i < xxx; i++) {
    maze[i] = [];
    for (var j = 0; j < yyy; j++) {
        maze[i][j] = 0;
        if (i % 2 == 1 || j % 2 == 1) { maze[i][j] = 1; }
        if (i == 0 || j == 0 || i == 1 || j == 1 || i == xxx - 1 || i == xxx - 2 || j == yyy - 1 || j == yyy - 2) { maze[i][j] = 9; }
    }
}

var myNewArray = [].concat.apply([], maze);
maze[2][2] = 8;

var i = 2;
var j = 2;
while (($.inArray(0, myNewArray)) != -1) {

    var knockTemp1 = 1;
    var knockTemp = Math.floor(Math.random() * 4 + 1);
    switch (knockTemp) {
        case 1: //上
            if (maze[i - 1][j] == 1 && maze[i - 2][j] == 0) { i--; maze[i][j] = 7; i--; maze[i][j] = 8; knockTemp1++; break; }
        case 2: //右
            if (maze[i][j + 1] == 1 && maze[i][j + 2] == 0) { j++; maze[i][j] = 7; j++; maze[i][j] = 8; knockTemp1++; break; }
        case 3: //下
            if (maze[i + 1][j] == 1 && maze[i + 2][j] == 0) { i++; maze[i][j] = 7; i++; maze[i][j] = 8; knockTemp1++; break; }
        case 4: //左
            if (maze[i][j - 1] == 1 && maze[i][j - 2] == 0) { j--; maze[i][j] = 7; j--; maze[i][j] = 8; knockTemp1++; break; }
    }
    while (($.inArray(0, myNewArray))) {
        var temp1 = Math.floor(Math.random() * xxx);
        var temp2 = Math.floor(Math.random() * yyy);
        if (maze[temp1][temp2] == 8) {
            i = temp1; j = temp2;
            break;
        }
    }
    myNewArray = [].concat.apply([], maze);
}

for (i = 0; i < xxx; i++) {
    for (j = 0; j < xxx; j++) {
        if (maze[i][j] == 7) { maze[i][j] = 0; }
        if (maze[i][j] == 8) { maze[i][j] = 0; }
        if (maze[i][j] == 1) { maze[i][j] = 9; }
    }
}

//  畫出迷宮
//console.log(($.inArray(0, myNewArray)));
//console.log(maze);
// for (var i = 0; i < xxx; i++) {
//     for (var j = 0; j < yyy + 1; j++) {

//         if (maze[i][j] == 9 || maze[i][j] == 1) {
//             var temp = $('#hoho').html();
//             $('#hoho').html(temp + 'X');
//         } else {
//             var temp = $('#hoho').html();
//             $('#hoho').html(temp + 'O');
//         }
//     }
//     $('#hoho').html(temp + '<br>');
// }

//  畫出迷宮 ver.2
function canvasnow() {
    
    var cvs = document.getElementById('canvasid');
    var cts = cvs.getContext('2d');

    for (i = 0; i < xxx; i++) {

        for (j = 0; j <= xxx; j++) {

            if (maze[i][j] == 9) {
                cts.fillStyle = 'gray';
                cts.fillRect(i * 20, j * 20, 20, 20);
            }
            if (maze[i][j] == 0) {
                cts.fillStyle = 'orange';
                cts.fillRect(i * 20, j * 20, 20, 20);
            }
            if (maze[i][j] == 5) {
                cts.fillStyle = 'pink';
                cts.fillRect(i * 20, j * 20, 20, 20);
            }
            if (maze[i][j] == 6) {
                cts.fillStyle = 'black';
                cts.fillRect(i * 20, j * 20, 20, 20);
            }
        }
    }
    cts.fillStyle = 'aqua';
    cts.fillRect(yourhero.body.x * 20, yourhero.body.y * 20, 20, 20);
    if (maze[yourhero.body.x][yourhero.body.y] == 2) { clearInterval(gameInterval); return 1;}
    $('#score_id').html(" 鍵盤 : " + nowdirect);
}
//  終點座標
maze[xxx-3][xxx-3] = 2;

//  移動判斷
function move() {
    console.log(maze);
    document.addEventListener("keydown", keyCode)
    function keyCode(e) {
        if (e.keyCode == 37 && ((maze[yourhero.body.x - 1][yourhero.body.y] == 0) || (maze[yourhero.body.x - 1][yourhero.body.y] == 2))) {
            yourhero.body.x--;
        }//左
        if (e.keyCode == 38 && ((maze[yourhero.body.x][yourhero.body.y - 1] == 0) || maze[yourhero.body.x][yourhero.body.y - 1] == 2)) {
            yourhero.body.y--;
        }//上
        if (e.keyCode == 39 && ((maze[yourhero.body.x + 1][yourhero.body.y] == 0) || maze[yourhero.body.x + 1][yourhero.body.y] == 2)) {
            yourhero.body.x++;
        }//右
        if (e.keyCode == 40 && ((maze[yourhero.body.x][yourhero.body.y + 1] == 0) || maze[yourhero.body.x][yourhero.body.y + 1] == 2)) {
            yourhero.body.y++;
        }//下
    }
    //  顯示鍵盤
    document.addEventListener("keydown", key2)
    function key2(e) {
        if (e.keyCode == 37) { nowdirect = '左'; }
        if (e.keyCode == 38) { nowdirect = '上'; }
        if (e.keyCode == 39) { nowdirect = '右'; }
        if (e.keyCode == 40) { nowdirect = '下'; }
    }
}

//  自動走迷宮
var pcgogo = [];
function autogo() {
    
    // 終點判斷
    maze[yourhero.body.x][yourhero.body.y] = 6;
    if (maze[(yourhero.body.x) + 1][yourhero.body.y] == 2) {
        (yourhero.body.x)++; a+a; return 1;
    }
    if (maze[(yourhero.body.x) - 1][yourhero.body.y] == 2) {
        (yourhero.body.x)--; a+a; return 1;
    }
    if (maze[yourhero.body.x][(yourhero.body.y) + 1] == 2) {
        (yourhero.body.y)++; a+a; return 1;
    }
    if (maze[yourhero.body.x][(yourhero.body.y) - 1] == 2) {
        (yourhero.body.y)--; a+a; return 1;
    }
    //  探索路徑
    if (maze[(yourhero.body.x) + 1][yourhero.body.y] == 0) {
        maze[yourhero.body.x][yourhero.body.y] = 6; (yourhero.body.x)++; pcgogo.push([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    if (maze[(yourhero.body.x) - 1][yourhero.body.y] == 0) {
        maze[yourhero.body.x][yourhero.body.y] = 6; (yourhero.body.x)--; pcgogo.push([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    if (maze[yourhero.body.x][(yourhero.body.y) + 1] == 0) {
        maze[yourhero.body.x][yourhero.body.y] = 6; (yourhero.body.y)++; pcgogo.push([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    if (maze[(yourhero.body.x)][(yourhero.body.y) - 1] == 0) {
        maze[yourhero.body.x][yourhero.body.y] = 6; (yourhero.body.y)--; pcgogo.push([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    //  回頭
    if (maze[(yourhero.body.x) + 1][yourhero.body.y] == 6) {
        maze[yourhero.body.x][yourhero.body.y] = 5; (yourhero.body.x)++; pcgogo.pop([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    if (maze[(yourhero.body.x) - 1][yourhero.body.y] == 6) {
        maze[yourhero.body.x][yourhero.body.y] = 5; (yourhero.body.x)--; pcgogo.pop([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    if (maze[yourhero.body.x][(yourhero.body.y) + 1] == 6) {
        maze[yourhero.body.x][yourhero.body.y] = 5; (yourhero.body.y)++; pcgogo.pop([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    if (maze[(yourhero.body.x)][(yourhero.body.y) - 1] == 6) {
        maze[yourhero.body.x][yourhero.body.y] = 5; (yourhero.body.y)--; pcgogo.pop([yourhero.body.x, yourhero.body.y]); a+a; autogo();
    }
    var cvs = document.getElementById('canvasid');
    var cts = cvs.getContext('2d');
    cts.fillStyle = 'black  ';
    cts.fillRect(yourhero.body.x * 20, yourhero.body.y * 20, 20, 20);
}

// 執行自動走
function pcgogoauto() {

    gameInterval = setInterval(autogo, 50);
    
}

move();
gameInterval = setInterval(canvasnow, 1);