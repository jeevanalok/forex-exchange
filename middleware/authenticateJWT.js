const jwt = require("jsonwebtoken");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err) => {
      if (err) {
        return res.status(403).json({ message: "Could not authorize" });
      }

      next();
    });
  } else {
    res.status(401).json({ message: "Unauthrorised Access! " });
  }
};

module.exports = { authenticateJWT };
