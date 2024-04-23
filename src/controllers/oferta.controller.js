const { Oferta } = require("../models/oferta");
const { Garage } = require("../models/garaje");
const {haversine} = require("../utils/haversine");
const getOferta = async (req, res) => {
    try {
        const oferta = await Oferta.find();
        res.json(oferta)
    } catch (error) {
        console.error("Error al obtener oferta", error);
        res.status(500).json({ error: 'Error interno del servidor' })

    }
}

const ofertaCercana = async (req, res) => {
    try {
      const { userId } = req.params;
  
      console.log('User ID:', userId);
  
      // Encuentra los garajes del usuario
      const garageUsuario = await Garage.find({ user: userId });
  
      if (garageUsuario.length === 0) {
        console.log('No se encontraron garajes para este usuario');
        return res.status(404).json({ mensaje: 'No se encontraron garajes para este usuario' });
      }
    
      // Encuentra todas las ofertas
      const ofertas = await Oferta.find();
  
      console.log('Ofertas encontradas:', ofertas.length);
  
      const radius = 500; // Radio en metros
      
      // Filtra las ofertas cercanas
      const ofertasCercanas = ofertas.filter((oferta) => {
        return garageUsuario.some((garage) => {
          const distancia = haversine(
            garage.latitud,
            garage.longitud,
            oferta.latitud,
            oferta.longitud
          );
          console.log(distancia);
          return distancia <= radius;
        });
      });
  
      console.log('Ofertas cercanas encontradas:', ofertasCercanas.length);
  
      res.json(ofertasCercanas);
      
    } catch (error) {
      console.error("Error al obtener ofertas cercanas:", error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

const createOferta = async (req, res) => {
    try {
        const { filtroAlquiler, monto, latitud, longitud } = req.body

        const newOferta = new Oferta({
            filtroAlquiler,
            monto,
            user: req.userId,
            latitud,
            longitud
        })

        const ofertaSave = await newOferta.save()

        res.status(201).json(ofertaSave)
    } catch (error) {
        console.error('Error al crear propuesta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
}

const getOfertaById = async (req, res) => {
    try {
        const oferta = await Oferta.findById(req.params.ofertaId);
        if (!oferta) {
            return res.status(404).json({ error: "No existe oferta" })
        }
        res.status(200).json(oferta);
    } catch (error) {
        console.error("Error al ver oferta", error);
        res.status(500).json({ error: "Error en el servidor" });

    }

}
const updateOferta = async (req, res) => {
    try {
        const updateOferta = await Oferta.findByIdAndUpdate(req.params.ofertaId, req.body, {
            new: true
        });
        res.status(200).json(updateOferta);

    } catch (error) {
        console.error("Error al actualizar oferta", error);
        res.status(500).json({ error: "Error en el servidor" })
    }
}

const deleteOferta = async (req, res) => {
    try {
        const { ofertaId } = req.params;
        const oferta = await Oferta.findByIdAndDelete(ofertaId);
        if (!oferta) {
            return res.status(404).json({ error: "No existe la oferta" });
        };
        res.status(200).json({ message: "Eliminado correctamente" });

    } catch (error) {
        console.error('Error al eliminar oferta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


module.exports = {
    getOferta,
    createOferta,
    getOfertaById,
    updateOferta,
    deleteOferta,
    ofertaCercana

}