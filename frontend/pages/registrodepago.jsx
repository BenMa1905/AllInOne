
// // //este es el que funciona
import React, { useState, useEffect } from 'react'
import { Button, Icon, Container, Input, Stack, Text, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import SideNavigationBar from '../components/SideNavigationBar'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { WashingMachineIcon, HomeIcon, ScheduleIcon, HistoryIcon, LogoLavanderia, MoneyIcon } from '../public/SVGsResources'
import { Search2Icon, ViewIcon,} from '@chakra-ui/icons'
const Registrodepago = (viewportSize) => {
    const [paymentrecords, setPayments] = useState([])
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])

    const getpaymentrecords = async () => {
        const response = await axios.get(`${process.env.API_URL}/paymentrecords`)
        setPayments(response.data)
    }
    useEffect(() => {
        getpaymentrecords()
    }, [])
    useEffect(() => {
        getUsers()
    }, [])
    const getUsers = async () => {
        const response = await axios.get(`${process.env.API_URL}/users`)
        setUsers(response.data)
    }
    const getUsersWithPayments = () => {
        const paymentRecordsByUserId = paymentrecords
            .filter(record => record.user)
            .reduce((acc, curr) => {
                acc[curr.user._id] = true
                return acc
            }, {})
        return users.filter(user => paymentRecordsByUserId[user._id])
    }
    const handleSearch = () => {
        const filteredPayments = paymentrecords.filter(paymentrecord => paymentrecord.user && paymentrecord.user._id === search)
        return filteredPayments.map(paymentrecord => {
            return (
                <Tr key={paymentrecord._id}>
                    <Td>{paymentrecord.user ? paymentrecord.user.name : "usuario eliminado"}</Td>
                    <Td>{paymentrecord.tipo_de_pago}</Td>
                    <Td>{paymentrecord.monto_pagado}</Td>
                    <Td>{paymentrecord.Fecha_de_pago}</Td>
                    <Td>{paymentrecord._id}</Td>
                    <Td><Button colorScheme="blue" onClick={() => router.push(`/registro/ver/${paymentrecord._id}`)}><Icon as={ViewIcon} /></Button></Td>
                </Tr>
            )
        })
    }
    const showPayments = () => {
        if (search) {
            return handleSearch()
        } else {
            return paymentrecords.map(paymentrecord => {
                return (
                    <Tr key={paymentrecord._id}>
                        <Td>{paymentrecord.user ? paymentrecord.user.name : "usuario eliminado"}</Td>
                        <Td>{paymentrecord.tipo_de_pago}</Td>
                        <Td>{paymentrecord.monto_pagado}</Td>
                        <Td>{paymentrecord.Fecha_de_pago}</Td>
                        <Td><Button colorScheme="blue" onClick={() => router.push(`/registro/ver/${paymentrecord._id}`)}><Icon as={ViewIcon} /></Button></Td>
                    </Tr>
                )
            })
        }
    }
    return (
        <>
            <SideNavigationBar {...viewportSize}/>
            <Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{ opacity: 0.9 }} maxW="container.xl" centerContent>
                <Heading textAlign={"center"} my={10}>Registro de pago</Heading>
                <HStack w={"full"} py={10}>
                    <Button colorScheme="blue" onClick={() => router.push('/registro/crear')}>Crear Registro</Button>
                </HStack>
                <FormControl>
                    <FormLabel htmlFor="search" ><Icon as={Search2Icon} /> Buscar por usuario  </FormLabel>
                    <Select placeholder='Todos los usuarios' id="search" value={search} onChange={e => setSearch(e.target.value)}
                    >
                        {getUsersWithPayments().map(user => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                            // debo ver si puedo dejar para que escoja a los usuarios eliminados
                        ))}
                    </Select>
                </FormControl>
                <Table  borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{ opacity: 0.9 }} maxW="container.xl" centerContent
                bg="skyblue" mb='10px' border='10px' borderColor={'black'} >
                    <Thead>
                        <Tr>
                            <Td>Usuario</Td>
                            <Td>Tipo de pago</Td>
                            <Td>Monto Pagado</Td>
                            <Td>Fecha de pago</Td>
                            <Td>Ver registro</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {search ? handleSearch() : showPayments()}
                    </Tbody>
                </Table>
            </Container>
        </>
    )
}
export default Registrodepago
