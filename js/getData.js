// https://google,developers.appspot.com/chart/interactive/docs/spreadsheets#gid
google.load('visualization', '1', {
  packages: ['corechart', 'line']
});
google.setOnLoadCallback(drawChart);

function delay(response) {
  setTimeout(function() {
    handleQueryResponse(response);
    // test(response);
}, 0)
}

function drawChart() {
  // Add your sheets url and range below
  var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1pDM_cbLpmfbzNFuOJO3JJTm5IF_8KzeqS8wYIsV9RN0/edit";
  https: //docs.google.com/spreadsheets/d/1pDM_cbLpmfbzNFuOJO3JJTm5IF_8KzeqS8wYIsV9RN0/edit#gid=0
    var query = new google.visualization.Query(spreadsheetUrl);
  query.send(delay);
}



function handleQueryResponse(response) {

  var dataTable = response.getDataTable();
  // var header = '<table>';
  // https://developers.google.com/chart/interactive/docs/reference?hl=en#methods
  // getValue(rowIndex, columnIndex)
  // var row = 0;
  // // var col = 0;
  // var rows = dataTable.getNumberOfRows();
  // // var cols = dataTable.getNumberOfColumns();
  // var cols = new Array(0, 1, 2, 4, 5, 6, 7);
  // while (row < rows) {
  //   if (row == 0) {
  //     header += '<thead>'
  //   } else if (row == 1) {
  //     header += '<tbody>'
  //   }
  //   header += '<tr>'
  //   // col = 0;
  //   // while (col < cols) {
  //   for (c in cols) {
  //     header += '<th>'
  //     if (((cols[c] == 2) | (cols[c] == 5) | (cols[c] == 6) | (cols[c] == 7)) & (row > 0)) {
  //       header += '<a href="' + dataTable.getValue(row, cols[c]) +
  //         '">site</a>';
  //     } else {
  //       // console.log(row, col);
  //       header += dataTable.getValue(row, cols[c])
  //     }
  //     header += '</th>';
  //     // col++;
  //   }
  //   header += '</tr>'
  //   if (row == 0) { // if we are on the first row
  //     header += '</thead>'
  //   } else if (row == rows - 1) { // if we are on the last row
  //     header += '</tbody></table>'
  //
  //   }
  //   // console.log(rows, cols)
  //
  //   row++;
  //
  // }
var arr = []

  var rows = dataTable.getNumberOfRows();
  var cols = dataTable.getNumberOfColumns();
  for (row=0; row < rows; row++){
    var inner = []
    for (col=0; col < cols; col++){
      inner.push(dataTable.getValue(row, col))

    }
    arr.push(inner)
  }
  console.log(arr)
  // document.getElementById("table").innerHTML = header;




  var textnode = document.createTextNode("Water");
  var item = document.getElementById("table");
  var parentDiv = item.parentNode;
  // var arr = [
  //     ['a', 'b', 'c'],
  //     [0,1,2],
  //     [1,2,3],
  //     [2,3,0]
  // ];

  var body, tab, tr, td, tn, row, col;
  body = document.getElementsByTagName('body')[0];
  tab = document.createElement('table');
  // head
  row = 0
      thead = document.createElement('thead');
      tr = document.createElement('tr');

      for (col=0; col < arr[row].length; col++){
          th = document.createElement('th');
          tn = document.createTextNode(arr[row][col]);
          th.appendChild(tn);
          tr.appendChild(th);

      }
  thead.appendChild(tr);

  tab.appendChild(thead);
  // body
  tbody = document.createElement('tbody');

  for (row=1; row < arr.length; row++){
      tr = document.createElement('tr');
      for (col=0; col < arr[row].length; col++){
          td = document.createElement('td');
          tn = document.createTextNode(arr[row][col]);
          td.appendChild(tn);
          tr.appendChild(td);

      }
      tbody.appendChild(tr);
      tab.appendChild(tbody);
  }
  parentDiv.replaceChild(tab, item);
  // console.log(dataTable.getNumberOfColumns(), dataTable.getNumberOfRows())
}
