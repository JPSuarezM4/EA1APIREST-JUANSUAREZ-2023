const { Router } = require('express')
const { createInventario, getInventarios, updateInventarioByID} = require('../controllers/inventario')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');
const { verificarRolDocente } = require('../middlewares/docente');

const router = Router()

// crear
router.post('/',verificarToken, verificarPermisoAdministrador, createInventario)

// consultar todos
router.get('/',verificarToken,verificarPermisoAdministrador, getInventarios)

// editar inventario
router.get('/',verificarToken, verificarPermisoAdministrador, updateInventarioByID)

module.exports = router;