const { Schema, model } = require("mongoose");

const RegisterSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = model("Register", RegisterSchema);
