const { Garage } = require("../models/garaje");
const { uploadImage, deleteImage } = require("../utils/cloudinary")
const fs = require("fs-extra");

const createGarage = async (req, res) => {
    try {
        const { address, description, isAvailable, pricePerHour, latitud, longitud } = req.body


        const garage = new Garage({
            address,
            description,
            isAvailable,
            pricePerHour,
            latitud,
            user: req.userId,
            longitud,
        });
        if (req.files?.imagen) {
            const result = await uploadImage(req.files.imagen.tempFilePath);
            garage.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            await fs.unlink(req.files.imagen.tempFilePath)
        } else {
            console.log("No hay imagen");
        }

        const garageSave = await garage.save()
        res.status(201).json(garageSave)

    } catch (error) {
        console.error('Error al crear garage:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
}
const getAllGarage = async (req, res) => {
    try {
        const garage = await Garage.find()
        res.json(garage)
    } catch (error) {
        console.error('Error al obtener todos los garages:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const getGarage = async (req, res) => {
    try {
        const garage = await Garage.find({ user: req.userId })
        console.log(req.userId)
        res.json(garage)


    } catch (error) {
        console.error('Error al obtener garages:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}


const getGarageById = async (req, res) => {
    try {
        const garage = await Garage.findById(req.params.garageId)
        if (!garage) {
            return res.status(404).json({ error: 'Garage no encontrado' });
        }
        
        res.status(200).json(garage)

    } catch (error) {
        console.error('Error al obtener garage:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}

const updateGarage = async (req, res) => {
    try {
        const garageId = req.params.garageId;
        const garage = req.body;
        if(req.files?.imagen){
            const busqueda = await Garage.findById(garageId);
            console.log(busqueda.imagen)

            if(busqueda.imagen?.public_id){
                await deleteImage(busqueda.imagen.public_id);
            }
            const result = await uploadImage(req.files.imagen.tempFilePath);
            garage.imagen = {
                public_id:result.public_id,
                secure_url:result.secure_url
            };
            await fs.unlink(req.files.imagen.tempFilePath)
        }
        const updateGarage = await Garage.findByIdAndUpdate(req.params.garageId, garage, {
            new: true
        });
        res.status(200).json(updateGarage)

    } catch (error) {
        console.error('Error al actualizar garage:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
    
}

const deleteGarage = async (req, res) => {
    try {
        const { garageId } = req.params
        const garage = await Garage.findByIdAndDelete(garageId)
        if (!garage) {
            return res.status(404).json({ error: 'Garage no encontrado' });
        }
        if (garage.imagen?.public_id) {
            await deleteImage(garage.imagen.public_id);

        }

        res.status(200).json({ message: "Eliminado correctamente" })

    } catch (error) {
        console.error('Error al eliminar garage:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }

}



module.exports = {
    createGarage,
    getGarage,
    getGarageById,
    updateGarage,
    deleteGarage,
    getAllGarage
}
