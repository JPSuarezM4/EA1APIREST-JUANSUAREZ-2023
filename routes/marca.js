const { Router } = require('express')
const { createMarca, getMarcas, updateMarca } = require('../controllers/marca')


const router = Router()


// crear
router.post('/', createMarca)

// editar
router.put('/:id', updateMarca)

// listar
router.get('/', getMarcas)




module.exports = router 