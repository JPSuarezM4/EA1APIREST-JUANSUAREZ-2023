const { Router } = require('express')
const { createMarca, getMarcas, updateMarca } = require('../controllers/marca')
const { verificarToken } = require('../middlewares/autenticacion');
const { verificarPermisoAdministrador } = require('../middlewares/administrador');

const router = Router()


// crear
router.post('/',verificarToken, verificarPermisoAdministrador, createMarca)

// editar
router.put('/:id',verificarToken, verificarPermisoAdministrador, updateMarca)

// listar
router.get('/',verificarToken, verificarPermisoAdministrador, getMarcas)




module.exports = router 