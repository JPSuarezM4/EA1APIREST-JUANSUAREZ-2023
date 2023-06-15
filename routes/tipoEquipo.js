const { Router } = require('express')
const { createTipoEquipo, getTipoEquipos, updateTipoEquipo } = require('../controllers/tipoEquipo')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router()


// crear
router.post('/', verificarToken, verificarPermisoAdministrador, createTipoEquipo)

// editar
router.put('/:id', verificarToken, verificarPermisoAdministrador, updateTipoEquipo)

// listar
router.get('/',verificarToken, verificarPermisoAdministrador, getTipoEquipos)




module.exports = router 