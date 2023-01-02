import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Heading, Text, Button, Stack, Input, FormControl, FormLabel, Textarea, HStack } from '@chakra-ui/react'
import { getpaymentrecord } from '../../../data/paymentrecords'
import ShowInfo from '../../../components/ShowInfo'
import axios from 'axios'
import Swal from 'sweetalert2'
import SideNavigationBar from '../../../components/SideNavigationBar'
export async function getServerSideProps(context) {
    try {
        //console.log(context.query.registro)
        const response = await getpaymentrecord(context.query.registro)
        return {
            props: {
                data: response.data
            }
        }
    } catch (err) {
        const response = await getpaymentrecord(context.query.registro)

        return {
            props: {
                data: response.data
            }
        }
    }
}
const Registro = ({ data },viewportSize) => {
    const router = useRouter()
    //const { maquina } = router.query
    const [paymentrecord] = useState(data)
    const handleDelete = async () => {
        try {
            if (paymentrecord.tipo_de_pago === 'efectivo') {
                const cashresponse = await axios.put(`${process.env.API_URL}/ledger/update/${paymentrecord._id}`, {
                    "$inc": {
                        "cashBalance": -paymentrecord.monto_pagado,
                        "totalDebt": paymentrecord.monto_pagado
                    }
                });
                if(cashresponse.status === 200){
                    console.log('cash updated')
                }
            } else{
                const debitResponse = await axios.put(`${process.env.API_URL}/ledger/update/${paymentrecord._id}`, {
                    "$inc": {
                        "debitBalance": -paymentrecord.monto_pagado,
                        "totalDebt": paymentrecord.monto_pagado
                    }
                });
                if(debitResponse.status === 200){
                    console.log('debit updated')
                }
            }
            const response = await axios.delete(`${process.env.API_URL}/paymentrecord/delete/${paymentrecord._id}`)
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'registro de pago eliminado',
                    text: 'el registro de pago se elimino correctamente!',
                }).then(() => {
                    router.push('/registrodepago')
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
            })

        }

    }
    return (<>
        <SideNavigationBar {...viewportSize} />
        <Container minH='92vh' minW='74vw' maxW='74vw' bg='whiteAlpha.800' overflow='hidden'>
            <Heading color="black.500" my={10}> Registro de {paymentrecord.user ? paymentrecord.user.name : "usuario eliminado"} </Heading>
            <Stack w={"full"}>
                <ShowInfo tag="Fecha de pago" data={paymentrecord.Fecha_de_pago} color="blue.500" />
                <HStack>
                    <ShowInfo tag="Usuario" data={paymentrecord.user ? paymentrecord.user.name : "usuario eliminado"} color="blue.500" />
                </HStack>
                <ShowInfo tag="Monto pagado" data={paymentrecord.monto_pagado} color="blue.500" />
                <ShowInfo tag="Tipo de pago" data={paymentrecord.tipo_de_pago} color="blue.500" />
            </Stack>
            <HStack w={"full"} py={10}>
                <Button w={"full"} colorScheme={"red"} onClick={() => handleDelete(router.push('/registrodepago'))}>Eliminar </Button>
                <Button w={"full"} colorScheme={"blue"} onClick={() => router.push('/registrodepago')}>Volver</Button>
            </HStack>
        </Container>
    </>
    )
}

export default Registro
