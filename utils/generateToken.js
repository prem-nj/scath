const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { username: user.fullname, email: user.email },
    process.env.JWT_TOKEN
  );
}

module.exports = generateToken;
