import * as yup from 'yup';

const paymentValidation = yup.object({
    Fecha_de_pago: yup.date()
        .required('fecha requerida '),
        user: yup.string()
        .required('usuario requerido'),
    monto_pagado: yup.string()
        .required('monto requerido')
        .matches(/^[0-9999999999999999]+$/, 'El monto debe contener caracteres validos'),
        tipo_de_pago: yup.string()
        .required('tipo de pago requerido'),
})

export default paymentValidation;

// falta cambiarlo a registro
// Fecha_de_pago: '',
// user: '',
// monto_pagado: '',
// tipo_de_pago: '',
// .matches(/^[aaaa-dd-mm]+$/, 'debe contener fecha valida'),