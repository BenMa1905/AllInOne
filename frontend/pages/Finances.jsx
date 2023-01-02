import { useState, useEffect, use } from 'react'
import { useToast, FormControl, IconButton, Stack, Button, Container, Input, Text, Heading, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AddIcon, EditIcon, InfoIcon } from '@chakra-ui/icons'
import SideNavigationBar from '../components/SideNavigationBar'

export default function Finances(viewportSize) {
    const [libro, setLibro] = useState([])

    const toast = useToast()


    const [values, setValues] = useState({
        cashBalance: '',
        debitBalance: '',
        totalDebt: ''
    })

    const onCreate = async (e) => {
        e.preventDefault()
        console.log(values)
        try {
            const response = await axios.post(`${process.env.API_URL}/ledger`, values)
            if (response.status == 201) {
                toast({
                    title: 'Libro creado.',
                    description: "El libro contable se creo correctamente.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            } else {
                toast({
                    title: 'Error al crear libro.',
                    description: "El libro contable no se pudo crear.",
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
                title: 'Error al crear libro.',
                description: "El libro contable no se pudo crear.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
        console.log(e.target.name, e.target.value)
    }

    const router = useRouter()

    const getLibro = async () => {
        const response = await axios.get(`${process.env.API_URL}/ledgers`)
        if (response.status == 200) {
            toast({
                title: 'Se encontro un libro contable.',
                description: "Libro cargado correctamente.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'No existe libro contable.',
                description: "Cree un libro contable.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
        setLibro(response.data)
    }

    const onInfo = (e) => {
        router.push('/registrodepago')
    }

    useEffect(() => {
        getLibro()
    }, [])

    const showLibro = () => {
        if (libro.length > 0) {
            return libro.map(ledger => {
                return (
                    <Tr key={ledger._id}>
                        <Td >$    {ledger.cashBalance.toLocaleString()}</Td>
                        <Td >$    {ledger.debitBalance.toLocaleString()}</Td>
                        <Td >$    {ledger.totalDebt.toLocaleString()}</Td>
                        <Td display={'flex'} mx="10" justifyContent="space-evenly"><IconButton onClick={onInfo} aria-label='Search database' icon={<InfoIcon />} /></Td>
                    </Tr>
                )
            })
        } else {
            return (
                <Tr>
                    <Td>
                        <FormControl>
                            <Input placeholder="Dinero en caja" type={"number"} min={"0"} onChange={onChange} name={"cashBalance"} />
                        </FormControl>
                    </Td>
                    <Td>
                        <FormControl>
                            <Input placeholder="Dinero en cuenta" type={"number"} min={"0"} onChange={onChange} name={"debitBalance"} />
                        </FormControl>
                    </Td>
                    <Td>
                        <FormControl>
                            <Input placeholder="Deuda total usuarios" type={"number"} min={"0"} onChange={onChange} name={"totalDebt"} />
                        </FormControl>
                    </Td>
                    <Td display={'flex'} mx="10" justifyContent="space-evenly">
                        <IconButton aria-label='Search database' bg={"green.500"} icon={<AddIcon />} onClick={onCreate} />
                    </Td>
                </Tr>)
        }
    }

    return (
        <>
            <SideNavigationBar {...viewportSize}/>
            <Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='60vw' margin=" 7.5rem auto">
                <Heading textAlign={'center'}>Libro contable</Heading>
                <Table bg="skyblue" mb='10px' border='10px' borderColor={'black'} style={{ borderCollapse: 'collapse' }}>
                    <Thead>
                        <Tr>
                            <Td>Dinero en efectivo</Td>
                            <Td>Dinero en cuenta</Td>
                            <Td>Total deudas</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {showLibro()}
                    </Tbody>
                </Table>
            </Container>
        </>
    )
}
