const User = require('../models/user');
const Membership = require('../models/membership');
const {tokenCreate} = require('../createToken/tokenCreate');

const createUser = async (req, res) => {
    const { name, rut, email,birthdate, address, telephone, role} = req.body

    const newMembership = new Membership({
        state : "unpaid",
        remainingHours : 12,
        totalDebt : 0
    })
    const membership = newMembership._id;
    const newUser = new User({ name, rut, email,birthdate, address, telephone, role, membership });

    newMembership.save((error, mMembership) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido crear la membresia" })
        }

        newUser.save((err, user) => {
            if (err) {
                mMembership.deleteOne()
                return res.status(400).send({ message: 'Error al crear el usuario' + err });
            }
            return res.status(201).send(user);
        })
    })
}

const login = async (req, res) => {
    const {rut} = req.body
    // console.log(req.body)
    // let rut = req.body.rut
    // rut = rut.toLowerCase();
    User.findOne({ rut }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al iniciar sesión' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        res.cookie("token", tokenCreate(user), { httpOnly: true })
        return res.status(200).send({ message: 'Se ha logeado correctamente', token: tokenCreate(user), user: user.name });
    })
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(400).send({ message: 'Error al cerrar sesión' });
        }
        return res.status(200).send({ message: 'Sesión cerrada' });
    })
}

const verifyToken = (req, res) => {
    return res.status(200).send({ message: 'Token válido', payload: req.body });
}


const getUsers = async (req, res) => {
    User.find({}).populate({ path: 'membership'}).exec((err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener los usuarios' });
        }
        return res.status(200).send(user);
    })
}

const getUser = (req, res) => {
    const { id } = req.params;
    User.findById(id).populate({ path: 'membership'}).exec((err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al obtener el usuario' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        return res.status(200).send(user);
    })
}

const getRutUser = (req, res) => {
    const { rut } = req.params;
    User.find({ rut: rut }, (error, user) => {
        if (error) {
            return res
                .status(400)
                .send({ message: "Rut del usuario no encontrado" });
        }
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        return res.status(200).send(user);
    });
};

const getNameUser = (req, res) => {

    const { id } = req.params
    User.findById(id, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se ha logrado mostrar al usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se encontró el usuario" })
        }
        return res.status(200).send(user)
    })
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al actualizar el usuario' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        return res.status(200).send(user);
    })
}

const deleteUser = (req, res) => {
    const { id } = req.params
    User.findByIdAndDelete(id, (error, user) => {
        if (error) {
            return res.status(400).send({ message: "No se ha podido eliminar el usuario" })
        }
        if (!user) {
            return res.status(404).send({ message: "No se ha podido encontrar el usuario" })
        }
        return res.status(200).send({ message: "Se ha eliminado el usuario de forma correcta" })
    })
}

const updateImgUser = async (req, res) => {
    const { id } = req.params;
    User.findOneAndUpdate(id, { profileImg: req.file.path }, (err, user) => {
        if (err) {
            return res.status(400).send({ message: 'Error al actualizar la imagen de perfil' });
        }
        if (!user) {
            return res.status(404).send({ message: 'No se encontró el usuario' });
        }
        return res.status(200).send(user);
    })
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    getNameUser,
    getRutUser,
    updateUser,
    deleteUser,
    updateImgUser,
    login,
    logout,
    verifyToken
}
