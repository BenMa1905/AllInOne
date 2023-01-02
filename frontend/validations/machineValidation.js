import * as yup from 'yup';

const machineValidation = yup.object({
    name: yup.string()
        .required('nombre requerido')
        .matches(/^[aA-zZ\s]+$/, 'El nombre debe contener caracteres validos'),
        machineType: yup.string()
        .required('tipo de maquina requerida'),
    serial: yup.string()
        .required('serial requerido '),
        status: yup.string()
        .required('status requerido')
})

export default machineValidation;