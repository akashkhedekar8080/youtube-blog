const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName]; // Corrected cookie access
    if (!tokenCookieValue) return next(); // Proceed if no token

    try {
      const userPayload = validateToken(tokenCookieValue);
      if (userPayload) {
        req.user = userPayload; // Attach user data to request
      }
    } catch (error) {
      console.error("Token validation failed:", error.message);
    }

    next(); // Always call next() to proceed
  };
}

module.exports = { checkForAuthenticationCookie };
