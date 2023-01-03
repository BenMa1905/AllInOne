import { useState } from 'react'
import { Container, Heading, Select , Button, Stack, HStack, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { createUser } from '../../data/user'
import { Form, Formik } from 'formik'
import FormInput from '../../components/FormInput'
import userCreateVerify from '../../validations/userCreateVerify'
import FormikError from '../../components/FormikError'
import SideNavigationBar from '../../components/SideNavigationBar'

const Usuarios = () => {
	const router = useRouter()
	return (
		<>
		<SideNavigationBar />
		<Container bg='whiteAlpha.800' borderRadius={"2rem"} padding={'10'} minW='30vw' margin=" 7.5rem auto">
			<Heading textAlign={"center"} my={10}>Crear usuario</Heading>
			<Button colorScheme="teal" onClick={() => router.push('/usuarios')}>volver</Button>
			<Formik
				initialValues={{
					name: '',
					rut: '',
					email: '',
					birthdate: '',
					address: '',
					telephone: '',
					role: '',
				}}
				onSubmit={async (values) => {
					try {
						const response = await createUser(values)
						if (response.status === 201) {
							Swal.fire({
								icon: 'success',
								title: 'usuario creado',
								text: 'el usuario se creo correctamente!',
							}).then(() => {
								router.push('/usuarios')
							})
						}
					} catch (error) {
						console.log(error)
						Swal.fire({
							icon: 'error',
							title: 'Error al crear al usuario...',
							text: 'Algo salió mal!',
						})
					}
				}}
				validationSchema={userCreateVerify}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit
				}) => (
					<form onSubmit={handleSubmit} id="form">
						<Stack>
							<FormLabel fontFamily={'inherit'} fontWeight={'light'}>Nombre</FormLabel>
							<FormInput onChange={handleChange} placeholder="Nombre" label="Nombre" type={"text"} name={"name"} onBlur={handleBlur} value={values.name} />
							{touched.name && errors.name && <FormikError error={errors.name} />}
							<FormLabel fontFamily={'inherit'} fontWeight={'light'}>Rut</FormLabel>
							<FormInput id='rut' onChange={handleChange} placeholder="12345678-k" label="Rut" type={"text"} name={"rut"} onBlur={handleBlur} value={values.rut} />
							{touched.rut && errors.rut && <FormikError error={errors.rut} />}
							<FormLabel fontFamily={'inherit'} fontWeight={'light'}>Correo</FormLabel>
							<FormInput onChange={handleChange} placeholder="email" label="email" type={"text"} name={"email"} onBlur={handleBlur} value={values.email} />
							{touched.email && errors.email && <FormikError error={errors.email} />}
							<FormLabel fontFamily={'inherit'} fontWeight={'light'}>Fecha de nacimiento</FormLabel>
							<FormInput onChange={handleChange} placeholder="Fecha de nacimiento" label="birthdate" type={"date"} name={"birthdate"} onBlur={handleBlur} value={values.birthdate} />
							{touched.birthdate && errors.birthdate && <FormikError error={errors.birthdate} />}
							<FormLabel fontFamily={'inherit'} fontWeight={'light'}>Direccion</FormLabel>
							<FormInput onChange={handleChange} placeholder="Direccion" label="Direccion" type={"text"} name={"address"} onBlur={handleBlur} value={values.address} />
							{touched.address && errors.address && <FormikError error={errors.address} />}
							<FormLabel fontFamily={'inherit'} fontWeight={'light'}>telephone</FormLabel>
							<FormInput onChange={handleChange} placeholder="Telefono" label="telephone" type={"text"} name={"telephone"} onBlur={handleBlur} value={values.telephone} />
							{touched.telephone && errors.telephone && <FormikError error={errors.telephone} />}
							<FormLabel fontFamily={'inherit'} fontWeight={'light'}>Rol</FormLabel>
							<Select onChange={handleChange} placeholder='Seleccione el rol' name={"role"} onBlur={handleBlur} value={values.role}>
                                    <option value='admin'>Admin </option>
                                    <option value='client'>Cliente</option>
                                </Select>
						</Stack>
						<Button colorScheme="teal" size="md" type="submit" my={5} onClick={handleSubmit}> Crear usuario </Button>
					</form>
				)}
			</Formik>
		</Container>
		</>
	)


}


export default Usuarios