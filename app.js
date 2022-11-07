const express = require("express");
const app = express();
const port = 8000;

// import modules
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const ejs = require("ejs");

// import routes
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/users.routes");
const adminRoutes = require("./routes/admin.routes");
const { requireAuth } = require("./middlewares/auth.middleware");
const cookieParser = require("cookie-parser");
let blogsRoutes = require("./routes/blogs.routes.js");
let collectionRoutes = require("./routes/colection.routes");
let collectionphotoRoutes = require("./routes/collectionphoto.routes");

// setup view engine (ejs)

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

// use third-party middleware

app.use(bodyParser.urlencoded({ extended: true })); // form-input (method-post)
app.use(bodyParser.json()); // json (fetch api)
app.use(cors()); // fix cross origin error
app.use(express.static("public")); // hosting static file
app.use(morgan("dev")); // log request on server (for debugging)
app.use(cookieParser("i love feifei"));

// setup routes

app.get("/", requireAuth, (req, res) => {
  res.redirect("/auth");
});
// Auth routes
app.use("/auth", authRoutes);
// app.use("/HomePage", requireAuth, authRoutes);
// app.use("/resetpass", authRoutes);
// app.use("/HomePage/PersionalPage", requireAuth, authRoutes);
// app.use("/HomePage/profile", requireAuth, authRoutes);

// Users routes
// app.use("/admin", requireAdmin, userRoutes);
// blogs Router
app.use(
  "/blogs",
  requireAuth,
  //  requireAdmin,
  blogsRoutes
);
//collection router
app.use(
  "/collection",
  // requireAuth,
  //  requireAdmin,
  collectionRoutes
);
// collectionphoto router
app.use(
  "/collectionphoto",
  // requireAuth,
  //  requireAdmin,
  collectionphotoRoutes
);

// admin
// app.use("/Admin/users", requireAuth, authRoutes);

app.use("/admin", requireAuth, adminRoutes);
// Listen on port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
