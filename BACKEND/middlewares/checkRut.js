const User = require('../models/user');

const checkrut = async (req, res, next) => {
    const { rut } = req.cookies;
    User.findOne({rut},(err,user)=>{
        if(err){
            return res.status(400).send({message:'Error al buscar el usuario'})
        }
        if(!user){
            return res.status(404).send({message:'El Usaurio no existe'})
        }
        next();
    })
}

module.exports = checkrut;