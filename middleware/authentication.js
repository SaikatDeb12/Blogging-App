const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return next();
    }
    try {
      const payload = validateToken(token);
      console.log(payload);
      req.user = payload;
    } catch (err) {}
    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
