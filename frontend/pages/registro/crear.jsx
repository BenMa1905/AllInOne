import { Container, Heading, Text, Button, Stack, HStack, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { createpaymentrecord } from '../../data/paymentrecords'
import { Formik } from 'formik'
import FormInput from '../../components/FormInput'
import paymentValidation from '../../validations/paymentValidation'
import FormikError from '../../components/FormikError'
import React, { useState, useEffect } from 'react'
import { Select } from '@chakra-ui/react'
import axios from 'axios'
import SideNavigationBar from '../../components/SideNavigationBar'
const Registrodepago = (viewportSize) => {
	const router = useRouter()
	const [users, setUsers] = useState([])
	const getUsers = async () => {
		const response = await axios.get(`${process.env.API_URL}/users`)
		return response.data
	}
	useEffect(() => {
		const getData = async () => {
			const users = await getUsers()
			setUsers(users)
		}
		getData()
	}, [])
	return ( <>
		<SideNavigationBar {...viewportSize}/>
		<Container   bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{opacity: 0.9}}  centerContent >
			<Heading textAlign={"center"} my={10}>Crear registro</Heading>
			<Formik
				initialValues={{
					Fecha_de_pago: '',
					user: '',
					monto_pagado: '',
					tipo_de_pago: '',
				}}
				validationSchema={paymentValidation}
				onSubmit={async (values) => {
					try {
						const response = await createpaymentrecord(values)
						if (response.status === 200) {
							Swal.fire({
								icon: 'success',
								title: 'registro creado',
								text: 'el registro se creo correctamente!',
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
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit
				}) => (
					<form onSubmit={handleSubmit} id="form" bg="white" style={{ opacity: 0.9 }} maxW="container.xl" centerContent>
						<Stack>
							<FormInput onChange={handleChange} placeholder="año-mes-dia" label="Fecha de pago" type={"date"} name={"Fecha_de_pago"} onBlur={handleBlur} value={values.Fecha_de_pago} />
							{touched.Fecha_de_pago && errors.Fecha_de_pago && <FormikError error={errors.Fecha_de_pago} />}
							<FormControl>
								<FormLabel>Usuario</FormLabel>
								<Select onChange={handleChange} value={values.user} name="user"  placeholder='seleccione usuario'onBlur={handleBlur}>
									{users.map(user => (
										<option key={user._id} value={user._id}>
											{user.name}
										</option>
									))}
								</Select>
							</FormControl>
							{touched.user && errors.user && <FormikError error={errors.user} />}
							<FormInput onChange={handleChange} placeholder="Monto " label="Monto pagado" type={"number"} name={"monto_pagado"} onBlur={handleBlur} value={values.monto_pagado} />
							{touched.monto_pagado && errors.monto_pagado && <FormikError error={errors.monto_pagado} />}
							<FormLabel>Tipo de pago</FormLabel>
							<Select onChange={handleChange} placeholder=" Seleccione tipo de pago " type={"text"} name={"tipo_de_pago"} onBlur={handleBlur} value={values.tipo_de_pago}>
								<option value='transferencia'>transferencia </option>
								<option value='efectivo'>efectivo</option>
							</Select>
							{touched.tipo_de_pago && errors.tipo_de_pago && <FormikError error={errors.tipo_de_pago} />}
						</Stack>
						<HStack>
							<Button colorScheme="blue" size="md" type="submit" my={5} onClick={handleSubmit}> Crear registro </Button>
							<Button colorScheme="blue" onClick={() => router.push('/registrodepago')}>volver</Button>
						</HStack>
					</form>
				)}
			</Formik>
		</Container>
		</>
		)
}
export default Registrodepago