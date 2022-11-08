const db = require("../models/db");

module.exports.printUploadForm = (req, res) => {
  res.render("profile");
};

module.exports.uploadAvatar = (req, res) => {
  let { id } = req.params;
  let img = req.file.filename;
  console.log(img);
  console.log(id);
  let avatar = `http://localhost:8000/asset/${img}`;
  // let { avatar } = req.body;

  db.execute("UPDATE tbl_userpint SET avatar=? WHERE id=?", [avatar, id])
    .then((data) => {
      // console.log(data);

      db.execute("SELECT * FROM tbl_userpint WHERE id =?", [id]) //so sánh với id trong db
        .then((data) => {
          let [rows] = data;
          console.log(data);
          res.render("profile", {
            data: rows[0],
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
