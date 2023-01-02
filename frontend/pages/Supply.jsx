import { useState, useEffect } from 'react'
import { useToast, IconButton, Stack, Button, Container, Input, Text, Heading, Table, Thead, Tbody, FormControl, FormLabel, Tfoot, Tr, Th, Td, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import axios from 'axios'
import { AddIcon, EditIcon, InfoIcon, DeleteIcon } from '@chakra-ui/icons'
import Router, { useRouter } from 'next/router'
import SideNavigationBar from '../components/SideNavigationBar'


const Supplies = (viewportSize) => {

    const [values, setValues] = useState({
        name: '',
        price: '',
        quantity: '',
        description: ''
    })

    const toast = useToast()

    const router = useRouter()

    const [suministro, setSuministro] = useState([])


    const getSupply = async () => {
        const response = await axios.get(`${process.env.API_URL}/supplys`)
        setSuministro(response.data)
    }
    useEffect(() => {
        getSupply()
    }, [])


    const showSupply = () => {
        return suministro.map(supply => {
            return (
                <Tr key={supply._id}>
                    <Td>{supply.name}</Td>
                    <Td>$ {supply.price.toLocaleString()}</Td>
                    <Td>{supply.quantity.toLocaleString()}</Td>
                    <Td>{supply.description}</Td>
                    <Td display={'flex'} justifyContent="space-evenly"><IconButton aria-label='Search database' onClick={() => router.push(`/supply/${supply._id}`)} icon={<EditIcon />} /><IconButton aria-label='Search database' icon={<DeleteIcon />} onClick={() => onDelete(supply._id)} /></Td>
                </Tr>
            )
        })
    }
    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const onDelete = async (e) => {
        const response = await axios.delete(`${process.env.API_URL}/supply/delete/${e}`)
        if (response.status == 200) {
            toast({
                title: 'Suministro eliminado.',
                description: "El suministro se eliminó con éxito.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            // setTimeout(() => {
            window.location.reload()
            // }, 1500)
        } else {
            toast({
                title: 'Error al eliminar suministro.',
                description: "El suministro no se pudo eliminar.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault()
        if (values.name == '' || values.price == '' || values.quantity == '' || values.description == '') {
            toast({
                title: 'Error: Todos los campos son obligatorios.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            return false;
        }
        else {
            try {
                const response = await axios.post(`${process.env.API_URL}/supply`, values)
                if (response.status == 201) {
                    toast({
                        title: 'Suministro registrado.',
                        description: "El suministro se registro con éxito.",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })
                    // setTimeout(() => {
                    window.location.reload()
                    // }, 1500)
                } else {
                    toast({
                        title: 'Error al registrar suministro.',
                        description: "El suministro no se pudo crear.",
                        status: 'error',
                        duration: 4000,
                        isClosable: true,
                    })
                }
                console.log(response.data.name)
            }
            catch (err) {
                console.log(err)
                toast({
                    title: 'Error al registrar suministro.',
                    description: "El suministro no se pudo crear.",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                })
            }
        }
    }



    return (
        <>
            <SideNavigationBar {...viewportSize} />
            <Container minH='92vh' minW='74vw' maxW='74vw' bg='whiteAlpha.800' overflow='hidden'>
                <Heading textAlign={'center'}  padding={'10'}>Suministros</Heading>
                <Table bg="skyblue" mb='10px' rounded={"xl"} >
                    <Thead>
                        <Tr>
                            <Td width={"350px"}>Nombre</Td>
                            <Td width={"200px"}>Precio</Td>
                            <Td width={"150px"}>Cantidad</Td>
                            <Td >Descripcion</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {showSupply()}
                        <Tr>
                            <Td width={"350px"}>
                                <FormControl>
                                    <Input  onChange={onChange} placeholder="*Nombre" type={"text"} name={"name"} />
                                </FormControl>
                            </Td>
                            <Td width={"200px"}>
                                <FormControl>
                                    <Input onChange={onChange} placeholder="*Precio" type={"number"} min={"0"} name={"price"} />
                                </FormControl>
                            </Td>
                            <Td width={"150px"}>
                                <FormControl >
                                    <Input onChange={onChange} placeholder="*Cantidad" type={"number"} min={"0"} name={"quantity"} />
                                </FormControl>
                            </Td>
                            <Td>
                                <FormControl>
                                    <Input onChange={onChange} placeholder="*Descripción" type={"text"} name={"description"} />
                                </FormControl>
                            </Td>
                            <Td display={'flex'} justifyContent="space-evenly" >
                                <IconButton aria-label='Search database' bg={"brand.500"} icon={<AddIcon />} onClick={onSubmit} />
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
                <Text color={'gray.800'} fontFamily={'inherit'} fontWeight={'light'} >*requerido</Text>
            </Container>
        </>
    )
}

export default Supplies