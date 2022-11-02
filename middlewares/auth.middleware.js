module.exports.requireAuth = (req, res, next) => {
  //   console.log(req);
  //   console.log(req.cookies);
  if (Object.keys(req.signedCookies).length === 0) {
    res.redirect("/auth");
  } else {
    next();
  }
};

module.exports.notRequireAuth = (req, res, next) => {
  // console.log("121",req);
  // console.log(req.cookies);
  if (Object.keys(req.signedCookies).length !== 0) {
    res.redirect("/");
  } else {
    next();
  }
};

// module.exports.requireAdmin = (req, res, next) => {
//   // console.log(req.signedCookies.role);
//   // console.log(req.signedCookies.userId);
//   if (req.signedCookies.role === "user") {
//     res.redirect(`/users/${req.signedCookies.userId}/blogs`);
//   } else {
//     next();
//   }
// };
