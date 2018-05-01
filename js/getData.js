// https://google,developers.appspot.com/chart/interactive/docs/spreadsheets#gid
google.load('visualization', '1', {
  packages: ['corechart', 'line']
});
google.setOnLoadCallback(drawChart);



function drawChart() {
  // Add your sheets url and range below
  var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1pDM_cbLpmfbzNFuOJO3JJTm5IF_8KzeqS8wYIsV9RN0/edit";
  https://docs.google.com/spreadsheets/d/1pDM_cbLpmfbzNFuOJO3JJTm5IF_8KzeqS8wYIsV9RN0/edit#gid=0
  var query = new google.visualization.Query(spreadsheetUrl);
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  var dataTable = response.getDataTable();
  var header = '<div class="siimple-table siimple-table--striped siimple-table--hover">';
  // https://developers.google.com/chart/interactive/docs/reference?hl=en#methods
  // getValue(rowIndex, columnIndex)
  var row = 0;
  // var col = 0;
  var rows = dataTable.getNumberOfRows();
  // var cols = dataTable.getNumberOfColumns();
  var cols = new Array(0, 1, 2, 4, 5, 6, 7);
  while (row < rows) {
    if (row == 0) {
      header += '<div class="siimple-table-header">'
    } else if (row == 1) {
      header += '<div class="siimple-table-body">'
    }
    header += '<div class="siimple-table-row">'
    // col = 0;
    // while (col < cols) {
    for (c in cols) {
      header += '<div class="siimple-table-cell">'
      console.log(cols[c], c);
      if (((cols[c] == 2) | (cols[c] == 5) | (cols[c] == 6) | (cols[c] == 7)) & (row > 0)) {
        header += '<a href="' + dataTable.getValue(row, cols[c]) +
        '">site</a>';
      }
      else {
        // console.log(row, col);
        header += dataTable.getValue(row, cols[c])
      }
      header += '</div>';
      // col++;
    }
    header += '</div>'
    if (row == 0) {
      header += '</div>'
    } else if (row == rows - 1) {
      header += '</div>'

    }
    // console.log(rows, cols)

    row++;

  }

  document.getElementById("table").innerHTML = header;

  // console.log(dataTable.getNumberOfColumns(), dataTable.getNumberOfRows())
}
