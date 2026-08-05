const jwt = require ("jsonwebtoken");

function verifyToken(req, res, next){
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("authmiddleware: no token provided on request to", req.originalUrl);
        return res.status(401).json({ error: "No token provided"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("authmiddleware: token verify failed", err && err.message);
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.userId = decoded.id;
    console.log(`authmiddleware: token verified for user ${req.userId}`);
    next();
  });
}

module.exports = verifyToken;