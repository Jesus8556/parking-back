const User = require("../models/user");

const getUser = async (req,res) =>{
    try{
        const user = await User.find();
        res.json(user);

    }catch(error){
        console.error("Error al obtener usuarios",error);
        res.status(500).json({error:'Error interno del servidor'});

    };
};
const getUserById = async(req,res) =>{
    try{
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    }catch(error){
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
  
    }
}

const updateUser = async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
            new: true
        })
        res.status(200).json(updateUser)
        
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    
}

const deleteUser = async(req,res) =>{
    try {
        const {userId} = req.params
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: "Eliminado correctamente" })

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

        
    }
}

module.exports = {
    getUser,
    getUserById,
    updateUser,
    deleteUser
}