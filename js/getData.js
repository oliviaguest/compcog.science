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



  var textnode = document.createTextNode("Water");
  var item = document.getElementById("table");
  var parentDiv = item.parentNode;

  var body, tab, tr, td, tn, row, col;
  body = document.getElementsByTagName('body')[0];
  tab = document.createElement('table');
  // head
  row = 0
      thead = document.createElement('thead');
      tr = document.createElement('tr');

      for (col=0; col < arr[row].length; col++){
          th = document.createElement('th');
          th.id = col;
          th.onclick = function() { sortTable(this.id); };

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
  tab.id = "table";

  parentDiv.replaceChild(tab, item);
  // console.log(dataTable.getNumberOfColumns(), dataTable.getNumberOfRows())
}

// From: https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n) {

  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    if (dir == "asc") {
      rows[0].children[n].style.color = "blue";

    } else {
      rows[0].children[n].style.color = "red";

    }
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/


      // x = rows[i].getElementsByTagName("TD")[n];
      x = rows[i].children[n];

      y = rows[i + 1].children[n];

      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
