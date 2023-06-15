const Usuario = require('../models/usuario');
const { request, response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Creación de usuario
 */
const createUsuario = async (req = request, res = response) => {
  try {
    const { nombre, email, contraseña, rol } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      contraseña: contraseñaEncriptada,
      rol,
    });

    

    // Generar el token de autenticación
    const token = jwt.sign(
      { usuario: nuevoUsuario._id },
      'secreto', // Reemplaza 'secreto' con tu propia clave secreta
      { expiresIn: '10h' }// Opcional: tiempo de expiración del token
      
    );
      console.log(token)

     // Asignar el token al usuario
     nuevoUsuario.token = token;

     await nuevoUsuario.save();
 
     return res.status(201).json({ usuario: nuevoUsuario, token });
   } catch (e) {
     return res.status(500).json({ msg: 'Error al crear el usuario' });
   }
 };


 /*
 * Actualización de usuario
 */
const updateUsuario = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { estado, email, nombre, rol, contraseña } = req.body;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', usuario);

    usuario.estado = estado;
    usuario.email = email ? email.toUpperCase() : usuario.email;
    usuario.nombre = nombre ? nombre.toUpperCase() : usuario.nombre;
    usuario.rol = rol !== undefined ? rol : usuario.rol;
    usuario.fechaActualizacion = new Date();

    // Actualizar la contraseña solo si se proporciona en la solicitud
    if (contraseña) {
      usuario.contraseña = contraseña;
    }
    await usuario.save();

    return res.json(usuario);
  } catch (e) {
    return res.status(500).json({ msg: 'Error al actualizar el usuario' });
  }
};



/**
 * Listar todos los usuarios
 */
const getUsuarios = async (req = request, res = response) => {
  try {
    const { estado } = req.query;

    const usuariosDB = await Usuario.find({ estado });

    return res.json(usuariosDB);
  } catch (e) {
    return res.status(500).json({ msg: 'Error al obtener los usuarios' });
  }
};

module.exports = { createUsuario, getUsuarios, updateUsuario };
