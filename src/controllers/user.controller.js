import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const createUser = (req, res) => {
  console.log("oe");
  console.log("el cuerpo", req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then(async (hashedPassword) => {
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      try {
        await user.save();
        console.log("todo melo");
        res.json(user)
      } catch (error) {
        console.error(error, "no se pudo guardar el usuario");
      }
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({
        message: "La Contraseña no se guardo adecuadamente",
        e,
      });
    });
};

const login = async (req, res) => {
  try {
    

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("email no encontrado");
      return res.status(404).json({ message: ["Email not found"] });
    }

    const passwordCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passwordCheck) {
      console.log("comparando");
      return res.status(400).send({
        message: ["Las contraseñas no cohinciden"],
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Successful",
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error,
    });
  }
};

export { login };

