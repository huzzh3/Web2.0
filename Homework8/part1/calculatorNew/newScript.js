var operator = $(".operator");
var number = $(".number");
function getHistory() {
  return $("#history-value").text();
}
function printHistory(num) {
  $("#history-value").text(num);
}
function getOutput() {
  return $("#output-value").text();
}
function printOutput(num) {
  if (num == "") {
    $("#output-value").text("");
  } else {
    $("#output-value").text(normalize(num));
  }
}
function normalize(num) {
  var n = Number(num);
  var value = n.toLocaleString();
  return value;
}
function getNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}
function bindFunction() { //为运算符增加事件
  $("#clear").click(clearFunction);
  $("#backspace").click(backFunction);
  $("#equal").click(equalFunction);
  $(".ALUoperator").click(ALUfunction); //为+-*/%=运算符绑定函数
  $(".number").click(numberFunction); //为数字绑定函数
}
function clearFunction() {
  printOutput("0"); //清零输出
}
function backFunction() {
  let output = getOutput();
  if (output.length >= 2) {
    //如果output是两位以上的数，那么就直接删除一位即可
    output = output.substr(0, output.length - 1);
    printOutput(output);
  } else if (output.length == 1) {
    //如果output只有一位数，那么就初始化为0
    printOutput("0");
  }
}
function equalFunction() {
  let output = getOutput();
  let history = getHistory();
  if (output != "") { //如果output非空，也就是用户输入了数据
    output = getNumberFormat(output); //将output转换为正常的数字形式，也就是把output中的逗号去掉
    history = history + output; //将output加到histroy中，方便后面的运算操作
    let result = eval(history);
    if (result == "Infinity" && output == "0") { //说明这个时候用户除0了，应该抛出除0异常
      $("#output-value").text("DBZ error!");
    } else if (result == "") {
      printOutput("0");
    } else {
      printOutput(result);
    }
    printHistory("");
  }
}
function ALUfunction() {
  let output = getOutput();
  let history = getHistory();
  let $this = $(this);
  if (output != "") {
    //用户输入了数据
    output = getNumberFormat(output); //将output转换为正常的数字形式，也就是把output中的逗号去掉
    history = history + output; //将output加到histroy中，方便后面的运算操作
    history = history + $this.attr("id"); //在history加上该运算符
    printHistory(history);
    printOutput("");
  }
}
function numberFunction() {
    let output = getNumberFormat(getOutput());
    output = output + $(this).attr("id");
    if (output.length >= 14) {
        alert("overflow! Please don't input more bit");
    }
    else {
        printOutput(output);
    }
}
$("document").ready(function () {
  printOutput("0"); //输出结果初始化为0
  bindFunction(); //为运算符绑定函数
});
