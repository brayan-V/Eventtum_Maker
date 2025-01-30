import bcrypt from "bcryptjs"; // Para encriptar contraseñas
import jwt from "jsonwebtoken"; // Para generar tokens JWT
import User from "../models/user.model.js"; // Modelo de usuario
import { TOKEN_SECRET_KEY } from "../config.js"; // Clave secreta para JWT

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({ message: "Email already exists" });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({ username, email, password: hashedPassword });
    const userSaved = await newUser.save();

    // Generar un token JWT
    const token = jwt.sign({ id: userSaved._id }, TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Enviar el token como una cookie
    res.cookie("token");

    // Responder con los datos del usuario
    res.json({ message: "User created successfully", user: userSaved });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
};

// Función para iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por correo
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    // Generar un token JWT
    const token = jwt.sign({ id: userFound._id }, TOKEN_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Enviar el token como una cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    // Responder con los datos del usuario
    res.json({ message: "Login successful", user: userFound });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejar errores
  }
};
