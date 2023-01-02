import axios from 'axios'

const getpaymentrecord=async(id)=> {
    const response =await axios.get(`${process.env.API_URL}/paymentrecord/${id}`);
    //console.log(response)
    return response
}
const createpaymentrecord = async (paymentrecord) => {
    const response = await axios.post(`${process.env.API_URL}/paymentrecord`, {
        Fecha_de_pago: paymentrecord.Fecha_de_pago,
        user: paymentrecord.user,
        monto_pagado: paymentrecord.monto_pagado,
        tipo_de_pago: paymentrecord.tipo_de_pago,
    });
    return response
}
const getpaymentrecordsuser=async(id)=> {
    const response =await axios.get(`${process.env.API_URL}/paymentrecord/user/${id}`);
    //console.log(response)
    return response
}
module.exports = {
    getpaymentrecord,
    createpaymentrecord,
    getpaymentrecordsuser
}
