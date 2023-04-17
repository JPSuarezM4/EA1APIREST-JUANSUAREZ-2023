const { Router } = require('express')
const { createInventario, getInventarios, updateInventarioByID} =
 require('../controllers/inventario')

const router = Router()

// crear
router.post('/', createInventario)

// consultar todos
router.get('/', getInventarios)

// editar inventario
router.get('/', updateInventarioByID)

module.exports = router;