console.log("hello");
let posts = [];
const images = [
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/5c/ff/c5/5cffc50b81ddd224d570dd7bc536de53.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/564x/86/2b/ba/862bba9f8201dd16a4e1f3dd06adadbf.jpg",
  "https://i.pinimg.com/564x/d8/32/2f/d8322fcc3dabf0501655cdf7fb4f2879.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.ytimg.com/vi/zI0RaF4jsy8/maxresdefault.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
  "https://i.pinimg.com/564x/18/1e/a3/181ea3f63195017193ab65d215e9ed23.jpg",
  "https://i.pinimg.com/474x/31/11/21/31112187b0fccf4c17cb3871fb60b84f.jpg",
  "https://i.pinimg.com/736x/e5/5e/c6/e55ec644366ebfd5331d5f2bdff933e9--voi-japan-girl.jpg",
  "https://i.pinimg.com/564x/83/76/60/837660daac6b40ead974d441d797909e.jpg",
  "https://i.pinimg.com/474x/43/f8/6f/43f86f0294d748d541fba47f080efc93.jpg",
  "https://i.pinimg.com/474x/18/52/ad/1852ad7338c7c76f0c1f6a356f4452ba.jpg",
];

let imageIndex = 0;
for (let i = 0; i < images.length; i++) {
  let item = {
    id: i,
    title: `Post${i}`,
    image: images[imageIndex],
  };
  posts.push(item);
  imageIndex++;
  if (imageIndex > images.length - 1) imageIndex = 0;
}
// console.log(posts);

const container1 = document.querySelector(".container1");
function genarateMasonryGrid(columns, posts) {
  container1.innerHTML = "";
  let columnWrappers = {};
  //creat column item array
  for (let i = 0; i < columns; i++) {
    columnWrappers[`column${i}`] = [];
  }
  //   console.log(columnWrappers);

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
      <a href="http://localhost:8000/auth/HomePage/DetailPage" class="post1">
        <div class="overlay1">
          <!-- header -->
          <div class="overlay-header">
            
          </div>
          <!-- bottom -->
          <div class="overlay-bottom">
            
          </div>
        </div>
        <img
          src="${post.image}"
          alt=""
        />
      </a>
  
      <!-- title-avatar -->
      <p class="title-img">${post.title}</p>
  
      <div class="avatar-img">
        <img
          class="img_avatar"
          src=${post.image}
          alt=""
        />
        <h6 class="name_main">Ten Tai Khoan</h6>
      </div>
    </a>`;
    });
    container1.appendChild(column);
  }
}

function loadByScreenSize() {
  let previousScreenSize = window.innerWidth;
  console.log(previousScreenSize, window.innerWidth);
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

window.onload = function () {
  loadByScreenSize();
};

window.addEventListener("resize", () => {
  loadByScreenSize();
});
