// Userlist data array for filling in info box
var $
let userListData = []
// DOM Ready =============================================================
$(document).ready(function () {
    // Populate the user table on initial page load
  populateTable()
  $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo)
  // $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser)
  $('#userInfo p').on('click', 'a.linkedituser', addToEditView) // add user info in edit view
  // $('#btnAddUser').on('click', addUser)
  $('#btnUpdateInfo').on('click', updateInfo)
  $('#btnCancelUpdateInfo').on('click', toggleAddEditView)
})
// Functions =============================================================

// Fill table with data
function populateTable () {
  // Empty content string
  let tableContent = ''
  // jQuery AJAX call for JSON
  $.getJSON('/admin/users/test', function (data) {
    // For each item in our JSON, add a table row and cells to the content string
    userListData = data
    $.each(data, function () {
      tableContent += '<tr>'
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>'
      tableContent += '<td>' + this.email + '</td>'
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">remove</a></td>'
      tableContent += '</tr>'
    })
    // Inject the whole content string into existing HTML table
    $('#userList table tbody').html(tableContent)
  })
}

// Show User Info
function showUserInfo (event) {
    // Prevent Link from Firing
  event.preventDefault()
    // Retrieve username from link rel attribute
  let thisUserName = $(this).attr('rel')
    // Get Index of object based on id value
  let arrayPosition = userListData.map(function (arrayItem) { return arrayItem.username }).indexOf(thisUserName)
    // Get our User Object
  let thisUserObject = userListData[arrayPosition]
    // Populate Info Box
  $('#userInfoName').text(thisUserObject.name)
  $('#userInfoAge').text(thisUserObject.age)
  $('#userInfoLocation').text(thisUserObject.location)
  $('#userInfoEditLink').append('<a href="#" class="linkedituser" rel="' + thisUserObject._id + '">edit</a>')
  // each time pushing "linkshowuser", "userEditInfoLink" append the info.. need to fix
}

function toggleAddEditView () {
  $('#addUserView').toggle()
  $('#editUserView').toggle()
}

function addToEditView (event) {
  event.preventDefault()
  if ($('#addUserView').is(':visible')) {
    toggleAddEditView()
  }
  let _id = $(this).attr('rel')
  let arrayPosition = userListData.map(function (arrayItem) { return arrayItem._id }).indexOf(_id)
  let thisUserObject = userListData[arrayPosition]
  $('#updateUserFullname').val(thisUserObject.name)
  $('#updateUserAge').val(thisUserObject.age)
  $('#updateUserLocation').val(thisUserObject.location)
  $('#updateUserName').val(thisUserObject.username)
  $('#updateUserEmail').val(thisUserObject.email)
  $('#editUserView').attr('rel', thisUserObject._id)
}
