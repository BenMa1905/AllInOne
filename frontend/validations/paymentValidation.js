import * as yup from 'yup';

const paymentValidation = yup.object({
    Fecha_de_pago: yup.date()
        .required('fecha requerida '),
    user: yup.string().when('selectedUser', {
        is: value => value !== 'seleccione usuario',
        then: yup.string().required('usuario requerido'),
    }),
    monto_pagado: yup.string()
        .required('monto requerido')
        .matches(/^[0-9999999999999999]+$/, 'El monto debe contener caracteres validos'),
    tipo_de_pago: yup.string()
        .required('tipo de pago requerido'),
})

export default paymentValidation;
