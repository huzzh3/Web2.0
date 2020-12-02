神秘代码:
let preColumnIndex = -1;
let order = -1;
function sortTable() {
    return function () {  
      let $this = $(this);
      let column_index = $this.parent().children().index($this);
      //alert(column_index);
      if (column_index === preColumnIndex) {
        order = -order;
      } 
      else {
        order = -1;
      }
      //alert(order);
      let $table = $this.parents("table");
      //alert($table.text()); 
      let $tableRows = $table.find("tr");
      Array.prototype.shift.call($tableRows);
      //$($tableRows).remove();
      //alert($tableRows.text());
      Array.prototype.sort.call($tableRows, function (first, second) {
        var firstElementText = $(first).children().eq(column_index).text();
        var secondElementText = $(second).children().eq(column_index).text();
        if (firstElementText < secondElementText) {
          return order;
        } else if (firstElementText > secondElementText) {
          return -order;
        } else {
          return 0;
        }
      });
      $($table).append($tableRows);
      preColumnIndex = column_index;
  };
}
$("th").click(sortTable());

适用网站：
https://www.runoob.com/jsref/dom-obj-document.html
https://www.runoob.com/jsref/obj-console.html
https://www.runoob.com/jsref/dom-obj-attributes.html