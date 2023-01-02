import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useToast, FormControl, FormErrorMessage, FormHelperText, IconButton, Stack, Button, Container, Input, Text, Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Box, getDividerStyles, HStack, FormLabel, Textarea, Flex } from '@chakra-ui/react'
import SideNavigationBar from '../../../components/SideNavigationBar'
import { getMachines } from '../../../data/machines'
import Swal from 'sweetalert2'
import { Formik } from 'formik'
import FormInput from '../../../components/FormInput'
import machineValidation from '../../../validations/machineValidation'
import FormikError from '../../../components/FormikError'
import { Select } from '@chakra-ui/react'

export async function getServerSideProps(context) {
    try {
        const response = await getMachines(context.query.maquina)
        return {
            props: {
                data: response.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/maquinaria',
                permanent: true
            }
        }
    }
}
const Maquina = ({ data },viewportSize) => {
    const router = useRouter()
    const [values, setValues] = useState({
        name: data.name,
        machineType: data.machineType,
        serial: data.serial,
        status: data.status,
    })
    const onSubmit = async (values) => {
        try {
            const response = await axios.put(`${process.env.API_URL}/machine/update/${data._id}`, values)
            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'maquina Modificada',
                    text: 'la maquina se modifico!',
                }).then(() => {
                    router.push('/maquinaria')
                })
            } else {
                Swal.fire({
                    icon: 'error ',
                    title: 'maquina no modificada',
                    text: 'la maquina no se modifico!',
                })
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
            })
        }
    }
    return (
        <>
            <SideNavigationBar {...viewportSize}/>
            <Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto">
                <Formik
                    initialValues={values}
                    validationSchema={machineValidation}
                    onSubmit={onSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Stack>
                                <FormInput onChange={handleChange} placeholder="Nombre" label="Nombre" type={"text"} name={"name"} onBlur={handleBlur} value={values.name} />
                                {touched.name && errors.name && <FormikError error={errors.name} />}
                                <FormLabel>Tipo de maquina</FormLabel>
                                <Select onChange={handleChange} placeholder='Tipo de maquina' name={"machineType"} onBlur={handleBlur} value={values.machineType}>
                                    <option value='washingMachine'>Lavadora </option>
                                    <option value='dryingMachine'>Secadora</option>
                                </Select>
                                {touched.machineType && errors.machineType && <FormikError error={errors.machineType} />}
                                <FormInput onChange={handleChange} placeholder="serial" label="serial" type={"text"} name={"serial"} onBlur={handleBlur} value={values.serial} />
                                {touched.serial && errors.serial && <FormikError error={errors.serial} />}
                                <FormLabel>tipo de status</FormLabel>
                                <Select onChange={handleChange} placeholder='Seleccione el tipo de status' name={"status"} onBlur={handleBlur} value={values.status}>
                                    <option value='Activa'>Activa </option>
                                    <option value='Inactiva'>Inactiva</option>
                                </Select>
                                {touched.status && errors.status && <FormikError error={errors.status} />}
                            </Stack>
                            <HStack>
                                <Button colorScheme="blue" size="md" type="submit" my={5} onClick={handleSubmit}> Editar maquina </Button>
                                <Button colorScheme="blue" onClick={() => router.push('/maquinaria')}>volver</Button>
                            </HStack>
                        </form>
                    )}
                </Formik>
            </Container>
        </>
    )
}
export default Maquina