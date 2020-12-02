var gameStart = false; //用于表示游戏是否已经开始
var score = 0; //计分
var timeId = null; //setInterval()返回值
var interId = null; //setTimeout()返回值
var countDown = 30; //倒计时

window.onload = function() {
    document.getElementById("gameButton").onclick = gameStatusChange;
}

function gameStatusChange() {
    if (gameStart == false) {
        gameStart = true;
        gameStartfun();
    }
    else {
        gameStart = false;
        gameOver();
    }
}

function hit(id) {
    if (gameStart == false) { //防止用户还未开始游戏就开始打地鼠
        alert("please start the game!");
        document.getElementById("hole["+id+"]").checked = false;
        return;
    }
    else {
        if (document.getElementById("hole["+id+"]").className == "radioChange") {
            document.getElementById("hole["+id+"]").checked = false;
            document.getElementById("hole["+id+"]").className = "radio_type";
            score += 1;
            document.data.score.value = score;//更新分数
        }
        else {
            document.getElementById("hole["+id+"]").checked = false;
            document.getElementById("hole["+id+"]").className = "radio_type";
            score -= 1;
            document.data.score.value = score;//更新分数
        }
    }
}

function gameStartfun() {
    document.data.gameStatus.value = "Game Start"
    gamestart = true;
    score = 0;
    countDown = 30;
    interId = setInterval("showMouse()", 1000);//每隔一秒显示一次地鼠
    document.data.score.value = score; //更新分数
    timeShow();
    showMouse();
}

function showMouse() {
    if (gamestart == true) {
        var index = Math.floor(Math.random() * 60) //生成随机数
        //document.getElementById("hole["+index+"]").checked = true;
        document.getElementById("hole["+index+"]").className = "radioChange"//当选中这个洞的时候，增加target class
        setTimeout("document.getElementById('hole["+index+"]').className = 'radio_type'", 2000) //两秒后结束
    }
}

function timeShow() {
    document.data.time.value = countDown;
    if(countDown == 0) {
        gameOver();
        return;
    }
    else {
        countDown = countDown - 1;
        timeId = setTimeout("timeShow()", 1000); //每隔一秒刷新一次时间，且用timeId来接受返回值，用于停止游戏
    }
}

function gameOver() {
    document.data.gameStatus.value = "Game Over"
    
    //清除时间函数
    clearInterval(interId);
    clearTimeout(timeId);

    gamestart = false;
    for (var i = 0; i < 60; i++) {
        document.getElementById("hole["+i+"]").className = "radio_type"
    }
    //清除地鼠

    alert("you get " + score + " score, good job!");
}