import { useState, useEffect } from 'react'
import { Button, Container, Input, FormControl , Stack, Text, HStack, Table, Thead, Tbody, FormLabel, Tr, Th, Td, Heading, } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { verifyToken } from '../data/user'
import SideNavigationBar from '../components/SideNavigationBar'
import jwt from 'jsonwebtoken'
import Cookies from "js-cookie"

// export const getServerSideProps = async (context) => {
//     try {
//         const response = await verifyToken(context.req.headers.cookie)
        // console.log(context.req.headers.cookie+"este es el Token del usuario")
        // const token = Cookies.get("token");
        // const decoded = jwt.decode(token, process.env.SECRET_KEY);
//         console.log(decoded)
//         if (response.status === 200 /*&& decoded.role === "admin"*/) {
//             return {
//                 props: {
//                     data: response.data
//                 }
//             }
//         }
//     } catch (error) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false
//             }
//         }
//     }
// }

const usuarios = () => {
    const [users, setUsers] = useState([])
    const [userFind, setUser] = useState()
    const router = useRouter()

    const getUsers = async () => {
        const response = await axios.get(`${process.env.API_URL}/users`)
        setUsers(response.data)
    }

    const getUser = (rut) => {
        setUser(null)
        users.map(user => {
            if (user.rut === rut) {
                setUser(user)
                return rut
            }
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    const showUsuarios = () => {
        if (!userFind) {
            return users.map(user => {
                return (
                    <Tr key={user._id}>
                        <Td>{user.name}</Td>
                        <Td>{user.rut}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.role}</Td>
                        <Td>{user.telephone}</Td>
                        <Td><Button onClick={() => router.push(`/usuario/ver/${user._id}`)}>Ver mas</Button></Td>
                        <Td><Button colorScheme="teal" onClick={() => router.push(`/usuario/editar/${user._id}`)}>editar usuario</Button></Td>
                    </Tr>
                )
            })
        }
        else {
            return (
                <Tr key={userFind._id}>
                    <Td>{userFind.name}</Td>
                    <Td>{userFind.rut}</Td>
                    <Td>{userFind.email}</Td>
                    <Td>{userFind.role}</Td>
                    <Td>{userFind.telephone}</Td>
                    <Td><Button onClick={() => router.push(`/usuario/ver/${user._id}`)}>Ver mas</Button></Td>
                    <Td><Button colorScheme="teal" onClick={() => router.push(`/usuario/editar/${userFind._id}`)}>editar usuario</Button></Td>
                </Tr>
            )
        }
    }

    return (
        <>
            <SideNavigationBar />
            <Container centerContent borderRadius={"2rem"} minW='70vw' minH="50vh" mt='10vh' maxW="70vw" bg='whiteAlpha.800' overflow='hidden' >
                <Heading textAlign={"center"} my={10}>Usuarios</Heading>
                <Button colorScheme="teal" onClick={() => router.push('/usuario/crear')}>Crear usuario</Button>
                <FormControl>
                <FormLabel>Buscar usuario</FormLabel>
                <Input onChange={(e)=>getUser(e.target.value)} placeholder=" ingrese el rut " type='text' />
                </FormControl>

                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Td>Nombre</Td>
                            <Td>Rut</Td>
                            <Td>Correo</Td>
                            <Td>Rol</Td>
                            <Td>Telefono</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {showUsuarios()}
                    </Tbody>
                </Table>
            </Container>
        </>
    )
}

export default usuarios



