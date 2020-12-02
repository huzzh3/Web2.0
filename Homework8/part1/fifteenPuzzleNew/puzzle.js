let game = $(".game")[0];
let shuffleButton = $(".shuffle")[0];
let changeDifficultyButton = $(".changeDifficulty")[0];
let level = 4;
let start = false;
let emptyPositionIndex = 0;
let picturePosition = [];
let cutPictureLength = 125;
function initial() {
    picturePosition.length = 0; //初始化记录每一块图片位置的数组
    for (let index = 0; index < level*level; index++) {
        picturePosition.push(index);
    }
    for (let row = 0; row < level; row++) {
        for (let column = 0; column < level; column++) {
            if(row == level-1 && column == level-1) //不绘制最后一块拼图，并且记录下空拼图的位置
            {
                emptyPositionIndex = level*level-1;
                break;
            }
            createPuzzle(level, row, column); //创建拼图
        }
    }
}
function getLeft(position) { //获得左边拼图的位置，如果没有则返回-1，难度level实际上和每一层有多少块的拼图数目相同
    if(position % level == 0) {
        return -1;
    }
    return position-1;
}
function getRight(position) {
    if(position % level == level - 1) { //获得右边拼图的位置，如果没有则返回-1
        return -1;
    }
    return position+1;
}
function getTop(position) {
    if(position <= level - 1) { //获得上边拼图的位置，如果没有则返回-1
        return -1;
    }
    return position-level;
}
function getDown(position) {
    if (position >= level*level-level) { //获得下边拼图的位置，如果没有则返回-1
        return -1;
    }
    return position+level;
}
function getLength() {
    if(level == 4) return 121;
    if(level == 3) return 162;
    if(level == 2) return 242.5;
}
function createPuzzle(level, row, column) {
    let width = getLength(); //因为每块拼图宽高相同，故返回同一值即可
    let height = getLength();

    var picturePiece = $('<div></div>'); 
    picturePiece.addClass('picturePiece');
    picturePiece.css(
        {
            "left": -column*cutPictureLength + "px", //切割背景图片，动态更改切割下来的部分的大小
            "top" : -row*cutPictureLength + "px"
        }
    );

    var puzzlePiece = $('<div></div>');
    puzzlePiece.addClass("puzzlePiece");
    puzzlePiece.css(
        {
            "width": width + "px",                  //动态更改每一块拼图的大小，以及动态更改每块拼图的位置
            "height": height + "px",
            "left": column*cutPictureLength + "px",
            "top": row*cutPictureLength + "px"
        }
    );
    puzzlePiece.attr("position", row*level + column);//给每一块拼图增加position属性
    picturePiece.appendTo(puzzlePiece);              //将切割下来的图片加到拼图里面
    puzzlePiece.appendTo(game);                      //再将拼图加到游戏模块中
    
    puzzlePiece.click(bindPuzzleFunction);
}
function bindPuzzleFunction() { //为每一块拼图添加属性
    if(start == true) {
        let position = parseInt($(this).attr("position"));

        if(getLeft(position) == picturePosition[emptyPositionIndex] || 
           getRight(position) == picturePosition[emptyPositionIndex] || 
           getTop(position) == picturePosition[emptyPositionIndex] || 
           getDown(position) == picturePosition[emptyPositionIndex]) { //如果拼图可以移动
            let order;//order代表这一块拼图在picturePosition中的下标，主要用于更改picturePosition用的
            for(let i = 0; i < game.children.length; i++) {
                if(parseInt(game.children[i].getAttribute("position")) === position)
                    order = i;
            }

            picturePosition[order] = picturePosition[emptyPositionIndex]; //更新这块拼图在picturePosition里的位置，更新为原来空白拼图的位置
            $(this).attr("position", picturePosition[emptyPositionIndex]); //同时这块拼图的position属性也要更改

            let emptyRow = Math.floor(picturePosition[emptyPositionIndex] / level); //找到空白拼图所在的行
            let emptyColumn = picturePosition[emptyPositionIndex] % level;          //找到空白拼图所在的列
            $(this).css( //点击后，如果拼图可以移动，则改变拼图位置到空白拼图的位置
                {
                    "left": emptyColumn*cutPictureLength + "px",   
                    "top": emptyRow*cutPictureLength + "px"
                }
            );
            picturePosition[emptyPositionIndex] = position; //改变空白拼图的位置
        }
        let flag = true;//用于判断游戏是否胜利
        for(let i = 0; i < game.children.length; i++) {
            if(picturePosition[i] != i) { //如果在过程中发现有拼图的位置不正确，那么游戏就肯定不是胜利的
                flag = false;
                break;
            }
        }
        if(flag == true) { //游戏胜利则弹出提示
            setTimeout(function(){alert("Congratulation! You Win!")}, 200);
            start = false;
        }
    }
}
$(".shuffle").click(function() { //洗牌，让电脑自己移动方块来模拟洗牌
    start = true;
    let randomMove = 1000; //移动1000次
    for(let i = 0; i < randomMove; i++) {
        let randomDirection = Math.floor(Math.random()*4);
        let emptyPosition = picturePosition[emptyPositionIndex];

        if (randomDirection == 0 && getLeft(emptyPosition) != -1) { //0表示随机到了往右边移动的指令，如果空白拼图左边同时有位置可以进入那么就进入语句，即让空白拼图左边的拼图往右移动
            moveRight(emptyPosition);
        }
        else if (randomDirection == 1 && getRight(emptyPosition) != -1) { //1表示随机到了往左边移动的指令，将空白拼图右边的拼图往左移动
            moveLeft(emptyPosition);
        }
        else if (randomDirection == 2 && getTop(emptyPosition) != -1) {
            moveDown(emptyPosition);
        }
        else if (randomDirection == 3 && getDown(emptyPosition) != -1) {
            moveUp(emptyPosition);
        }
    }
});
function moveRight(emptyPosition) {
    for (let j = 0; j < game.children.length; j++) { //去找到空白拼图的左边的拼图
        let childrenPosition = parseInt(game.children[j].getAttribute("position"));
        if(getRight(childrenPosition) == emptyPosition) { //如果某块拼图的右边是空白拼图，那么久找到这块拼图了
            $this = $(game).children().eq(j);
            changePosition($this, emptyPosition, childrenPosition, j); //电脑移动拼图
        }
    }
}
function moveLeft(emptyPosition) {
    for (let j = 0; j < game.children.length; j++) { //去找到空白拼图的右边的拼图
        let childrenPosition = parseInt(game.children[j].getAttribute("position"));
        if(getLeft(childrenPosition) == emptyPosition) { //如果某块拼图的左边是空白拼图，那么久找到这块拼图了
            $this = $(game).children().eq(j);
            changePosition($this, emptyPosition, childrenPosition, j);//电脑移动拼图
        }
    }
}
function moveDown(emptyPosition) {
    for (let j = 0; j < game.children.length; j++) { //去找到空白拼图的上边的拼图
        let childrenPosition = parseInt(game.children[j].getAttribute("position"));
        if(getDown(childrenPosition) == emptyPosition) { //如果某块拼图的下边是空白拼图，那么久找到这块拼图了
            $this = $(game).children().eq(j);
            changePosition($this, emptyPosition, childrenPosition, j);//电脑移动拼图
        }
    }
}
function moveUp(emptyPosition) {
    for (let j = 0; j < game.children.length; j++) { //去找到空白拼图的下边的拼图
        let childrenPosition = parseInt(game.children[j].getAttribute("position"));
        if(getTop(childrenPosition) == emptyPosition) { //如果某块拼图的上边是空白拼图，那么久找到这块拼图了
            $this = $(game).children().eq(j);
            changePosition($this, emptyPosition, childrenPosition, j);//电脑移动拼图
        }
    }
}
function changePosition($this, emptyPosition, childrenPosition, j) { //电脑移动拼图
    $this.attr("position", emptyPosition);
    picturePosition[j] = emptyPosition;
    let emptyRow = Math.floor(picturePosition[emptyPositionIndex] / level);
    let emptyColumn = picturePosition[emptyPositionIndex] % level;
    $this.css(
        {
            "left": emptyColumn*cutPictureLength + "px",
            "top": emptyRow*cutPictureLength + "px"
        }
    );
    picturePosition[emptyPositionIndex] = childrenPosition;
}
$(".changeDifficulty").click(function(){
    //先删除掉原来的拼图，之后重新画即可
    for(i = game.children.length - 1; i >= 0; i--){
        node = game.children[i];
        game.removeChild(node);
    }
    picturePosition.length = 0;
    if(level == 4) {
        level = 3;
        cutPictureLength = 500/3; //修改切割图片的每一块大小
    }
    else if(level == 3) {
        level = 2;
        cutPictureLength = 250;
    }
    else if(level == 2) {
        level = 4;
        cutPictureLength = 125;
    }
    start = false;
    initial();//重新画拼图
});
window.onload=function(){
    initial(); //画拼图
}