const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const autenticarUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  console.log('Contraseña ingresada:', contraseña);

  try {
    // Buscar al usuario por su correo electrónico
    const usuario = await Usuario.findOne({ email });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({ msg: 'Correo electrónico o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Correo electrónico o contraseña incorrectos' });
    }

    // Devolver el token existente
    const token = usuario.token;
    return res.status(200).json({ usuario, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Error en el servidor' });
  }
};

module.exports = { autenticarUsuario };
