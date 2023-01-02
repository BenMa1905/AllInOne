import { useState } from 'react'
import { Container, Heading, Text, Button, Stack, HStack, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { createMachine } from '../../data/machines'
import { Formik } from 'formik'
import FormInput from '../../components/FormInput'
import machineValidation from '../../validations/machineValidation'
import FormikError from '../../components/FormikError'
import { Select } from '@chakra-ui/react'
import SideNavigationBar from '../../components/SideNavigationBar'
const Maquinaria = (viewportSize) => {
	const router = useRouter()
	return (
		<>
            <SideNavigationBar {...viewportSize}/>
			<Container bg='whiteAlpha.800' borderRadius={"2rem"} minH={"20vh"} padding={'10'} minW='30vw' margin=" 7.5rem auto" style={{ opacity: 0.9 }} >
			<Heading textAlign={"center"} my={10}>Crear maquina</Heading>
			<Formik
				initialValues={{
					name: '',
					machineType: '',
					serial: '',
					status: '',
					schedule: ''
				}}
				validationSchema={machineValidation}
				onSubmit={async (values) => {
					try {
						const response = await createMachine(values)
						if (response.status === 201) {
							Swal.fire({
								icon: 'success',
								title: 'maquina creada',
								text: 'la maquina se creo correctamente!',
							}).then(() => {
								router.push('/maquinaria')
							})
						}
					} catch (error) {
						///console.log(error)
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
					<form onSubmit={handleSubmit} id="form"  bg="white" style={{ opacity: 0.9 }} maxW="container.xl" centerContent>
						<Stack>
							<FormInput onChange={handleChange} placeholder="Nombre" label="Nombre" type={"text"} name={"name"} onBlur={handleBlur} value={values.name} />
							{touched.name && errors.name && <FormikError error={errors.name} />}
							<FormLabel>Tipo de maquina</FormLabel>
							<Select onChange={handleChange} placeholder='Tipo de maquina' name={"machineType"} onBlur={handleBlur} value={values.machineType}>
								<option value='washingMachine'>Lavadora </option>
								<option value='dryingMachine'>Secadora</option>
							</Select>
							{touched.machineType && errors.machineType && <FormikError error={errors.machineType} />}
							<FormInput onChange={handleChange} placeholder="serial" label="serial" type={"text"} name={"serial"} onBlur={handleBlur} value={values.serial} />
							{touched.serial && errors.serial && <FormikError error={errors.serial} />}
							<FormLabel>tipo de status</FormLabel>
							<Select onChange={handleChange} placeholder='Seleccione el tipo de status' name={"status"} onBlur={handleBlur} value={values.status}>
								<option value='Activa'>Activa </option>
								<option value='Inactiva'>Inactiva</option>
							</Select>
							{touched.status && errors.status && <FormikError error={errors.status} />}
						</Stack>
						<HStack>
						<Button colorScheme="blue" size="md" type="submit" my={5} onClick={handleSubmit}> Crear maquina </Button>
						<Button colorScheme="blue" onClick={() => router.push('/maquinaria')}>volver</Button>
						</HStack>
					</form>
				)}
			</Formik>
		</Container>
		</>
		)
}
export default Maquinaria

