var blocksize = 20; //px值

var snake;      //蛇ob
var body;       //蛇身

var score;  //分數計算
var eat;        //score
var speedch = 1;

var isRun = false;      //判斷重複開始
var nowdirect = "右";      //顯示鍵盤方位

var players = [
    {
        name: "Korone",
        score: 20
    },
    {
        name: "Okayu",
        score: 4
    },
    {
        name: "Mio",
        score: 3
    },
    {
        name: "Miko",
        score: 2
    },
    {
        name: "Watame",
        score: 1
    }]

// 開始按鈕
function gamestart() {

    if (isRun) {
        return
    }
    isRun = true;
    snake = {
        body: [{ x: 20, y: 12 }],
        size: 10,
        direct: { x: 1, y: 0 }
    }
    score = 0;
    speedch = 1;

    putscore();
    gameInterval = setInterval(game, 100);
}

// 重複事件
function game() {

    $('#score_id').html(" 分數 : " + score + " 鍵盤 : " + nowdirect + " 速度 : " + speedch);
    snakemove();
    canvasnow();
}

//畫面生成
$('body').css('background-color', 'black');
$('body').css('text-align', 'center');
function canvasnow() {
    var cvs = document.getElementById('canvasid');
    ///////////(jQuery物件需要用canvas[0]呼叫，如果是用js的document.getElementById就不需要[0])
    var cts = cvs.getContext('2d');

    // 畫出場地 ver.2
    cts.fillStyle = "#7028e4";
    cts.shadowBlur = 20;
    cts.shadowColor = "black";
    cts.globalCompositeOperation = "xor";
    cts.fillRect(0, 0, canvasid.width, canvasid.height);

    for (var i = 0; i < 60; i++) {
        for (var j = 0; j < 60; j++) {
            if ((i + j) % 2 == 0) {
                cts.fillStyle = "#0250c5";
                cts.fillRect(j * 20, i * 20, 20, 20);
            }
        }
    }

    // 畫出蛇
    cts.fillStyle = 'orange';
    for (var i = 0; i < snake.body.length; i++) {

        // 畫出蛇ver.1
        // cts.fillStyle = "black";
        // cts.beginPath();
        // cts.arc(snake.body[i].x * blocksize + 10,
        //         snake.body[i].y * blocksize + 10 ,
        //         10,0,2*Math.PI
        //         )
        // cts.stroke();

        cts.fillStyle = "white";
        cts.fillRect(
            snake.body[i].x * blocksize + 1,
            snake.body[i].y * blocksize + 1,
            blocksize - 1,
            blocksize - 1
        )
        cts.beginPath();
        cts.arc(snake.body[0].x * blocksize + 10,
            snake.body[0].y * blocksize + 10,
            10, 0, 2 * Math.PI
        )
        cts.stroke();
    }

    // 畫出 score
    cts.fillStyle = 'yellow'
    cts.fillRect(
        eat.x * blocksize + 1,
        eat.y * blocksize + 1,
        blocksize - 1,
        blocksize - 1
    )
}

function snakemove() {

    // 蛇移動
    snakechange();
    var newbody = {
        x: snake.body[0].x + snake.direct.x,
        y: snake.body[0].y + snake.direct.y
    }
    snake.body.unshift(newbody);
    while (snake.body.length > snake.size) { snake.body.pop(); }

    // 蛇死亡 - 牆
    if (snake.body[0].y < 0 || snake.body[0].x < 0 || snake.body[0].y > 24 || snake.body[0].x > 59) {

        clearInterval(gameInterval); alert('落命');
        isRun = false;
        if (players[4].score < score) { rankchange(); }
    }
    // 蛇死亡 - 自殺
    for (i = 1; i < snake.body.length - 1; i++) {
        if (snake.body[i].x == snake.body[0].x && snake.body[i].y == snake.body[0].y) {
            clearInterval(gameInterval); alert('落命');
            isRun = false;
            if (players[4].score < score) { rankchange(); }
        }
    }
    // 蛇碰到score
    if (snake.body[0].x == eat.x && snake.body[0].y == eat.y) {
        scoreup();
    }
}

//蛇轉向
function snakechange() {

    // html可以 js淘汰???
    // document.addEventListener("keydown", function(e){
    //     if(e.keyCode == 13) {alert(`HI`)}
    // })
    // document.addEventListener("keydown",
    //     function keyCode(e) {
    //         if (e.key == 37 && snake.direct.x != -1 && snake.direct.y != 0) {
    //             snake.direct.x = -1; snake.direct.y = 0; nowdirect = '左';
    //         }
    //         if (e.key == 38 && snake.direct.x != 0 && snake.direct.y != -1) {
    //             snake.direct.x = 0; snake.direct.y = -1; nowdirect = '上';
    //         }
    //         if (e.key == 39 && sn    ake.direct.x != 1 && snake.direct.y != 0) {
    //             snake.direct.x = 1; snake.direct.y = 0; nowdirect = '右';
    //         }
    //         if (e.key == 40 && snake.direct.x != 0 && snake.direct.y != 1) {
    //             snake.direct.x = 0; snake.direct.y = 1; nowdirect = '下';
    //         }
    //     })

    document.addEventListener("keydown", keyCode)
    function keyCode(e) {
        if (e.keyCode == 37 && snake.direct.x != -1 && snake.direct.y != 0) {
            snake.direct.x = -1; snake.direct.y = 0; nowdirect = '左';
        }
        if (e.keyCode == 38 && snake.direct.x != 0 && snake.direct.y != -1) {
            snake.direct.x = 0; snake.direct.y = -1; nowdirect = '上';
        }
        if (e.keyCode == 39 && snake.direct.x != 1 && snake.direct.y != 0) {
            snake.direct.x = 1; snake.direct.y = 0; nowdirect = '右';
        }
        if (e.keyCode == 40 && snake.direct.x != 0 && snake.direct.y != 1) {
            snake.direct.x = 0; snake.direct.y = 1; nowdirect = '下';
        }
    }

    // 顯示鍵盤用
    document.addEventListener("keydown", key2)
    function key2(e) {
        if (e.keyCode == 37) { nowdirect = '左'; }
        if (e.keyCode == 38) { nowdirect = '上'; }
        if (e.keyCode == 39) { nowdirect = '右'; }
        if (e.keyCode == 40) { nowdirect = '下'; }
    }
}

//放置 score
function putscore() {
    eat = {
        x: Math.floor(Math.random() * 60),
        y: Math.floor(Math.random() * 25)
    }
    for (i = 0; i < snake.body.length; i++) {
        if (snake.body[i].x == eat.x && snake.body[i].y == eat.y) { putscore(); }
    }
}

//得分事件
function scoreup() {
    snake.size++;
    score ++;
    speedch = 1 * score;
    clearInterval(gameInterval);
    gameInterval = setInterval(game, 100 / speedch);
    putscore();
}

//排行榜
function scorerank() {
    if (isRun) {
        return
    }
    var temp = '';
    for (i = 0; i < 5; i++) {
        temp += (` No ${i + 1} : ${players[i].name} 分數 :  ${players[i].score} <br>`);
        $('#score_id').html(temp);
    }
}
//排行榜變動
function rankchange() {
    
    var rkname = prompt("請輸入名稱 : ");
    for (i = 0; i < 5; i++) {
        if (players[i].score < score) {
            for (j = 4; j > i; j--) {
                players[j].score = players[j - 1].score;
                players[j].name = players[j - 1].name;
            }
            players[i].score = score;
            players[i].name = rkname;
            break;
        }
    }
}
// 講解用
function time() {
    clearInterval(gameInterval);
    isRun = false;
}