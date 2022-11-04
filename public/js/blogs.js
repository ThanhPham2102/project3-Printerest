const blogsApi = "http://127.0.0.1:8000/";
const tbodyBlogs = document.getElementById("tbody-blogs");

const showMessageBlogs = (startus, message) => {
  let messageContainerBlogs = document.querySelector(".message-blogs");
  if (status === "delete") {
    messageContainerBlogs.innerHTML = `<div class="alert alert-danger">${message}</div>`;
  }
  if (status === "update") {
    messageContainerBlogs.innerHTML = `<div class="alert alert-success">${message}</div>`;
  }
  setTimeout(() => {
    messageContainerBlogs.innerHTML = "";
  }, 3000);
};

tbodyBlogs.addEventListener("click", (e) => {
  
  if (e.target.classList.contains("btn-delete-blogs")) {
    let id = e.target.id;
    fetch(blogsApi + `blogs/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        showMessageBlogs("delete", data.message);
        e.target.parentElement.parentElement.remove();
        console.log(data);
      })
      .catch((err) => {
        showMessageBlogs("delete", err.message);
      });
  }

  if (e.target.classList.contains("btn-update-blogs")) {
    let td = e.target.parentElement.parentElement;
    let tdChildListBlogs = e.target.parentElement.parentElement.children;
    let info = {
      index: tdChildListBlogs[0].innerHTML,
      id: tdChildListBlogs[1].innerHTML,
      title: tdChildListBlogs[2].innerHTML,
      content: tdChildListBlogs[3].innerHTML,
      img: tdChildListBlogs[4].innerHTML,
      user_id: tdChildListBlogs[5].innerHTML,
      role: tdChildListBlogs[6].innerHTML,
    };
    console.log(tdChildListBlogs);

    td.innerHTML = `
    <tr>
        <th scope="row">
            ${info.index}
        </th>
        <td>${info.id}</td>
        <td><input type="text" value="${info.title}"></td>
        <td><input type="text" value="${info.content}"></td>
        <td><input type="text" value="${info.img}"></td>
       
        <td><input type="text" value="${info.user_id}"></td>
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
  if (e.target.classList.contains("btn-save")) {
    // GET id
    let id = e.target.id.split("-")[1]; // update-1, update-2...

    // GET current row (Lấy ra dòng hiện tại của nút update)
    let td = e.target.parentElement.parentElement;

    // GET current row children
    // Lấy toàn bộ phần tử con (td list) của dòng hiện tại
    let tdChildList = e.target.parentElement.parentElement.children;

    let info = {
      index: tdChildList[0].innerHTML,
      id: tdChildList[1].innerHTML,
      title: tdChildList[2].children[0].value,
      content: tdChildList[3].children[0].value,
      img: tdChildList[4].children[0].value,
      user_id: tdChildList[5].children[0].value,
    };
    // .innerHTML ---> text (input) "<input />"
    console.log("111", info.img);
    // .children ---> 1 mảng HTML, [0] --> .value
    // console.log(info.website, info.phone);

    // Tiến hành gọi fetch update
    fetch(blogsApi + `blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        showMessageBlogs("update", data.message);
        // DOM để đổi lại dòng hiện tại thành một dòng bình thường không có
        // input nằm ở bên trong nữa
        td.innerHTML = `
        <tr>
            <th scope="row">
                ${info.index}
            </th>
            <td>${info.id}</td>
            <td>${info.title}</td>
            <td>${info.content}</td>
            <td>${info.img}</td>
            <td>${info.user_id}</td>
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
window.onload = function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let pages = document.getElementsByClassName("page-item");
  let activePage = params.page_index_blogs;
  pages = Array.from(pages);
  pages.pop();
  pages.shift();
  pages[activePage - 1].classList.add("active");
};
