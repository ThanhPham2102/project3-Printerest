const api = `http://localhost:8000/`;

const singInButton = document.getElementById("btn_signIn");
const container = document.getElementById("containerz");
const formlogin = document.getElementById("login-form");

const singupButton = document.getElementById("btn_signUp");
const containerx = document.getElementById("containerx");
const formlogup = document.getElementById("logup-form");

// const errPass = document.getElementById("errPass");
// const errEmail = document.getElementById("errEmail");

singupButton.addEventListener("click", () => {
  containerx.classList.add("right-panel-active");
});

singInButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

formlogup.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = formlogup.email.value;
  let password = formlogup.password.value;
  let username = formlogup.username.value;
  let age = formlogup.age.value;
  let role = "user";

  let data = {
    email,
    password,
    username,
    age,
    role,
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
      if (username === "") {
        Swal.fire({
          icon: "warning",
          title: "Tên người dùng không được bỏ trống",
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
        console.log("fuckyou");
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

formlogin.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = formlogin.email.value;
  let password = formlogin.password.value;

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
        window.location.href = `/auth/HomePage`;
      }
    })
    .catch((err) => {
      {
        console.log(err);
      }
    });
});
