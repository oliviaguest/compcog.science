// https://google,developers.appspot.com/chart/interactive/docs/spreadsheets#gid
google.load('visualization', '1', {
  packages: ['corechart', 'line']
});
google.setOnLoadCallback(drawChart);

// function delay(response) {
//   setTimeout(function() {
//     handleQueryResponse(response);
//     // test(response);
// }, 0)
// }

function drawChart() {
  // Add your sheets url and range below
  var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1pDM_cbLpmfbzNFuOJO3JJTm5IF_8KzeqS8wYIsV9RN0/edit";
  https: //docs.google.com/spreadsheets/d/1pDM_cbLpmfbzNFuOJO3JJTm5IF_8KzeqS8wYIsV9RN0/edit#gid=0
    var query = new google.visualization.Query(spreadsheetUrl);
  query.send(handleQueryResponse);
}
var arr = []



function handleQueryResponse(response) {

  var dataTable = response.getDataTable();


  var rows = dataTable.getNumberOfRows();
  var cols = dataTable.getNumberOfColumns();
  for (row=0; row < rows; row++){
    var inner = []
    for (col=0; col < cols; col++){
      inner.push(dataTable.getValue(row, col))

    }
    arr.push(inner)
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

var shuffledArr= arr.slice(1, -1)
shuffledArr = shuffle(shuffledArr);
var newArr = []
console.log(shuffledArr.length, arr.length)


// for (i in shuffledArr){
//   console.log(i)
//   for (j in shuffledArr[i]){
//     arr[i+1][j] = shuffledArr[i][j]
//   }
//   // console.log(shuffledArr[i])
// }
newArr = []
newArr[0] = arr[0]
for (row=0; row < shuffledArr.length; row++){
  newArr[row+1] = shuffledArr[row]
     // for (col=0; col < arr[row].length; col++){
       // arr[row][col] = newArr[row-1][col]
//
     // }
  }
arr = newArr
console.log(newArr.length, arr.length)

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
          th.onclick = function() { sortTable(this.id, col); };
          arrow = document.createElement("i");
          arrow.classList.add("fas");
          arrow.classList.add("fa-angle-up");
          arrow.classList.add("white-arrow")
          tn = document.createTextNode(arr[row][col]);
          th.appendChild(tn);
          th.appendChild(arrow);



          tr.appendChild(th);


      }
  thead.appendChild(tr);

  tab.appendChild(thead);
  // body
  tbody = document.createElement('tbody');
  for (row=1; row < arr.length; row++){
      tr = document.createElement('tr');
      console.log(row, arr[row])
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
function sortTable(n, n_max) {

  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";

  rows = table.getElementsByTagName("TR");

  for (i = 0; i < n_max; i++){
    rows[0].children[i].getElementsByTagName('i')[0].classList.add("white-arrow");
  }
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    rows[0].children[n].getElementsByTagName('i')[0].classList.remove("white-arrow");

    if (dir == "asc") {
      rows[0].children[n].getElementsByTagName('i')[0].classList.add("fa-angle-up");
      rows[0].children[n].getElementsByTagName('i')[0].classList.remove("fa-angle-down");


    } else {
      rows[0].children[n].getElementsByTagName('i')[0].classList.add("fa-angle-down");
      rows[0].children[n].getElementsByTagName('i')[0].classList.remove("fa-angle-up");

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
