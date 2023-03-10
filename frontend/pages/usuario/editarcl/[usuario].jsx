import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useToast, FormControl, Button, Container, Heading, HStack, FormLabel, Flex } from '@chakra-ui/react'
import SideNavigationBar from '../../../components/SideNavigationBar'
import { getUser, updateUser } from '../../../data/user'
import FormikError from '../../../components/FormikError'
import FormInput from '../../../components/FormInput'
import { Form, Formik } from 'formik'
import userEditclVerify from '../../../validations/userEditclVerify'


export async function getServerSideProps(context) {
    try {
        const response = await getUser(context.query.usuario)
        return {
            props: {
                data: response.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/usuarios',
                permanent: true
            }
        }
    }
}

// useEffect(() => {
//     var url = window.location.toString();
//     var clean_url = url.substring(0, url.lastIndexOf('/'));
//     window.history.replaceState({},document.title, clean_url);
//     console.log(url)
//     getUser();
// }, [])

const Usuario = ({ data }) => {

    useEffect(() => {
    }, [])

    const router = useRouter()

    const [user] = useState(data)

    const [values, setValues] = useState({
        email: user.email,
        address: user.address,
        telephone: user.telephone,
    })

    const onSubmit = async (values) => {
        try {
            const response = await axios.put(`${process.env.API_URL}/user/update/${user._id}`, values)
            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario fue modificado',
                    text: 'Usuario modificado',
                }).then(() => {
                    router.push('/usuarios')
                })
            } else {
                Swal.fire({
                    icon: 'error ',
                    title: 'Usuario no se logro modificado',
                    text: 'Usuario no se logro modificado!',
                })
            }
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo sali?? mal!',
            })
        }
    }
    return (
        <>
            <SideNavigationBar></SideNavigationBar>
            <Container minH='92vh' minW='74vw' maxW='74vw' bg='whiteAlpha.800' overflow='hidden'>
                <Heading textAlign={'center'} fontFamily={'inherit'} fontWeight={'light'} >Editar usuario</Heading>
                <HStack>
                </HStack>
                <Formik
                    initialValues={values}
                    validationSchema={userEditclVerify}
                    onSubmit={onSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <form onSubmit={onSubmit}>
                            <FormLabel fontFamily={'inherit'} fontWeight={'light'}>Correo</FormLabel>
                            <FormControl borderRadius={"1rem"} bg={'white'}>
                                <FormInput type="text" placeholder={user.email} name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                {touched.email && errors.email && <FormikError error={errors.email} />}
                            </FormControl>
                            <FormLabel fontFamily={'inherit'} fontWeight={'light'}>Direccion</FormLabel>
                            <FormControl borderRadius={"1rem"} bg={'white'}>
                                <FormInput type="text" placeholder={user.address} name="address" onChange={handleChange} onBlur={handleBlur} value={values.address} />
                                {touched.address && errors.address && <FormikError error={errors.address} />}
                            </FormControl>
                            <FormLabel fontFamily={'inherit'} fontWeight={'light'}>Telefono</FormLabel>
                            <FormControl borderRadius={"1rem"} bg={'white'}>
                                <FormInput type="text" placeholder={user.telephone} name="telephone" onChange={handleChange} onBlur={handleBlur} value={values.telephone} />
                                {touched.telephone && errors.telephone && <FormikError error={errors.telephone} />}
                            </FormControl>
                            <Flex justifyContent={"space-around"}>
                                <Button colorScheme={"teal"} size={"md"} type={"submit"} my={"5"} onClick={handleSubmit}>Guardar cambios</Button>
                                <Button colorScheme={"red"} size={"md"} type={"submit"} my={"5"} onClick={() => router.push('/usuarios')}>Volver</Button>
                            </Flex>
                        </form>
                    )}
                </Formik>
            </Container>
        </>
    )
}

export default Usuario