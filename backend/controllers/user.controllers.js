const userController = {};

const register = require("../models/Register");

const bcrypt = require("bcryptjs");

const { createToken } = require("../middlewares/jwt");

userController.registerUser = async (req, res) => {
  try {
    const { nombres, apellidoP, apellidoM, password, email, username } =
      req.body;

        const verifyEmail = await register.findOne({ email: email });
        console.log(verifyEmail);
    
        if (verifyEmail !== null) {
          return res.status(400).json({message: `El email ${verifyEmail.email} ya esta asociado a una cuenta`})
        }

    const verifyUsername = await register.findOne({ username: username });
    console.log(verifyUsername);

    if (verifyUsername !== null) {
       return res.status(400).json({message: `El usuario ${verifyUsername.username} ya existe`})
    }



    const passwordHash = await bcrypt.hash(password, 10);

    const user = new register({
      username,
      nombres,
      apellidos: `${apellidoP} ${apellidoM}`,
      password: passwordHash,
      email,
    });

    const newUser = await user.save();
    console.log("usuario creado!");
    const token = await createToken({ id: user._id });
    console.log(token);
    res.cookie("token", token);

    res.status(200).json({ message: "Registro Exitoso." });
  } catch (error) {
    res.json({
      message: "nombre nooo" + error,
    });
    console.error(error);
  }
};

userController.logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const verifyUser = await register.findOne({ username: username });


    if (!verifyUser) return res.status(400).json({ message: "Credenciales Incorrectas" });
    const passwordVerify = await bcrypt.compare(password, verifyUser.password);
    if (!passwordVerify)
      return res.status(400).json({ message: "Credenciales Incorrectas" });

    const token = await createToken({ id: verifyUser._id });

    res.status(200).json({
      message: "todo perfecto mi compa",
      "username":verifyUser.username,
      "token":token
    });

  } catch (error) {
    res.json({
      message: "nombre nooo" + error,
    });
    console.error(error);
  }
};

userController.logOut = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};




userController.start = async (req, res) => {
  const userFound= await register.findById(req.user.id)
  if(!userFound) return res.status(400).json({message:"user not found"});

  return res.json({
    id: userFound.id,
    username: userFound.username,
  })
};

module.exports = userController;
