import { useState } from 'react'
import { Button, Container, Input, Heading, Stack, Box, Flex,FormControl, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { login , verifyToken} from '../data/user'
import Cookie from "js-cookie"
import Swal from "sweetalert2"


//import {verificarUsuario} from '../utils/verificarUsuario'
// const WhatsappBackground = "linear-gradient(to right, #25D366 0%, 	#075E54 100%)"
//  const GmailBackground = "linear-gradient(to right, #5e5e5e 0%, 	#5e5e5e 100%)"

export const getServerSideProps = async (context) => {
	try {
		const response = await verifyToken(context.req.headers.cookie)
		if (response.status === 200) {
			return {
				redirect: {
					destination: "/usuarios",
					permanent: false
				}
			}
		}
	} catch (error) {
		console.log(error)
		return {
			props: {}
		}
	}
}

const Home = ({ data }) => {

	const [user, setUser] = useState({
    rut: "",
	})
	const router = useRouter()
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await login(user.rut)
			// console.log(response)
			if (response.status === 200) {
				Cookie.set("token", response.data.token, { expires: 1 })
				router.push("/usuarios")
			}
		} catch (error) {
			console.log(error)
			return Swal.fire({
				icon: "error",
				title: "Inicio de secion invalida",
				text: "Rut incorrecto!"
			})
		}
	}

return (
    <>
    <Container centerContent minW='1vw' minH="1vh" maxW="1vw" overflow='hidden' ></Container>
	<Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto">
        <Heading textAlign={"center"} my={10}>Inicio de sesión</Heading>
        <Stack>
				<FormControl>
					<FormLabel>Rut</FormLabel>
					<Input type="txt" name="rut" onChange={handleChange} />
				</FormControl>
        <Button colorScheme="teal" onClick={onSubmit}>Ingresar</Button>
        </Stack>
    </Container>
    </>
	)
}
export default Home