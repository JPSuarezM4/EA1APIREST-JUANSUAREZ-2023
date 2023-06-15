const { Router } = require('express');
const { autenticarUsuario } = require('../middlewares/auth');

const router = Router();

// Ruta para autenticar un usuario
router.post('/', autenticarUsuario);

module.exports = router;
