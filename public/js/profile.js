const baseApi = `http://localhost:8000/`;
const formupdate = document.getElementById("form-profile");

const updateButton = document.getElementById("btn-update");
const container = document.getElementById("profilemy");

// updateButton.addEventListener("submit", () => {
//   container.classList.add("right-panel-active");
// });

// console.log(tbody);
formupdate.addEventListener("submit", (e) => {
  e.preventDefault();
  let fistname = formupdate.fistname.value;
  let lastname = formupdate.lastname.value;
  let dob = formupdate.dob.value;
  let website = formupdate.website.value;
  let username = formupdate.username.value;
  let id = formupdate.iduser.value;
  let data = {
    fistname,
    lastname,
    dob,
    website,
    username,
  };
  fetch(baseApi + `auth/HomePage/profile/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "updatesuccess") {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thông tin thành công",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
