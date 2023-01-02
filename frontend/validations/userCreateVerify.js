import * as yup from 'yup';
const userCreateVerify = yup.object({
    name: yup.string()
        .required('nombre requerida ')
        .matches(/^[aA-zZ\s]+$/, 'El nombre debe contener caracteres validos'),
    rut: yup.string()
        .required('rut requerido')
        .matches(/^[0-9]+-[0-9kK]+$/, 'El rut debe contener formato 12345678-k validos'),
    email: yup.string()
        .required('email requerido')
        .email('Debe contener un email valido'),
    birthdate: yup.date()
        .required('fecha de nacimiento requerida'),
    address: yup.string()
        .required('direccion requerida')
        .matches(/^[aA-zZ\s]+$/, 'La direccion debe contener caracteres validos'),
    telephone: yup.string()
        .required('telefono requerido')
        .matches(/^[0-999999999]+$/, 'Debe contener numeros validos'),
    role: yup.string()
        .required('rol requerido')
        .matches(/^[aA-zZ\s]+$/, 'El rol debe contener caracteres validos'),
})

export default userCreateVerify;