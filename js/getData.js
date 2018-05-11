/* global google, $, console */

// https://google,developers.appspot.com/chart/interactive/docs/spreadsheets#gid
google.load('visualization', '1', {
    packages: ['corechart', 'line']
})

function drawChart() {
    'use strict'
    // Code to get the data from Google Sheets based on: https://stackoverflow.com/a/33055115
    // Add your sheets url and range below
    var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1pDM_cbLpmfbzNFuOJO3JJTm5IF_8KzeqS8wYIsV9RN0/edit'
    var query = new google.visualization.Query(spreadsheetUrl)
    query.send(handleQueryResponse)
}

google.setOnLoadCallback(drawChart)
var arr = [],
    upSymbol = 'fa-sort-up',
    downSymbol = 'fa-sort-down',
    sortSymbol = 'fa-sort'

// Code to sort table based on: https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n, n_max) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0
    table = document.getElementById('table')
    switching = true
    //Set the sorting direction to ascending:
    dir = 'asc'
    rows = table.getElementsByTagName('TR')
    for (i = 0; i < n_max; i++) {
        if (isProfile(arr[0][i])) {
            continue
        }
        if (isSortable(arr[0][i])) {
            document.getElementById(i).getElementsByTagName('i')[0].classList.remove(upSymbol)
            document.getElementById(i).getElementsByTagName('i')[0].classList.remove(downSymbol)
            document.getElementById(i).getElementsByTagName('i')[0].classList.add(sortSymbol)
            document.getElementById(i).getElementsByTagName('i')[0].classList.add('disable-sort')
        }

    }
    /*Make a loop that will continue until
  no switching has been done:*/
    while (switching) {
    //start by saying: no switching is done:
        switching = false
        rows = table.getElementsByTagName('TR')
        document.getElementById(n).getElementsByTagName('i')[0].classList.remove('disable-sort')
        if (dir == 'asc') {
            document.getElementById(n).getElementsByTagName('i')[0].classList.add(upSymbol)
            document.getElementById(n).getElementsByTagName('i')[0].classList.remove(downSymbol)
        } else {
            document.getElementById(n).getElementsByTagName('i')[0].classList.add(downSymbol)
            document.getElementById(n).getElementsByTagName('i')[0].classList.remove(upSymbol)
        }
        /*Loop through all table rows (except the
    first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false
            /*Get the two elements you want to compare,
      one from current row and one from the next:*/
            // x = rows[i].getElementsByTagName("TD")[n];
            x = rows[i].children[n]
            y = rows[i + 1].children[n]
            /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
            if (dir == 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true
                    break
                }
            } else if (dir == 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true
                    break
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
            //Each time a switch is done, increase this count by 1:
            switchcount++
        } else {
            /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == 'asc') {
                dir = 'desc'
                switching = true
            }
        }
    }
}

function shuffle(array) {
    // From: https://stackoverflow.com/a/2450976
    'use strict'
    var currentIndex = array.length,
        temporaryValue, randomIndex
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

function isSortable(col) {
    return col != 'Keywords'
}

function isProfile(col) {
    return (col == 'Website') || (col == 'Google Scholar') || (col == 'GitHub') || (col == 'Twitter') || (col == 'ORCiD')
}

function handleQueryResponse(response) {
    'use strict'
    var row, col, inner, shuffledArr,
        dataTable = response.getDataTable(),
        rows = dataTable.getNumberOfRows(),
        cols = dataTable.getNumberOfColumns()
    for (row = 0; row < rows; row += 1) {
        inner = []
        for (col = 0; col < cols; col += 1) {
            inner.push(dataTable.getValue(row, col))
        }
        arr.push(inner)
    }
    shuffledArr = shuffle(arr.slice(1, -1))
    for (row = 0; row < shuffledArr.length; row += 1) {
        arr[row + 1] = shuffledArr[row]
    }
    var item = document.getElementById('table'),
        parentDiv = item.parentNode
    var tab, tr, td, tn, thead, th, arrow, tbody, text, divThead, divTr, divTh, superDiv, profile, a, div

    // The div head of the table:
    row = 0
    divThead = document.createElement('div')
    divThead.classList.add('thead')
    divThead.id = 'sticky-head'
    divTr = document.createElement('div')
    divTr.classList.add('tr')
    for (col = 0; col < arr[row].length; col += 1) {
        if (isProfile(arr[row][col])) {
            continue
        }
        divTh = document.createElement('div')
        divTh.classList.add('th')
        divTh.id = col
        tn = document.createTextNode(arr[row][col])
        divTh.appendChild(tn)
        if (isSortable(arr[row][col])) {
            divTh.onclick = function() {
                sortTable(this.id, col)
            }
            arrow = document.createElement('i')
            arrow.classList.add('fas')
            arrow.classList.add(sortSymbol)
            arrow.classList.add('disable-sort')
            divTh.classList.add('sortable')
            divTh.appendChild(arrow)

        }
        divTr.appendChild(divTh)
    }
    // Now we add a custom column:
    divTh = document.createElement('div')
    divTh.classList.add('th')
    divTh.id = 'profiles'
    tn = document.createTextNode('Profiles')
    divTh.appendChild(tn)
    divTr.appendChild(divTh)

    divThead.appendChild(divTr)

    superDiv = document.createElement('div')
    superDiv.appendChild(divThead)
    tab = document.createElement('table')
    //
    // // The head of the table:
    // row = 0
    // thead = document.createElement('thead')
    // tr = document.createElement('tr')
    //
    // for (col = 0; col < arr[row].length; col += 1) {
    //     th = document.createElement('th')
    //     th.id = col
    //     th.onclick = function() {
    //         sortTable(this.id, col)
    //     }
    //     arrow = document.createElement('i')
    //     arrow.classList.add('fas')
    //     arrow.classList.add(sortSymbol)
    //     arrow.classList.add('disable-sort')
    //     tn = document.createTextNode(arr[row][col])
    //     th.appendChild(tn)
    //     th.appendChild(arrow)
    //     tr.appendChild(th)
    // }
    // thead.appendChild(tr)
    // tab.appendChild(thead)
    // The body of the table
    tbody = document.createElement('tbody')
    tbody.id = 'table-body'
    for (row = 1; row < arr.length; row++) {
        tr = document.createElement('tr')
        for (col = 0; col < arr[row].length; col++) {
            if (isProfile(arr[0][col])) {
                continue
            }
            div = document.createElement('div')
            td = document.createElement('td')
            td.classList.add(arr[0][col].replace(' ', '-').toLowerCase())
            text = arr[row][col]
            if (arr[0][col] == 'Keywords') {
                if (text != null) {
                    text = text.toLowerCase()
                } else {
                    text = ''
                }
            }
            tn = document.createTextNode(text)
            div.appendChild(tn)
            td.appendChild(div)
            tr.appendChild(td)
        }

        // Now for the custom column
        td = document.createElement('td')
        td.classList.add('profiles')
        div = document.createElement('div')
        for (col = 0; col < arr[row].length; col++) {
            if (isProfile(arr[0][col]) && arr[row][col] != null) {
                profile = document.createElement('i')
                a = document.createElement('a')
                a.title = arr[row][1] + ' ' + arr[row][0] + '\'s ' + arr[0][col]
                a.href = arr[row][col]
                if (arr[0][col] == 'Twitter') {
                    profile.classList.add('fab')
                    profile.classList.add('fa-twitter')
                }
                else if (arr[0][col] == 'GitHub') {
                    profile.classList.add('fab')
                    profile.classList.add('fa-github')
                }
                else if (arr[0][col] == 'ORCiD') {
                    profile.classList.add('ai')
                    profile.classList.add('ai-orcid')
                }
                else if (arr[0][col] == 'Google Scholar') {
                    profile.classList.add('ai')
                    profile.classList.add('ai-google-scholar')
                }
                else if (arr[0][col] == 'Website') {
                    profile.classList.add('fas')
                    profile.classList.add('fa-external-link-alt')
                }
                a.appendChild(profile)
                div.appendChild(a)
                td.appendChild(div)
            } else {
                continue
            }

        }

        tr.appendChild(td)


        tbody.appendChild(tr)
        tab.appendChild(tbody)
    }
    tab.id = 'table'
    superDiv.appendChild(tab)
    parentDiv.replaceChild(superDiv, item)

    $('#sticky-head').sticky({
        topSpacing: 25
    })
}

document.addEventListener('scroll', checkSticky)

function isInRange(num, a, b)
// Find if num is between a and b
{
    var min, max
    if (a >= b) {
        min = b
        max = a
    } else if (b > a) {
        min = a
        max = b
    }
    return ((num >= min) &&
    (num <= max))
}

function outOfView(elem)
// from: https://stackoverflow.com/a/488073
{
    var viewTop = $(window).scrollTop()
    var viewBottom = viewTop + $(window).height()

    var elemTop = $(elem).offset().top
    var elemBottom = elemTop + $(elem).height() - 25 - $('sticky-head').height()
    return ((elemBottom < viewTop) || (elemTop > viewBottom))

}

function timeToStick(elem)
// from: https://stackoverflow.com/a/488073
{
    var viewTop = $(window).scrollTop()
    var viewBottom = viewTop + $(window).height()

    var elemTop = $(elem).offset().top
    var elemBottom = elemTop + $(elem).height() - 25 - $('sticky-head').height()
    return (elemTop <= viewTop)

}

function checkSticky() {
    if (outOfView('#table')) {
        $('#sticky-head').unstick()
    } else if (timeToStick('#table')) {
        $('#sticky-head').sticky({
            topSpacing: 24
        })
    }
}
