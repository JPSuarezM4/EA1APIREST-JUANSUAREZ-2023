const { Router } = require('express')
const { createEstadoEquipo, getEstadoEquipos, updateEstadoEquipo } = require('../controllers/estadoEquipo')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router()


// crear
router.post('/',verificarToken, verificarPermisoAdministrador, createEstadoEquipo)

// editar
router.put('/:id',verificarToken, verificarPermisoAdministrador, updateEstadoEquipo)

// listar
router.get('/',verificarToken, verificarPermisoAdministrador, getEstadoEquipos)




module.exports = router 