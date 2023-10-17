const jwtMethods = {};

const jwt = require("jsonwebtoken");
const { TOKEN_PASS } = process.env;

jwtMethods.createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_PASS,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};


jwtMethods.verifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token)return res.status(401).json({ message: "Unathorized" });
  jwt.verify(token, TOKEN_PASS, (error, decoded) => {
    if (error)return res.status(401).json({ message: "Invalide Token" });

    req.user = decoded
    next();
  });

};

module.exports = jwtMethods;
