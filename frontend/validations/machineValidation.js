import * as yup from 'yup';

const machineValidation = yup.object({
    name: yup.string()
        .required('Name is required')
        .matches(/^[aA-zZ\s]+$/, 'El nombre debe contener caracteres validos'),//nose si sea necesario ya que puede tener un numero la maquina
        machineType: yup.string()
        .required('machineType is required'),
    serial: yup.string()
        .required('serial is required'),
        status: yup.string()
        .required('status is required')
})

export default machineValidation;