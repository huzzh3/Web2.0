//之前尝试写英文注释，发现自己英语语法不太好，故修改之后添加的注释为中文
let preColumnIndex = -1;//初始化该变量为-1，不能初始化为0，因为第一列的编号就是0
let order = -1; //初始化排序顺序为降序
function sortTable() {
    let $this = $(this);
    let column_index = $this.parent().children().index($this);
    if (column_index === preColumnIndex) { //如果现在选的列编号和上次选的是同一列，也就是同一列按了第二次，那么就改变排序方式
        order = -order;
    }
    else {
        order = -1; //如果选了另外一列，则初始化为降序
    }
    let $table = $this.parents("table");
    let $tableRows = $table.find("tbody").find("tr");
    sortFunction($tableRows, column_index); //进行排序
    updateTable($this, $tableRows, $table, column_index); //进行更新
}
function sortFunction($tableRows, column_index) {
    $tableRows = $tableRows.sort(function(first, second){
        let firstElementText = $(first).children().eq(column_index).text();
        let secondElementText = $(second).children().eq(column_index).text();
        if (order == -1) { //如果是降序
            if (firstElementText.localeCompare(secondElementText) < 0) return 1; //如果前一个小于后一个，由于是降序，故要将后一个调到前面去，返回1
            else return -1;
        }
        else if (order == 1) { //如果是升序
            if (firstElementText.localeCompare(secondElementText) < 0) return -1;//如果前一个小于后一个，由于是升序，故不需要改变，返回-1
            else return 1;
        }
    });
}
function updateTable($this, $tableRows, $table, column_index) {
    $tableRows.appendTo($table); //先将排序好的tablerow插入table
    $tableRows.filter(":even").removeClass("alternate"); //去除掉偶数行的灰色背景
    $tableRows.filter(":odd").addClass("alternate"); //给奇数行增加灰色背景
    $table.find(".seleted").removeClass("seleted"); //去掉之前被选中的背景
    $table.find(".icon").removeClass("iconAsc iconDec"); //同时也去掉原有的的图标
    $this.addClass("seleted"); //在被选中的标头增加背景
    if (order === 1){ //增加图标
        $this.find(".icon").addClass("iconAsc");
    }
    else {
        $this.find(".icon").addClass("iconDec")
    }
    preColumnIndex = column_index; //更新preColumnIndex
}
$(document).ready(function(){
    let $tableHeadings = $("th");
    $tableHeadings.append('<div class="icon"></div>');//创建一个icon的div用于修改icon
    $tableHeadings.click(sortTable);
});