var lose = false;  // whether the user has hit a wall
var boolgamestart = false;

/*当网页加载完毕后立刻执行*/
window.onload = function() {
    document.getElementById("maze").onclick = gamestart;
    document.getElementById("end").onmouseover = gameover;
    document.getElementById("check").onmouseover = cheatcheak;

    var borders = document.querySelectorAll("div#maze div.border");
    for (var i = 0; i < borders.length; i++) {
        borders[i].onmouseover = outOfBorders;
    }
};

function cheatcheak() {
    if (boolgamestart == true) {
        alert("Don't cheat! you lose the game!");
        lose = true;
        gameover();
        boolgamestart = false;
    }
}

function gamestart() {
    boolgamestart = true; 
    lose = false;
    var borders = document.querySelectorAll("div#maze div.border");
    for (var i = 0; i < borders.length; i++) {
        borders[i].classList.remove("losegame");
    }
    document.getElementById("status").innerHTML = "move you mouse to get the end!" ;
}

function outOfBorders() {
    if (lose == false && boolgamestart == true){
        lose = true;
        var borders = document.querySelectorAll("div#maze div.border");
        for (var i = 0; i < borders.length; i++) {
            borders[i].classList.add("losegame");
        }
        setTimeout(function(){
            alert("you lose, please click S to start again")
        }, 50);
        document.getElementById("status").innerHTML = "Move your mouse over the \"S\" and click to begin" ;
        gamestart = false;
    }
}

function gameover() {
    if (lose == false && boolgamestart == true) {
        alert("you win!");
    }
    document.getElementById("status").innerHTML = "Move your mouse over the \"S\" and click to begin" ;
    boolgamestart = false;
}