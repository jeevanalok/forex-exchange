const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

exports.authLogin = (req, res) => {
  let accessToken = jwt.sign(
    { user: "forex", type: "task" },
    accessTokenSecret
  );

  res.status(200).json({
    message: "Token Generated Successfully",
    accessToken: accessToken,
  });
};
