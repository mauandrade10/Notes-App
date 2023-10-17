const { Router } = require("express");

const router = Router();
const {
  registerUser,
  logIn,
  logOut,
  start,
} = require("../controllers/user.controllers"); //desestructción

const { verifyToken } = require("../middlewares/jwt");

/* Peticiones GET en la raíz / */

router.post("/register", registerUser);

router.post("/logIn", logIn);

router.get("/logOut", logOut);

router.get("/start", verifyToken, start);


module.exports = router;
