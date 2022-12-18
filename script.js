// localStorage.clear();

let id = "no";
selectData();

function manageData() {
  let name = document.getElementById("name").value;
  document.getElementById("msg").innerHTML = "";
  if (name == "") {
    document.getElementById("msg").innerHTML = "Please enter your query";
  } else {
    // here possible two case 1 is user want to data add and 2nd is user want data update
    // if user come in only data add
    if (id == "no") {
      let arr = getCrudData();
      //   console.log(arr);
      // firstly we check our localStorage is blank or not
      if (arr == null) {
        let data = [name];
        setCrudData(data);
      } else {
        // if our localstorage is not blank
        arr.push(name);
        setCrudData(arr);
      }
      document.getElementById("msg").innerHTML = "Data added";
    } else {
      // if user want data update
      let arr = getCrudData();
      arr[id] = name;
      setCrudData(arr);
      document.getElementById("msg").innerHTML = "Data updated";
    }
    document.getElementById("name").value = "";
    selectData();
  }
}

function selectData() {
  let arr = getCrudData();
  if (arr != null) {
    let html = "";
    let sNo = 1;
    for (let k in arr) {
      html =
        html +
        `
            <tr>
                <td>${sNo}</td>
                <td>${arr[k]}</td>
                <td>
                    <a href="javascript:void(0)" onClick="editData(${k})">Edit</a>
                    <a href="javascript:void(0)" onClick="deleteData(${k})">Delete</a>
                </td>
            </tr>
        `;
      sNo++;
    }
    document.getElementById("root").innerHTML = html;
  }
}

function editData(rid) {
  id = rid;
  let arr = getCrudData();
  document.getElementById("name").value = arr[rid];
}

function deleteData(rid) {
  let arr = getCrudData();

  //   data delete
  arr.splice(rid, 1);
  // when data delete then table update
  setCrudData(arr);
  //   call the function
  selectData();
}

// many placecs we use this line so replace this line a single word

function getCrudData() {
  let arr = JSON.parse(localStorage.getItem("crud"));
  return arr;
}

// many places use set crud data so use this function
function setCrudData(arr) {
  localStorage.setItem("crud", JSON.stringify(arr));
}
