const jwt = require("jsonwebtoken");

const secretKey = "$uperMan@123";

function createUserToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      profileImage: user.profileImageURL,
      role: user.role,
    },
    secretKey
  );

  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secretKey);
  return payload;
}

module.exports = { createUserToken, validateToken };
