import React, { useState, useEffect } from 'react'
import { Button, Table, Tr, Td,Container } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import jwt from 'jwt-decode'
import SideNavigationBar from '../components/SideNavigationBar'
const Pagosdeusuario
    = (viewportSize) => {
        const [paymentrecords, setPayments] = useState([])
        const router = useRouter()
        const [userId, setUserId] = useState(null)
        const getPaymentRecords = async () => {
            const response = await axios.get(`${process.env.API_URL}/paymentrecords`)
            setPayments(response.data)
        }
        const getUserId = async () => {
            try {
                const token = document.cookie.split('=')[1]
                const decoded = jwt(token)
                setUserId(decoded.sub)
            } catch (error) { }
        }
        const filteredPayments = paymentrecords.filter(paymentrecord => paymentrecord.user && paymentrecord.user._id === userId)
        useEffect(() => {
            getPaymentRecords()
            getUserId()
        }, [])
        return (
            <>
            <SideNavigationBar {...viewportSize}/>
            <Container  bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{opacity: 0.9}}  maxW="container.xl" centerContent>
                <Heading textAlign={"center"} my={20}>Pagos de usuario</Heading>    
                <Table  borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{ opacity: 0.9 }} maxW="container.xl" centerContent bg="skyblue" mb='10px' border='10px' borderColor={'black'} >
                <thead>
                    <Tr>
                        <Td>Nombre del usuario</Td>
                        <Td>Tipo de pago</Td>
                        <Td>Monto pagado</Td>
                        <Td>Fecha de pago</Td>
                    </Tr>
                </thead>
                <tbody>
                    {filteredPayments.map(paymentrecord => {
                        return (
                            <Tr key={paymentrecord._id}>
                                <Td>{paymentrecord.user ? paymentrecord.user.name : 'Usuario eliminado'}</Td>
                                <Td>{paymentrecord.tipo_de_pago}</Td>
                                <Td>{paymentrecord.monto_pagado}</Td>
                                <Td>{paymentrecord.Fecha_de_pago}</Td>
                            </Tr>
                        )
                    })}
                </tbody>
            </Table>
            </Container>
            </>
        )
    }
export default Pagosdeusuario
