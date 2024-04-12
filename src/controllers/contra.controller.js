const {contraOferta} = require("../models/contraoferta");


const getOferta = async (req,res) =>{
    try {
        const oferta = await contraOferta.find();
        res.json(oferta)
    } catch (error) {
        console.error("Error al obtener contraoferta",error);
        res.status(500).json({error:'Error interno del servidor'})
        
    }
}

const createOferta = async (req,res) => {
    try {
        const { monto } = req.body

        const newOferta = new contraOferta({
            
            monto,
            user:req.userId,
            oferta:req.params.ofertaId
        })

        const ofertaSave = await newOferta.save()

        res.status(201).json(ofertaSave)
    } catch (error) {
        console.error('Error al crear propuesta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
   
    }
}

const getOfertaById = async(req,res) => {
    try {
        const oferta = await contraOferta.findById(req.params.ofertaId);
        if(!oferta){
            return res.status(404).json({error:"No existe oferta"})
        }
        res.status(200).json(oferta);
    } catch (error) {
        console.error("Error al ver oferta",error);
        res.status(500).json({error:"Error en el servidor"});
        
    }

}
const updateOferta = async(req,res) => {
    try {
        const updateOferta = await contraOferta.findByIdAndUpdate(req.params.ofertaId, req.body, {
            new: true
        });
        res.status(200).json(updateOferta);
        
    } catch (error) {
        console.error("Error al actualizar oferta",error);
        res.status(500).json({error:"Error en el servidor"})     
    }   
}

const deleteOferta = async(req,res) => {
    try {
        const {ofertaId} = req.params;
        const oferta = await contraOferta.findByIdAndDelete(ofertaId);
        if (!oferta){
            return res.status(404).json({error:"No existe la oferta"});
        };
        res.status(200).json({message:"Eliminado correctamente"});

    } catch (error) {
        console.error('Error al eliminar oferta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getOferta,
    getOfertaById,
    createOferta,
    updateOferta,
    deleteOferta
}