const TipoEquipo = require('../models/tipoEquipo')
const {request, response} = require('express')
const { db } = require('../models/tipoEquipo')

/**
 * Creacion
 */
const createTipoEquipo = async (req = request, res = response ) => {
    
    try{
        const nombre = req.body.nombre
        ? req.body.nombre.toUpperCase()
        : ''
        const tipoEquipoBD = await TipoEquipo.findOne({nombre})
        if(tipoEquipoBD){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre
        }
        const tipoEquipo = new TipoEquipo(data)
        //console.log(tipoEquipo)
        await tipoEquipo.save()
        return res.status(201).json(tipoEquipo)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }


}



/**
 * Actualización
 */
 const updateTipoEquipo = async (req = request, res = response ) => {
    
    try{
        const { id } = req.params
        const { estado, nombre } = req.body

        const tipoEquipo = await TipoEquipo.findById(id)

        if (!tipoEquipo) {
            return res.status(404).json({
                msg: 'Tipo de Equipo no encontrado'
            })
        }

        tipoEquipo.estado = estado
        tipoEquipo.nombre = nombre ? nombre.toUpperCase() : tipoEquipo.nombre
        tipoEquipo.fechaActualizacion = new Date()

        await tipoEquipo.save()

        return res.json(tipoEquipo)

    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


/**
 * Listar Todos
 */
 const getTipoEquipos = async (req = request,
    res = response) => {
    try{
        const { estado } = req.query;


        const tipoEquiposDB = await TipoEquipo.find({estado})
        //select * from tipoequipo where estado = ?;
        return res.json(tipoEquiposDB)
    }catch(e){
        return res.status(500).json({
            msg: e
        })
    }
}


module.exports = {createTipoEquipo, getTipoEquipos, updateTipoEquipo}
