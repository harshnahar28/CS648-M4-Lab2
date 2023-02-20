




var arrEmployees = [
    [63829543, "Harsh Nahar", 4563, "harshpnahar28@gmail.com", "Administrative"],
    [18181818, "Virat Kohli", 9877, "vk18@gmail.com", "Engineering"],
    [77777777, "James Bond", 7777, "jamesbond007@gmail.com", "Marketing"],
    [65873453, "Bill Gates", 1010, "billgates@microsoft.com", "Quality Assurance"],
    [78543678, "Elon Musk", 8970, "elonmusk@tesla.com", "Executive"]
]


var $ = function(x){
    "use strict";
    return window.document.getElementById(x);
}




if (localStorage.getItem('employees') !== null) {
    arrEmployees = JSON.parse(localStorage.getItem('employees'))
}

var form        = $('addForm')
var empTable    = $('empTable')
var empCount    = $('empCount')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
createTable()

// ADD EMPLOYEE
form.addEventListener('submit', (x) => {
    // PREVENT FORM SUBMISSION
    x.preventDefault()
    // GET THE VALUES FROM THE TEXT BOXES
    var empID       = parseInt($('id').value)
    var name     = $('name').value
    var extention    = parseInt($('extension').value)
    var email    = $('email').value
    var department   = $('department').value
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    var arrNewEmployee = [empID, name, extention, email, department]
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    arrEmployees.push(arrNewEmployee)
    // BUILD THE GRID
    createTable()
    // RESET THE FORM
    form.reset()
    // SET FOCUS BACK TO THE ID TEXT BOX
    form.id.focus()
})

// DELETE EMPLOYEElo
empTable.addEventListener('click', (x) => {
    if (x.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            var rowIndex = x.target.parentNode.parentNode.rowIndex
            // REMOVE EMPLOYEE FROM ARRAY
            arrEmployees.splice(rowIndex - 1, 1)
            // BUILD THE GRID
            createTable()
        }
    }
})

// BUILD THE EMPLOYEES GRID
function createTable() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    var tbody = document.createElement('tbody')
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (var employee of arrEmployees) {
        tbody.innerHTML += 
        `
        <tr>
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${arrEmployees.length})`
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(arrEmployees))
}