const fname= document.getElementById("firstName");
const lname=document.getElementById("lastName");
const table = document.getElementById("tbody");
let firstname = [];
let lastname = [];
let count = 0;
let index;

function add() {
    if(fname.value == '' || lname.value == ''){
        alert("provide firstname and lastname both");
    } else {
    if(document.getElementById("addBtn").innerHTML === "Add"){
    firstname[count] = fname.value;
    lastname[count] = lname.value;
    show();
    count++;
    reset();
    } else {
        update();
        document.getElementById("addBtn").innerHTML = "Add";
        }
    }
}

function reset() {
    fname.value = "";
    lname.value = "";

}
function show() {
    let tbody = document.getElementById("tbody");
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    let td1 = document.createElement("td");
    tr.appendChild(td1);
    td1.innerHTML = firstname[count];
    let td2 = document.createElement("td");
    tr.appendChild(td2);
    td2.innerHTML = lastname[count];
    let td3 = document.createElement("td");
    tr.appendChild(td3);
    td3.innerHTML = `<input type="button" value="Edit" id="${count}" class="btn btn-primary" onClick="editRow(id)">
                     <input type="button" value="Delete" id="${count}" class="btn btn-primary" onClick="deleteRow(id)">`
                }
function editRow(id) {
    index = id;
    fname.value=firstname[id];
    lname.value=lastname[id];
    document.getElementById("addBtn").innerHTML="Update";
}
function update() {
    let fname = document.getElementById("firstName").value;
    let lname = document.getElementById("lastName").value;
    firstname[index]=fname.value;
    lastname[index]=lname.value;
    reset();
    table.rows[index].cells[0].innerHTML = fname;
    table.rows[index].cells[1].innerHTML = lname;
}
function deleteRow(id)
{
    index = id;
    table.deleteRow(index);
    console.log(typeof(index));
    for (let i= parseInt(index)+1;i<count;i++){
    document.getElementById(i).id = i-1;
    document.getElementById(i).id = i-1;
    }
    count--;
firstname.splice(index,1);
lastname.splice(index,1);
}