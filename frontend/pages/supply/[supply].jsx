import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useToast, FormControl, FormErrorMessage, FormHelperText, IconButton, Stack, Button, Container, Input, Text, Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Box, getDividerStyles, HStack, FormLabel, Textarea, Flex } from '@chakra-ui/react'
import SideNavigationBar from '../../components/SideNavigationBar'
import { getSupply } from '../../data/supply'

export async function getServerSideProps(context) {
    try {
        const response = await getSupply(context.query.supply)
        return {
            props: {
                data: response.data
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/Supply',
                permanent: true
            }
        }
    }
}


const supply = ({ data }) => {
    const router = useRouter()
    const { supply } = router.query

    const [suministro] = useState(data)

    const [contador, setContador] = useState(1)
    const [input, setInput] = useState('')
    const isError = input === ''
    const [values, setValues] = useState({
        name: '',
        price: '',
        quantity: '',
        description: ''
    })

    const toast = useToast()

    const onEdit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${process.env.API_URL}/supply/update/${data._id}`, values)
            if (response.status == 200) {
                toast({
                    title: 'Cambios guardados.',
                    description: "El suministro se registro con éxito.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                router.push('/Supply')
            } else {
                toast({
                    title: 'Error al editar suministro.',
                    description: "El suministro no se pudo editar.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }

        }
        catch (err) {
            console.log(err)
            toast({
                title: 'Error al editar suministro.',
                description: "El suministro no se pudo editar.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    const onBack = async (e) => {
        router.push('/Supply')
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    return (

        <>
            <SideNavigationBar></SideNavigationBar>
            <Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin="7.5rem auto">
                <Heading textAlign={'center'} >Editar suministro</Heading>
                <HStack>
                </HStack>
                <FormLabel>Nombre</FormLabel>
                <FormControl borderRadius={"1rem"} bg={'white'}>
                    <Input type="text" size={'lg'} placeholder={suministro.name} name="name" onChange={onChange} />

                </FormControl>
                <FormLabel>Precio</FormLabel>
                <FormControl borderRadius={"1rem"} bg={'white'}>
                    <Input type="text" placeholder={suministro.price} name="price" onChange={onChange} />
                </FormControl>
                <FormLabel>Cantidad</FormLabel>
                <FormControl borderRadius={"1rem"} bg={'white'}>
                    <Input type="text" placeholder={suministro.quantity} name="quantity" onChange={onChange} />
                </FormControl>
                <FormLabel>Descripción</FormLabel>
                <Textarea placeholder={suministro.description} name="description" onChange={onChange} />
                <Container>
                    <Flex justifyContent={"space-around"}>
                        <Button colorScheme={"teal"} size={"md"} type={"submit"} my={"5"} onClick={onEdit}>Guardar cambios</Button>
                        <Button colorScheme={"red"} size={"md"} type={"submit"} my={"5"} onClick={onBack}>Volver</Button>
                    </Flex>
                </Container>
            </Container>

        </>
    )
}

export default supply