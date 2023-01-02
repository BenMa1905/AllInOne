//const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();

const auth = (req, res, next) => {
    console.log("HOLA  - - - - - -  - -" + req.headers.cookie)
    let cookies = req.headers.cookie;
    if (!cookies === undefined) {
        return res.status(401).send({ message: 'No autorizado' });
    }
    cookies = cookies.split('=')[1];
    console.log(cookies)
    try {
        const payload = jwt.decode(cookies, process.env.SECRET_KEY);
        console.log(payload)
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token expirado' });
        }
        req.body = JSON.stringify(payload);
        next()
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido' });
    }
}

module.exports = { auth };