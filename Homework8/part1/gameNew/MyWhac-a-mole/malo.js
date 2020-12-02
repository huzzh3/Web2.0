var gameStart = false; //用于表示游戏是否已经开始
var score = 0; //计分
var timeId = null; //setInterval()返回值
var interId = null; //setTimeout()返回值
var countDown = 30; //倒计时
var hitCorrect = true; //判断是否敲击正确，默认敲击正确
$("document").ready(function(){
    $("#gameButton").click(gameStatusChange); //为gameButton添加函数更改游戏状态信息
});
function gameStatusChange() {
    if (gameStart == false) gameStartfun();//如果游戏还没开始，按按钮游戏就开始了
    else gameOver();                       //如果游戏开始了，按按钮游戏就结束了
}
function gameStartfun() {
    gameStart = true; //游戏开始
    score = 0; //初始化
    countDown = 30;
    $("#gameStatus").val("Game Start"); //更新游戏状态
    $("#score").val(score);//更新分数
    timeShow(); //显示时间
    interId = setInterval("showMouse()", 10); //显示地鼠，10ms显示一次
    hitCorrect = true; //初始化默认敲击正确
}
function hit(id) {
    if (gameStart == false) return; //防止用户还未开始游戏就开始打地鼠
    else {
        if ($("#hole"+id).hasClass("radioChange")) { //hasClass("radioChange")表明这个洞是系统随机选择到的那一个
            $("#hole"+id).removeClass("radioChange");
            score += 1;
            $("#score").val(score);//更新分数
            hitCorrect = true; //表面敲击正确
        }
        else { //否则说明敲错了洞
            score -= 1;
            $("#score").val(score);//更新分数
            hitCorrect = false;
        }
    }
}
function showMouse() {
    if (gameStart == true && hitCorrect == true) { //只有在敲击正确且游戏开始的情况下才会显示地鼠
        hitCorrect = false; //先设置敲击错误，方式过了10ms又生成地鼠
        var index = Math.floor(Math.random() * 60) //生成随机数
        $("#hole"+index).addClass("radioChange");//当选中这个洞的时候，让它变蓝
    }
}
function timeShow() {
    $("#time").val(countDown); //显示时间
    if(countDown == 0) gameOver(); //时间到了游戏结束
    else {
        countDown = countDown - 1;
        timeId = setTimeout("timeShow()", 1000); //每隔一秒刷新一次时间，且用timeId来接受返回值，用于停止游戏
    }
}
function gameOver() {
    gameStart = false; //停止游戏
    $("#gameStatus").val("Game Over"); //更新游戏状态
    clearInterval(interId);//清除时间函数
    clearTimeout(timeId);
    $(".radio_type").removeClass("radioChange");//清除地鼠
    setTimeout("alert('you get ' + score + ' score, good job!')", 50); 
}