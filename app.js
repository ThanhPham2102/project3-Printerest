// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
// const cors = require("cors");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const {
//   requireAuth,
//   notRequireAuth,
//   requireAdmin,
// } = require("./middleware/auth.middleware");

// // import routes
// let userRoutes = require("./routes/users.routes");
// let authRoutes = require("./routes/auth.routes");
// let blogsRoutes = require("./routes/blogs.routes.js");
// const db = require("./models/db");

// // Set up view engine
// app.set("view engine", "ejs");
// app.set("views", `${__dirname}/views`);

// // use third-party middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.static("public"));
// app.use(cookieParser("fuck Đô chim teo"));

// // set up route
// app.get("/", (req, res) => {
//   // db.execute("SELECT * FROM tbl_users")
//   //   .then((data) => {
//   //     let [rows, cols] = data;
//   //     res.render("index", { rows });
//   //     console.log(rows[0].email);
//   //   })
//   //   .catch((err) => console.log(err));
//   res.redirect("/users");
// });

// // User routes
// app.use("/users", requireAuth, userRoutes);
// // Auth routes
// app.use("/auth", notRequireAuth, authRoutes);
// //blogs Router
// app.use("/blogs", requireAuth, requireAdmin, blogsRoutes);

// // listen on port
// app.listen(8000, () => {
//   console.log("server is running on port http://127.0.0.1:8000");
// });


