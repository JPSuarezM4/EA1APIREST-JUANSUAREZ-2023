const { Router } = require('express')
const { createTipoEquipo, getTipoEquipos, updateTipoEquipo } = require('../controllers/tipoEquipo')


const router = Router()


// crear
router.post('/', createTipoEquipo)

// editar
router.put('/:id', updateTipoEquipo)

// listar
router.get('/', getTipoEquipos)




module.exports = router 