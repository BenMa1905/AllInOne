import { useState, useEffect } from 'react'
import { Button,Icon, Container, Input, Stack, Text, HStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import SideNavigationBar from '../components/SideNavigationBar'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, } from '@chakra-ui/react'
import { Search2Icon, ViewIcon,EditIcon} from '@chakra-ui/icons'
const Maquinaria = (viewportSize) => {
    const [machines, setMachines] = useState([])
    const [machinesfind, setMachine] = useState()
    const router = useRouter()
const getMachines = async () => {
    const response = await axios.get(`${process.env.API_URL}/machines`)
    setMachines(response.data)
}
    const getMachine = (serial) => {
        setMachine(null)
        machines.map(machine => {
            if (machine.serial === serial) {
                setMachine(machine)
                return
            }
        })
    }
    useEffect(() => {
        getMachines()
    }, [])
    const showMachines = () => {
        if (!machinesfind) {
            return machines.map(machine => {
                return (
                    <Tr key={machine._id}>
                        <Td>{machine.name}</Td>
                        <Td>{machine.machineType}</Td>
                        <Td>{machine.serial}</Td>
                        <Td>{machine.status}</Td>
                        <Td><Button color='white' style={{backgroundColor:'hsl(220, 100%, 60%)'}} onClick={() => router.push(`/maquina/ver/${machine._id}`)}><Icon as={ViewIcon} /></Button></Td>
                        <Td><Button color='white' style={{backgroundColor:'hsl(220, 100%, 60%)'}} onClick={() => router.push(`/maquina/editar/${machine._id}`)}><Icon as={EditIcon} /></Button></Td>
                    </Tr>
                )
            })
        }
        else{
            return (
                <Tr key={machinesfind._id}>
                    <Td>{machinesfind.name}</Td>
                    <Td>{machinesfind.machineType}</Td>
                    <Td>{machinesfind.serial}</Td>
                    <Td>{machinesfind.status}</Td>
                    <Td><Button color='white' style={{backgroundColor:'hsl(220, 100%, 60%)'}} onClick={() => router.push(`/maquina/ver/${machinesfind._id}`)}><Icon as={ViewIcon} /></Button></Td>
                    <Td><Button color='white' style={{backgroundColor:'hsl(220, 100%, 60%)'}} onClick={() => router.push(`/maquina/editar/${machinesfind._id}`)}><Icon as={EditIcon} /></Button></Td>
                </Tr>
            )
        }
    }
    return (
        <>
        <SideNavigationBar {...viewportSize}/>
        <Container  bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{opacity: 0.9}}  maxW="container.xl" centerContent>
            <Heading textAlign={"center"} my={20}>maquina</Heading>
            <HStack w={"full"} py={10} >
                <Button colorScheme="blue" onClick={() => router.push('/maquina/crear')}>Crear maquina
                </Button>
            </HStack>
            <FormControl   >
                <FormLabel color='white' style={{backgroundColor:'hsl(220, 100%, 60%)',border: '1px solid black', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}} mb='10px' bg="skyblue" ><Icon as={Search2Icon} /> Buscar maquina</FormLabel>
                <Input  bg="white" placeholderColor='white !important' style={{backgroundColor:'#87CEEB'}} mb='10px'   border='1px' borderColor={'black'} onChange={(e)=>getMachine(e.target.value)} placeholder=" ingrese serial "  type='string'  />
            </FormControl>
            <Table  bg="skyblue" mb='10px' border='10px' borderColor={'black'} style={{borderCollapse: 'collapse'}} >
                <Thead >
                    <Tr >
                        <Td>Nombre </Td>
                        <Td>Tipo de Maquina</Td>
                        <Td>Codigo Serial</Td>
                        <Td>status</Td>
                        <Td>Ver mas</Td>
                        <Td>Editar</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {showMachines()}
                </Tbody>
            </Table>
        </Container></>
    )
}
export default Maquinaria
