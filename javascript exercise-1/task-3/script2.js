let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let tbody = document.getElementById('tbody');
let currentUserIdForUpdate;
let userArr = [{
                firstName: "sweta",
                lastName: "kumari"
                },{
                 firstName: "sheenam",
                 lastName: "khan"
                },{
                    firstName: "anshu",
                    lastName: "beniwal"
                },{
                    firstName: "shubham",
                    lastName: "muley"
                },{
                    firstName: "anand",
                    lastName: "vyas"
                },{
                    firstName: "ritik",
                    lastName: "maheswari"
                },{
                    firstName: "ravi",
                    lastName: "patekar"
                },{
                    firstName: "jatin",
                    lastName: "saraf"
                },{
                    firstName: "shreya",
                    lastName: "singh"
                },{
                    firstName: "soumya",
                    lastName: "bharty"
                }];
                showUsers();


function add() {
    if (firstName.value == '' || lastName.value == '') {
        alert("provide first and lastname both");
    } else {
        if(document.getElementById('addBtn').innerHTML === 'Add') {
        userArr.push({
            firstName: firstName.value,
            lastName: lastName.value
        });
        firstName.value = '';
        lastName.value = '';
        showUsers();
    } else {
        updateUserDetails();
        document.getElementById("addBtn").innerHTML = "Add";
    }
}
}

function showUsers() {

    let content = "";
    tbody.innerHTML = '';
    for (let i = 0; i < userArr.length; i++) {
        content += `<tr>
        <th scope="row">${i+1}</th>
        <td>${userArr[i].firstName}</td>
        <td>${userArr[i].lastName}</td>
        <td>
            <button type="button" onclick="editBtn(${i})" class="btn btn-primary mr-3 pr-2 edit">Edit</button>
            <button type="button" onclick="deleteBtn(${i})" class="btn btn-danger delete">Delete</button>
        </td>
      </tr>`
    }
    tbody.innerHTML = content;
}

function editBtn(userId) {
    currentUserIdForUpdate = userId;
    firstName.value = userArr[userId ].firstName;
    lastName.value = userArr[userId ].lastName;
    document.getElementById("addBtn").innerHTML = "Update";
}

function updateUserDetails() {
    userArr[currentUserIdForUpdate].firstName = firstName.value;
    userArr[currentUserIdForUpdate].lastName = lastName.value;
    firstName.value = '';
    lastName.value = '';
    showUsers();
}

function deleteBtn(userId) {
    userArr.splice(userId,1);
    showUsers();
}