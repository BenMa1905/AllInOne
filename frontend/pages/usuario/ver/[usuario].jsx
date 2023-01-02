import { React, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Container, Heading, Text, Button, Stack, Input, FormControl, FormLabel, Textarea,Box, HStack } from '@chakra-ui/react'
import { getUser } from '../../../data/user'
import ShowInfo from '../../../components/ShowInfo'
import axios from 'axios'
import SideNavigationBar from '../../../components/SideNavigationBar'
const jwt = require('jwt-simple');
import { findDOMNode } from 'react-dom';
import Cookies from 'js-cookie'


export async function getServerSideProps(context) {
    //const rut = context.req.cookies.rut
    try {
        const response = await getUser(context.query.usuario/*, context.req.headers.cookie*/)
        return {
            props: {
                data: response.data
            }
        }
    } catch (err) {
        return {
            redirect: {
                destination: '/usuarios',
                permanent: true
            }
        }
    }
}

const Usuario = ({ data }) => {

    useEffect(() => {
        var url = window.location.toString();
        var clean_url = url.substring(0, url.lastIndexOf('/'));
        window.history.replaceState({},document.title, clean_url);
        console.log(url)
    }, [])
    const [Id, setId] = useState();
    const [role, setRole] = useState();
    useEffect(() => {async function decodificador(){
    try {
        const decoded = jwt.decode(document.cookie.split('=')[1],process.env.SECRET_KEY)
        if (decoded) {
            // console.log(decoded)
            setId(decoded.sub)
            setRole(decoded.role)
        }
        if (decoded.sub !== user._id) {
            document.getElementById("clt").style.display = "none";
            console.log(user._id)
            console.log(decoded.sub)
            }
    } catch (error) { }
    }
    decodificador()
    }, [
    ])

    const router = useRouter()
    const [user] = useState(data)

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.API_URL}/user/delete/${user._id}`)
            if (response.status === 200) {
                console.log("se borro el usuario: " + user._id)
                alert("se borro el usuario")

            }
        } catch (error) {
            console.log(error)
            alert("ERROR no se borro el usuario")

        }

    }
        if(role === 'client'){
            document.getElementById("adm").style.display = "none";
        }
        // useEffect(() => {
        //     const element = findDOMNode(ref.current);
        //     element.style.display = (Id != user._id) ? "none" : "block";
        // }, []);

        // const ref = useRef(null);

        useEffect(() => {
        }, [Id, user]);


    return (
        <>
            <SideNavigationBar />
            <Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto">
            <Heading my={10}> Usuario: {user.name}</Heading>
            <Stack>
                <ShowInfo tag="Nombre" data={user.name} color="black.500" />
                <ShowInfo tag="Rut" data={user.rut} color="black.500" />
                <ShowInfo tag="Correo" data={user.email} color="black.500" />
                <ShowInfo tag="Fecha de nacimiento" data={user.birthdate} color="black.500" />
                <ShowInfo tag="Direccion" data={user.address} color="black.500" />
                <ShowInfo tag="Telefono" data={user.telephone} color="black.500" />
                <ShowInfo tag="Rol" data={user.role} color="black.500" />
                <ShowInfo tag="Creado el" data={user.createdDate} color="black.500" />
            </Stack>
            <Box/>
            <Stack>
                <Button id={"adm"} w={"full"} colorScheme={"green"} onClick={() => handleDelete()}>Eliminar</Button>
                <Button id="clt" w={"full"} colorScheme={"orange"} onClick={() => router.push(`/usuario/editar/${user._id}`)}>editar</Button>
                <Button w={"full"} colorScheme={"orange"} onClick={() => router.push('/usuarios')}>Volver</Button>
                </Stack>
        </Container>
        </>
    )
}

export default Usuario
// // settimeout(()=>{

// // window.location.reload()
// // },3000)