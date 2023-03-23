const { Router } = require('express')
const { createEstadoEquipo, getEstadoEquipos, updateEstadoEquipo } = require('../controllers/estadoEquipo')


const router = Router()


// crear
router.post('/', createEstadoEquipo)

// editar
router.put('/:id', updateEstadoEquipo)

// listar
router.get('/', getEstadoEquipos)




module.exports = router 