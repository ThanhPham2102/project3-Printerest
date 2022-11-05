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

module.exports.requireHome = (req, res, next) => {
  console.log(req.signedCookies.role);
  console.log(req.signedCookies.email);
  if (req.signedCookies.role === "user") {
    res.redirect(`HomePage/${req.signedCookies.email}`);
  } else {
    next();
  }
};
module.exports.requirePer = (req, res, next) => {
  console.log(req.signedCookies.role);
  console.log(req.signedCookies.email);
  if (req.signedCookies.role === "user") {
    res.redirect(`HomePage/PersionalPage/${req.signedCookies.email}`);
  } else {
    next();
  }
};
