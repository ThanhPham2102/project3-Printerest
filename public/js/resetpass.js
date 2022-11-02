const api = `http://localhost:8000/`;

const singInButton = document.getElementById("btn_signin");
const container = document.getElementById("containerz");
const formlogin1 = document.getElementById("dangNhap");

const singupButton = document.getElementById("btn_signup");
const containerx = document.getElementById("containerx");
const formlogup1 = document.getElementById("dangKy");

singupButton.addEventListener("click", () => {
  containerx.classList.add("right-panel-active");
});

singInButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

formlogup1.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = formlogup1.email.value;
  let password = formlogup1.password.value;
  let age = formlogup1.age.value;
  let data = {
    email,
    password,
    age,
  };
  fetch(api + "auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (email === "") {
        Swal.fire({
          icon: "warning",
          title: "Email không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if ((password === "") & (data.status === "useralrea") & (age !== "")) {
        Swal.fire({
          icon: "warning",
          title: "Mật Khẩu không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (password === "") {
        Swal.fire({
          icon: "warning",
          title: "Mật Khẩu không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if ((password === "") & (age === "")) {
        Swal.fire({
          icon: "warning",
          title: "Mật Khẩu và tuổi không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      } else if (age === "") {
        Swal.fire({
          icon: "warning",
          title: "Tuổi không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if ((email === "") & (password === "") & (age === "")) {
        Swal.fire({
          icon: "warning",
          title: "Email, mật khẩu và tuổi không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if ((email === "") & (age === "")) {
        Swal.fire({
          icon: "warning",
          title: "Email và tuổi không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if ((email === "") & (password === "")) {
        Swal.fire({
          icon: "warning",
          title: "Email và mật khẩu không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (data.status === "useralrea") {
        Swal.fire({
          icon: "warning",
          title: "Email đã tồn tại",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }

      if ((data.status !== "useralrea") & (data.status === "passnotenough")) {
        Swal.fire({
          icon: "warning",
          title: "Mật khẩu không đủ mạnh",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (data.status === "created successfully") {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
    });
});

formlogin1.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = formlogin1.email.value;
  let password = formlogin1.password.value;

  // Validate login

  let data = {
    email,
    password,
  };
  fetch(api + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (email === "") {
        Swal.fire({
          icon: "warning",
          title: "Email không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (password === "") {
        Swal.fire({
          icon: "warning",
          title: "Mật Khẩu không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if ((email === "") & (password === "")) {
        Swal.fire({
          icon: "warning",
          title: "Email và mật khẩu không được bỏ trống",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (data.status === "erruser") {
        Swal.fire({
          icon: "warning",
          title: "Email không chính xác",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (data.status === "errpass") {
        Swal.fire({
          icon: "warning",
          title: "Mật khẩu không chính xác",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      }
      if (data.status === "success") {
        window.location.href = "/auth/trangchu";
      }
    })
    .catch((err) => {
      {
        console.log(err);
      }
    });
});
