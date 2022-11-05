const baseApi = "http://127.0.0.1:8000/";
const tbody = document.getElementById("tbody"); //dung de hien thi thong tin tu db ra trnag blogs
let ul = document.querySelector(".pagination"); //chuyen trang

const showMessage = (status, message) => {
  let messageContainer = document.getElementsByClassName("message")[0];
  if (status === "delete") {
    messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  }
  if (status === "update") {
    messageContainer.innerHTML = `<div class="alert alert-success">${message}</div>`;
  }
  setTimeout(() => {
    messageContainer.innerHTML = "";
  }, 3000);
};

tbody.addEventListener("click", (e) => {
  // xoá dữ liệu 
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.id;
    fetch(baseApi + `users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        showMessage("delete", data.message);
        e.target.parentElement.parentElement.remove();
       
      })
      .catch((err) => {
        showMessage("delete", err.message);
      });
  }

// update dữ liệu
  if (e.target.classList.contains("btn-update")) {
    let id = e.target.id.split("-")[1];
    let td = e.target.parentElement.parentElement;
    console.log(td);
    let tdChildList = e.target.parentElement.parentElement.children;
    let info = {
      index: tdChildList[0].innerHTML,
      id: tdChildList[1].innerHTML,
      email: tdChildList[2].innerHTML,
      password: tdChildList[3].innerHTML,
      age: tdChildList[4].innerHTML.trim(),
      fistname: tdChildList[5].innerHTML.trim(),
      lastname: tdChildList[6].innerHTML.trim(),
      avatar: tdChildList[7].innerHTML.trim(),
      dob: tdChildList[8].innerHTML.trim(),
      website: tdChildList[9].innerHTML.trim(),
      username: tdChildList[10].innerHTML.trim(),
      role: tdChildList[11].innerHTML.trim(),
    };
    td.innerHTML = `
    <tr style="width:100%">
        <td scope="row">
            ${info.index}
        </td>
        <td>${info.id}</td>
        <td>${info.email}</td>
        <td class="password">${info.password}</td>
        <td><input type="text" value="${info.age}"></td>
        <td><input type="text" value="${info.fistname}"></td>
        <td><input type="text" value="${info.lastname}"></td>
        <td><input type="text" value="${info.avatar}"></td>
        <td><input type="text" value="${info.dob}"></td>
        <td><input type="text" value="${info.website}"></td>
        <td><input type="text" value="${info.username}"></td>
        <td><input type="text" value="${info.role}"></td>
       
       
        <td class="action">
            <span id="${info.id}" class="btn-delete btn btn-danger">
                <ion-icon name="trash-outline"></ion-icon>
            </span>
            <span id="save-${info.id}" class="btn-save btn btn-info">
                Save
            </span>
        </td>
    </tr>
    `;
  }
// SAVE dữ liệu
  if (e.target.classList.contains("btn-save")) {
    
    let id = e.target.id.split("-")[1];
    let td = e.target.parentElement.parentElement;
 
    let tdChildList = e.target.parentElement.parentElement.children;
  

    let info = {
      id: tdChildList[1].innerHTML,
      email: tdChildList[2].innerHTML,
      password: tdChildList[3].innerHTML,
      age: tdChildList[4].children[0].value,
      fistname: tdChildList[5].children[0].value,
      lastname: tdChildList[6].children[0].value,
      avatar: tdChildList[7].children[0].value,
      dob: tdChildList[8].children[0].value,
      website: tdChildList[9].children[0].value,
      username: tdChildList[10].children[0].value,
      role: tdChildList[11].children[0].value,
    };
    // .innerHTML ---> text (input) "<input />"

    // .children ---> 1 mảng HTML, [0] --> .value

    // Tiến hành gọi fetch update
    fetch(baseApi + `users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
      
        showMessage("update", data.message);
        // DOM để đổi lại dòng hiện tại thành một dòng bình thường không có
        // input nằm ở bên trong nữa
        td.innerHTML = `
        <tr>
            <th scope="row">
                ${info.index}
            </th>
            <td>${info.id}</td>
            <td>${info.email}</td>
            <td class="password">${info.password}</td>
            <td>${info.age}</td>
            <td>${info.fistname}</td>
            <td>${info.lastname}</td>
            <td>${info.avatar}</td>
            <td>${info.dob}</td>
            <td>${info.website}</td>
            <td>${info.username}</td>
            <td>${info.role}</td>
            <td class="action">
                <span id="${info.id}" class="btn-delete btn btn-danger">
                    <ion-icon name="trash-outline"></ion-icon>
                </span>
                <span id="save-${info.id}" class="btn-update btn btn-info">
                  <ion-icon name="build-outline"></ion-icon>
                </span>
            </td>
        </tr>
        `;
      })
      .catch((err) => console.log(err));
    // Đổi lại nut save thành icon update

    // Hiển thị ra message update thành công
  }
});
let logout = document.querySelector(".sign-out");

window.onload = function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let pages = document.getElementsByClassName("page-item");
  let activePage = params.page_index;
  pages = Array.from(pages);
  pages.pop();
  pages.shift();
  // pages[activePage - 1].classList.add("active");
};










