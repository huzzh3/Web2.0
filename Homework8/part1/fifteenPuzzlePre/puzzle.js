let game = document.getElementsByClassName("game")[0];
let shuffleButton = document.getElementsByClassName("shuffle")[0];
let changeDifficultyButton = document.getElementsByClassName("changeDifficulty")[0];
let level = 4;
let start = false;
let emptyPositionIndex = 0;
let picturePosition = [];
let cutPictureLength = 125;

function initial() {
    picturePosition.length = 0;
    for (let index = 0; index < level*level; index++) {
        picturePosition.push(index);
    }
    for (let row = 0; row < level; row++) {
        for (let column = 0; column < level; column++) {
            if(row == level-1 && column == level-1)
            {
                emptyPositionIndex = level*level-1;
                break;
            }
            createPuzzle(level, row, column);
        }
    }
}
function getLeft(position) {
    if(position % level == 0) {
        return -1;
    }
    return position-1;
}
function getRight(position) {
    if(position % level == level - 1) {
        return -1;
    }
    return position+1;
}
function getTop(position) {
    if(position <= level - 1) {
        return -1;
    }
    return position-level;
}
function getDown(position) {
    if (position >= level*level-level) {
        return -1;
    }
    return position+level;
}
function createPuzzle(level, row, column) {
    //TODO you need to cut the picture in parts and print it
    let width = 121; //width for every piece of puzzle
    let height = 121; //length for every piece of puzzle

    if(level == 3) {
        width = 162;
        height = 162;
    }

    if(level == 2) {
        width = 242.5;
        height = 242.5;
    }
    

    //use picturePiece to store every picturePiece
    let picturePiece = document.createElement("div");
    picturePiece.classList.add("picturePiece");
    picturePiece.style.backgroundImage = "url(assets/panda.jpg)";
    picturePiece.style.left = -column*cutPictureLength + "px";
    picturePiece.style.top = -row*cutPictureLength + "px";
    //now finished cutting picture
    //TODO add it into puzzle
    
    let puzzlePiece = document.createElement("div");
    puzzlePiece.classList.add("puzzlePiece");
    puzzlePiece.style.width = width + "px";
    puzzlePiece.style.height = height + "px";
    puzzlePiece.style.left = column*cutPictureLength + "px";
    puzzlePiece.style.top = row*cutPictureLength + "px";
    puzzlePiece.setAttribute("position", row*level + column);

    puzzlePiece.appendChild(picturePiece);
    game.appendChild(puzzlePiece);

    //TODO you need to add click event for every puzzlePiece
    puzzlePiece.addEventListener("click", ()=> {
        if(start == true) {
            let position = parseInt(puzzlePiece.getAttribute("position"));
            if(getLeft(position) == picturePosition[emptyPositionIndex] || 
               getRight(position) == picturePosition[emptyPositionIndex] || 
               getTop(position) == picturePosition[emptyPositionIndex] || 
               getDown(position) == picturePosition[emptyPositionIndex]) {

                let order;
                for(let i = 0; i < game.children.length; i++) {
                    if(parseInt(game.children[i].getAttribute("position")) === position)
                        order = i;
                }
                picturePosition[order] = picturePosition[emptyPositionIndex];
                puzzlePiece.setAttribute("position", picturePosition[emptyPositionIndex]);
                
                //move the puzzle piece
                let emptyRow = Math.floor(picturePosition[emptyPositionIndex] / level);
                let emptyColumn = picturePosition[emptyPositionIndex] % level;
                puzzlePiece.style.left = emptyColumn*cutPictureLength + "px"
                puzzlePiece.style.top = emptyRow*cutPictureLength + "px";
                picturePosition[emptyPositionIndex] = position;
            }
            
            let flag = true;
            for(let i = 0; i < game.children.length; i++) {
                if(picturePosition[i] != i) {
                    flag = false;
                    break;
                }
            }
            

            if(flag == true) {
                setTimeout(function(){alert("Congratulation! You Win!")}, 200);
                start = false;
            }
        }
    });
}
shuffleButton.addEventListener("click", ()=>{
    //let the computer move the blank puzzle itself to insure the puzzle can finish when the user is playing
    start = true;
    let randomMove = 1000;
    for(let i = 0; i < randomMove; i++) {
        let randomDirection = Math.floor(Math.random()*4);
        let emptyPosition = picturePosition[emptyPositionIndex];
        if (randomDirection == 0 && getLeft(emptyPosition) != -1) {
            for (let j = 0; j < game.children.length; j++) {
                let childrenPosition = parseInt(game.children[j].getAttribute("position"));
                if(getRight(childrenPosition) == emptyPosition) {
                    picturePosition[j] = emptyPosition;
                    game.children[j].setAttribute("position", emptyPosition);

                    let emptyRow = Math.floor(picturePosition[emptyPositionIndex] / level);
                    let emptyColumn = picturePosition[emptyPositionIndex] % level;
                    game.children[j].style.left = emptyColumn*cutPictureLength + "px"
                    game.children[j].style.top = emptyRow*cutPictureLength + "px";

                    picturePosition[emptyPositionIndex] = childrenPosition;
                }
            }
        }
        else if (randomDirection == 1 && getRight(emptyPosition) != -1) {
            for (let j = 0; j < game.children.length; j++) {
                let childrenPosition = parseInt(game.children[j].getAttribute("position"));
                if(getLeft(childrenPosition) == emptyPosition) {
                    picturePosition[j] = emptyPosition;
                    game.children[j].setAttribute("position", emptyPosition);

                    let emptyRow = Math.floor(picturePosition[emptyPositionIndex] / level);
                    let emptyColumn = picturePosition[emptyPositionIndex] % level;
                    game.children[j].style.left = emptyColumn*cutPictureLength + "px"
                    game.children[j].style.top = emptyRow*cutPictureLength + "px";

                    picturePosition[emptyPositionIndex] = childrenPosition;
                }
            }
        }
        else if (randomDirection == 2 && getTop(emptyPosition) != -1) {
            for (let j = 0; j < game.children.length; j++) {
                let childrenPosition = parseInt(game.children[j].getAttribute("position"));
                if(getDown(childrenPosition) == emptyPosition) {
                    picturePosition[j] = emptyPosition;
                    game.children[j].setAttribute("position", emptyPosition);

                    let emptyRow = Math.floor(picturePosition[emptyPositionIndex] / level);
                    let emptyColumn = picturePosition[emptyPositionIndex] % level;
                    game.children[j].style.left = emptyColumn*cutPictureLength + "px"
                    game.children[j].style.top = emptyRow*cutPictureLength + "px";

                    picturePosition[emptyPositionIndex] = childrenPosition;
                }
            }
        }
        else if (randomDirection == 3 && getDown(emptyPosition) != -1) {
            for (let j = 0; j < game.children.length; j++) {
                let childrenPosition = parseInt(game.children[j].getAttribute("position"));
                if(getTop(childrenPosition) == emptyPosition) {
                    picturePosition[j] = emptyPosition;
                    game.children[j].setAttribute("position", emptyPosition);

                    let emptyRow = Math.floor(picturePosition[emptyPositionIndex] / level);
                    let emptyColumn = picturePosition[emptyPositionIndex] % level;
                    game.children[j].style.left = emptyColumn*cutPictureLength + "px"
                    game.children[j].style.top = emptyRow*cutPictureLength + "px";

                    picturePosition[emptyPositionIndex] = childrenPosition;
                }
            }
        }
    }
});
changeDifficultyButton.addEventListener("click", ()=>{
    /*for(i = 0; i < game.children.length; i++){
        let deservedRow = Math.floor(i / level);
        let deservedColumn = (i % level);

        game.children[i].style.left = deservedColumn*cutPictureLength + "px"
        game.children[i].style.top = deservedRow*cutPictureLength + "px";
    }*/
    for(i = game.children.length - 1; i >= 0; i--){
        node = game.children[i];
        game.removeChild(node);
    }
    picturePosition.length = 0;
    
    if(level == 4) {
        level = 3;
        cutPictureLength = 500/3;
        start = false;
    }
    else if(level == 3) {
        level = 2;
        cutPictureLength = 250;
        start = false;
    }
    else if(level == 2) {
        level = 4;
        cutPictureLength = 125;
        start = false;
    }
    initial();
});
window.onload=function(){
    initial();
}