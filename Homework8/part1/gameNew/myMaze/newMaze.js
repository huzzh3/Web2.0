var lose = false;
var boolGameStart = false;
$("document").ready(function(){
    $("#start").click(gamestart); //设置当start被按下去的时候，游戏开始
    $("#check").mouseenter(cheatcheak); //当鼠标进入作弊检查区域的时候，开始检查作弊
    $(".border").mouseenter(outOfBorders); //当鼠标进入边界的时候，判断游戏是否出界
    $("#end").mouseenter(gameover); //当鼠标进入end的时候游戏结束
});
function cheatcheak() {
    if (boolGameStart == true) {//如果游戏开始了，那么作弊检查就开启
        alert("Don't cheat! you lose the game!");
        lose = true;
        gameover();//直接结束游戏
    }
}
function gamestart() {
    boolGameStart = true;  //开始游戏
    lose = false; //重置为游戏未失败
    $(".border").removeClass("losegame"); //重置边界
    $("#status").text("move you mouse to get the end!"); //更改游戏信息
}
function outOfBorders() {
    if (boolGameStart == true) { //如果游戏开始了就可以出界检查了
        lose = true;
        $(".border").addClass("losegame");//将边界标红
        setTimeout('alert("you lose, please clikc S to start again")', 50); //提示游戏失败
        gameover(); //直接结束游戏
    }
}
function gameover() {
    if (lose == false && boolGameStart == true) alert("you win!");
    $("#status").text("Move your mouse over the \"S\" and click to begin");
    boolGameStart = false;
}