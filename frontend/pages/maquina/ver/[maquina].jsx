import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Container, Heading, Text, Button, Stack, Input, FormControl, FormLabel, Textarea, HStack } from '@chakra-ui/react'
import { getMachines } from '../../../data/machines'
import ShowInfo from '../../../components/ShowInfo'
import axios from 'axios'
import Swal from 'sweetalert2'
import SideNavigationBar from '../../../components/SideNavigationBar'
export async function getServerSideProps(context) {
    try {
        const response = await getMachines(context.query.maquina,)
        return {
            props: {
                data: response.data
            }
        }
    } catch (err) {
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
    //const { maquina } = router.query
    const [machine] = useState(data)

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.API_URL}/machine/delete/${machine._id}`)
            ///console.log(response)
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'maquina eliminada',
                    text: 'la maquina se elimino correctamente!',
                }).then(() => {
                    router.push('/maquinaria')
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
    return ( <>
        <SideNavigationBar {...viewportSize}/>
        <Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{opacity: 0.9}}   centerContent >
            <Heading my={10}> Maquina: {machine.name}</Heading>
            <Stack w={"full"}>
                <ShowInfo tag="Nombre" data={machine.name} color="blue.500" />
                <HStack>
                    <ShowInfo tag="machineType" data={machine.machineType} color="blue.500" />
                </HStack>
                <ShowInfo tag="serial" data={machine.serial} color="blue.500" />
                <ShowInfo tag="status" data={machine.status} color="blue.500" />
            </Stack>
            <HStack w={"full"} py={10}>
                <Button w={"full"} colorScheme={"blue"} onClick={() => router.push(`/maquina/editar/${machine._id}`)}>Editar</Button>
                <Button w={"full"} colorScheme={"red"} onClick={() => handleDelete(router.push('/maquinaria'))}>Eliminar </Button>
                {/* <Button w={"full"} colorScheme={"orange"} onClick={() => router.push('/maquina/editar/'+machine._id)}>editar</Button> */}
                <Button w={"full"} colorScheme={"blue"} onClick={() => router.push('/maquinaria')}>Volver</Button>
            </HStack>
        </Container>
        </>
    )
}
export default Maquina
