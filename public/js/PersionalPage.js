window.onload = function () {
  let baseApi = "http://localhost:8000/";

  let posts = [];

  fetch(baseApi + "blogs/photos/")
    .then((res) => res.json())
    .then((data) => {
      let array = data.data;

      let imagesID = [];
      let userID = window.location.href.split("/")[6];
      // console.log("userID", userID);
      // console.log("day la mamg", array);
      for (let i = 0; i < array.length; i++) {
        if (Number(userID) === Number(array[i].user_id)) {
          imagesID.push(array[i]);
        }
      }
      // console.log(imagesID);
      let images = [];
      for (let i = 0; i < imagesID.length; i++) {
        images.push(imagesID[i].img_url);
      }
      let imageIndex = 0;
      for (let i = 0; i < images.length; i++) {
        //logic nay bi bug=> dung khi hien thi toan bo anh ra, anh rieng tung thang bi sai
        let item = {
          id: imagesID[i].id,
          title: `${array[i].photo_name}`,
          image: images[imageIndex],

          user_id: imagesID[i].user_id,
          user_name: imagesID[i].username,
          avatar: imagesID[i].avatar,
        };
        // console.log(item);
        posts.push(item);
        imageIndex++;
        if (imageIndex > images.length - 1) imageIndex = 0;
      }
      const container4 = document.querySelector(".container4");
      function genarateMasonryGrid(columns, posts) {
        container4.innerHTML = "";
        let columnWrappers = {};
        //creat column item array
        for (let i = 0; i < columns; i++) {
          columnWrappers[`column${i}`] = [];
        }
        for (let i = 0; i < posts.length; i++) {
          const column = i % columns;
          columnWrappers[`column${column}`].push(posts[i]);
        }
        for (let i = 0; i < columns; i++) {
          let columnPosts = columnWrappers[`column${i}`];
          let column = document.createElement("div");
          column.classList.add("column1");
          columnPosts.forEach((post) => {
            column.innerHTML += `
      <a href="http://localhost:8000/auth/HomePage/DetailPage/${post.id}"  class="post1">
        <div id="img-${post.id}" class="overlay1">
          <!-- header -->
          <div class="overlay-header">
            
          </div>
          <!-- bottom -->
          <div class="overlay-bottom">
            
          </div>
        </div>
        <img
        id="${post.id}"
          src="${post.image}"
          alt=""
        />
      </a>
  
      <!-- title-avatar
      <p class="title-img">${post.title}</p>
  
      <div class="avatar-img">
        <img
          class="img_avatar"
          src=${post.avatar}
          alt=""
        />
        <h6 class="name_main">${post.user_name}</h6>
      </div>
      -->
    </a>`;
          });
          container4.appendChild(column);
        }
      }

      function loadByScreenSize() {
        let previousScreenSize = window.innerWidth;
        // console.log(previousScreenSize, window.innerWidth);
        imageIndex = 0;
        if (window.innerWidth >= 100 && previousScreenSize <= 300) {
          genarateMasonryGrid(1, posts);
        } else if (window.innerWidth >= 100 && previousScreenSize < 500) {
          genarateMasonryGrid(2, posts);
        } else if (window.innerWidth >= 100 && previousScreenSize < 700) {
          genarateMasonryGrid(3, posts);
        } else if (window.innerWidth >= 100 && previousScreenSize < 900) {
          genarateMasonryGrid(4, posts);
        } else if (window.innerWidth >= 100 && previousScreenSize < 1100) {
          genarateMasonryGrid(5, posts);
        } else if (window.innerWidth >= 100 && previousScreenSize < 1300) {
          genarateMasonryGrid(6, posts);
        } else if (window.innerWidth >= 100 && previousScreenSize < 1500) {
          genarateMasonryGrid(7, posts);
        } else {
          genarateMasonryGrid(8, posts);
        }
      }
      loadByScreenSize();

      window.addEventListener("resize", () => {
        loadByScreenSize();
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const clickPer = document.getElementById("id-profile");

clickPer.onclick = (e) => {
  e.preventDefault();
  // console.log(window.location.href.split("/"));
  let id = window.location.href.split("/")[6];
  window.location.href = `/auth/HomePage/profile/${id}`;
};
// bosutap
