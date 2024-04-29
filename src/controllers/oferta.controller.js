const { Oferta } = require("../models/oferta");
const { Garage } = require("../models/garaje");
const User  = require("../models/user");

const { haversine } = require("../utils/haversine");
const { obtenerSocket } = require("../sockets")

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

        // Encuentra los garajes del usuario
        const garajesUsuario = await Garage.find({ user: userId });

        if (garajesUsuario.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron garajes para este usuario' });
        }

        // Encuentra todas las ofertas no ignoradas por el usuario
        const ofertas = await Oferta.find({ ignoredBy: { $nin: [userId] } });

        const radius = 500; // Radio en metros

        // Filtra las ofertas cercanas
        const ofertasCercanas = ofertas.filter((oferta) => {
            return garajesUsuario.some((garage) => {
                const distancia = haversine(
                    garage.latitud,
                    garage.longitud,
                    oferta.latitud,
                    oferta.longitud
                );
                return distancia <= radius;
            });
        });

        // Incluye información de garajes cercanos en las ofertas
        const ofertasConGarajesCercanos = ofertasCercanas.map((oferta) => {
            const garajesCercanos = garajesUsuario.filter((garage) => {
                const distancia = haversine(
                    garage.latitud,
                    garage.longitud,
                    oferta.latitud,
                    oferta.longitud
                );
                return distancia <= radius;
            });

            return {
                ...oferta.toObject(),
                garajesCercanos: garajesCercanos.map((garage) => ({
                    id: garage._id.toString(),
                    address: garage.address,
                    latitud: garage.latitud,
                    longitud: garage.longitud,
                })),
            };
        });

        res.json(ofertasConGarajesCercanos);

    } catch (error) {
        console.error("Error al obtener ofertas cercanas:", error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const createOferta = async (req, res) => {
    try {
        const io = obtenerSocket()
        const { filtroAlquiler, monto,hora, latitud, longitud } = req.body

        const newOferta = new Oferta({
            filtroAlquiler,
            monto,
            user: req.userId,
            name: req.userName,
            latitud,
            longitud,
            hora
        })

        const ofertaSave = await newOferta.save();
        io.emit("nueva_oferta", ofertaSave);


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
        const io = obtenerSocket();

        io.emit("oferta_eliminada",{ofertaId});

    } catch (error) {
        console.error('Error al eliminar oferta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const ignorarOferta = async (req, res) => {
    try {
        const { ofertaId } = req.params;
        const userId = req.userId;
        console.log(ofertaId)

        const oferta = await Oferta.findById(ofertaId);

        if (!oferta) {
            return res.status(404).json({ message: 'Oferta no encontrada' });
        }

        // Agregar la oferta a la lista de ofertas ignoradas si no está ya presente
        if (!oferta.ignoredBy.includes(userId)) {
            oferta.ignoredBy.push(userId);
            await oferta.save();
        }

        res.status(200).json({ message: 'Oferta ignorada con éxito' });
    } catch (error) {
        console.error('Error al ignorar la oferta:', error);
        res.status(500).json({ message: 'Error al ignorar la oferta' });
    }
}




module.exports = {
    getOferta,
    createOferta,
    getOfertaById,
    updateOferta,
    deleteOferta,
    ofertaCercana,
    ignorarOferta

}