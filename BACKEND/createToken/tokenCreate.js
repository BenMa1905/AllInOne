const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

const tokenCreate = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        role:user.role,
        iat: moment().unix(),
        exp: Math.floor(Date.now() / 1000) + 60,
    }
    //console.log(payload)
    return jwt.encode(payload, process.env.SECRET_KEY);
}

module.exports={tokenCreate}