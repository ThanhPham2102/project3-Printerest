const baseApi = "http://127.0.0.1:8000/";
const tbody = document.getElementById("tbody"); //dung de hien thi thong tin tu db ra trnag blogs
let ul = document.querySelector(".pagination"); //chuyen trang

const showMessage = (status, message) => {
  let messageContainer = document.getElementsByClassName("message")[0];
  if (status === "delete") {
    messageContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
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
});

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
