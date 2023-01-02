import * as yup from 'yup';
const userEditclVerify = yup.object({
    email: yup.string()
        .required('email requerido')
        .email('Debe contener un email valido'),
    address: yup.string()
        .required('direccion requerida')
        .matches(/^[aA-zZ\s]+$/, 'La direccion debe contener caracteres validos'),
    telephone: yup.string()
        .required('telefono requerido')
        .matches(/^[0-999999999]+$/, 'Debe contener numeros validos'),
})

export default userEditclVerify;