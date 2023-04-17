const Usuario = require('../models/usuario')
const {request, response} = require('express')
const { db } = require('../models/usuario')

/**
 * Creacion
 */
 const createUsuario = async (req = request, res = response ) => {
    
    try{
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const email = req.body.email
        ? req.body.email.toUpperCase()
        : ''
        const usuarioBD = await Usuario.findOne({nombre})
        if(usuarioBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre,
            email
        }
        const usuario = new Usuario(data)
        //console.log(usuario)
        await usuario.save()
        return res.status(201).json(usuario)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}




/**
 * Actualización
 */
 const updateUsuario = async (req = request, res = response ) => {
    
    try{
        const { id } = req.params
        const { estado, email, nombre } = req.body

        const usuario = await Usuario.findById(id)

        if (!usuario) {
            return res.status(404).json({
                msg: 'usuario no encontrado'
            })
        }

        usuario.estado = estado
        usuario.email = email ? email.toUpperCase(): usuario.email
        usuario.nombre = nombre ? nombre.toUpperCase() : usuario.nombre
        usuario.fechaActualizacion = new Date()
      
        await usuario.save()

        return res.json(usuario)

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


/**
 * Listar Todos
 */
 const getUsuarios = async (req = request,
    res = response) => {
    try{
        const { estado } = req.query;


        const usuariosDB = await Usuario.find({estado})
        //select * from usuario where estado = ?;
        return res.json(usuariosDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


module.exports = {createUsuario, getUsuarios, updateUsuario}
