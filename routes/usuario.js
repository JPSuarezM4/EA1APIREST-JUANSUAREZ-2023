const { Router } = require('express');
const { createUsuario, getUsuarios, updateUsuario } = require('../controllers/usuario');
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router();

// Crear usuario (ruta pública, no requiere verificación de token)
router.post('/', createUsuario);

// Editar usuario (requiere verificación de token)
router.put('/:id', verificarToken, verificarPermisoAdministrador, updateUsuario);

// Listar usuarios (requiere verificación de token)
router.get('/',  verificarToken, verificarPermisoAdministrador, getUsuarios);

module.exports = router;
