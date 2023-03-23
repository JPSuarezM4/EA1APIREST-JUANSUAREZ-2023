const { Router } = require('express')
const { createUsuario, getUsuarios, updateUsuario } = require('../controllers/usuario')


const router = Router()


// crear
router.post('/', createUsuario)
// editar
router.put('/:id', updateUsuario)

// listar
router.get('/', getUsuarios)




module.exports = router 