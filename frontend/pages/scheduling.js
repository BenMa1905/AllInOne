import { useState, useEffect } from 'react'
import {
	Textarea, Button, Container, Table, Thead, Tr, Td, Tbody, Text, Box, Flex, Divider, Collapse, Input,
	Icon, IconButton, useTheme, Spacer, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
//import axios from 'axios'
import { useRouter } from 'next/router'
import { WashingMachineIcon, ScheduleIcon, HistoryIcon, BlockedIcon, DryingMachineIcon, ClockIcon, ConfirmScheduleIcon } from '../public/SVGsResources'
import SideNavigationBar from '../components/SideNavigationBar'
import axios from 'axios'

/*
export async function getServerSideProps(context) {

	try {
		const machines = await axios.get(`${process.env.API_URL}/schedules/`)

		if(response.status === 200){
			return {
				props: {
					data: response.data
				}
			}
		}else{
			return {
				props: {
					data: false
				}
			}
		}
	    
	} catch (err) {
		console.log(err)
		const previousPageUrl = context.req.headers.referer;

		// Send a redirect response to the client
		return {
			redirect: {
				destination: previousPageUrl,
				permanent: true
			}
		}
	}
}
*/


const scheduling = (props) => {
	/*
		const router = useRouter()
		useEffect(() => {
			if (document.title != 'Agendamiento') {
				router.push("/scheduling", "/Usuario/Agendamiento", true);
				document.title = 'Agendamiento'
			}
		}, [])
	*/
	const theme = useTheme()
	const router = useRouter()
	const brandCol500 = theme.colors.brand[500]
	const brandCol100 = theme.colors.brand[100]
	const remainingHours = 12 //checkdataBase
	
	const currDate = new Date()
	currDate.setMinutes(currDate.getMinutes() - currDate.getTimezoneOffset())
	if (currDate.getUTCHours() > 20) { currDate.setUTCHours(currDate.getUTCHours() + (25 - currDate.getUTCHours())) }

	const minDate = currDate.toISOString()
	currDate.setUTCMonth(currDate.getUTCMonth() + 1)
	const maxDate = currDate.toISOString()


	const [values, setValues] = useState({
		date: minDate,
		stTime: '1:00',
		edTime: '1:30',
		washingMachine: '---',
		dryingMachine: '---'
	})

	const [appointmentInfo, setAppointmentInfo] = useState({
		amountHours: '-:-',
		price: 0,
		extraPrice: 0,
		withDrying: false
	})


	const [isWeekends, setIsWeekends] = useState()

	const [daySchedule, setDaySchedule] = useState([])
	const [hours, setHours] = useState()
	const [washingMachineInfos, setWashingMachineInfos] = useState()
	const [dryingMachineInfos, setDryingMachineInfos] = useState()

	const [openPopUp, setOpenPopUp] = useState(false);
	const [msgPopUp, setMsgPopUp] = useState('');


	const callForPriceToBD = (hours) => {
		return { normalPrice: hours * (values.dryingMachine === '---' ? 6000 : 8000), extra: (remainingHours - hours < 0 ? (hours - Math.max(0, remainingHours)) * 1000 : 0) }
	}

	const getDayMatrix = async () => {
		try {
			const dat = new Date(values.date).toISOString()
			const machineSch = await axios.get(`${process.env.API_URL}/schedule/getDayMatrix/` + dat)

			if (machineSch.status === 200) {


				const allMachines = machineSch.data.allMachines
				const daySchedules = machineSch.data.daySchedules
				const dayMatr = []

				allMachines.sort((a, b) => {
					return a['serial'] > b['serial'] ? 1 : -1;
				});
				
				if (daySchedules != null && daySchedules.length > 0) {
					daySchedules.sort((a, b) => {
						return a['startDate'] > b['startDate'] ? 1 : -1;
					});
	
					for (let j = 0; j < allMachines.length; j++) {
						const machDay = []

						for (let i = (isWeekends ? 8 : 7.5); i < (isWeekends ? 22.5 : 21.5); i += 0.5) {
								machDay.push(true)
						}

						for (let i = 0; i < daySchedules.length; i++) {
							if( daySchedules[i].washingMachine._id === allMachines[j]._id || (daySchedules[i].dryingMachine != null && daySchedules[i].dryingMachine._id === allMachines[j]._id)) {
								
								let stTime = (hourToNum(daySchedules[i].startTime.split('T')[1].substring(0, 6)))
								let edTime = (hourToNum(daySchedules[i].endTime.split('T')[1].substring(0, 6)))
								if(stTime < 7){
									stTime += 24
								}
								if(edTime < 7){
									edTime += 24
								}

								stTime -= (3 + (isWeekends ? 8 : 7.5))
								edTime -= (3 + (isWeekends ? 8 : 7.5))
								
								machDay.splice(stTime / 0.5, (edTime - stTime) / 0.5)
								for(let k = 0; k < (edTime - stTime) / 0.5; k++){
									machDay.splice(stTime / 0.5, 0, false)
								}

								
								 
							}
						}

						dayMatr.push({id:  allMachines[j]._id, serial: allMachines[j].serial,type : allMachines[j].machineType, ableUse: machDay })
					}
				} else {
					for (let j = 0; j < allMachines.length; j++) {
						const machDay = []

						for (let i = (isWeekends ? 8 : 7.5), k = 0; i < (isWeekends ? 22.5 : 21.5); i += 0.5) { 
							machDay.push(true)
						}

						dayMatr.push({id:  allMachines[j]._id, serial: allMachines[j].serial, type : allMachines[j].machineType, ableUse: machDay })
					}


				}

				setDaySchedule(dayMatr)//CALL DATA BASE

				return machineSch.data
			} else {
				
				showPopUp("Error: " + machineSch.data.message)
				return null
			}

		} catch (err) {
			showPopUp("Error: no se pudo obtener maquinas")
			console.log(err)
		}
	}

	const onAppointmentChange = (e, val) => {

		if (e === 'date') {
			const isW = (new Date(val).getDay() - 5 >= 0)
			setIsWeekends(isW)
			

			if (isW && hourToNum(values.stTime) < 8) {
				if (hourToNum(values.edTime) === 8) {
					setValues({ ...values, ['stTime']: '8:00', ['edTime']: '8:30', [e]: val })
				} else {
					setValues({
						...values, ['stTime']: '8:00', [e]: val
					})
				}
				return
			}
			if (!isW && hourToNum(values.edTime) > 21) {
				if (hourToNum(values.stTime) >= 21) {
					setValues({ ...values, ['stTime']: '20:30', ['edTime']: '21:00', [e]: val })
				} else {
					setValues({ ...values, ['edTime']: '21:00', [e]: val })
				}
				return
			}
		}

		if (e === 'stTime') { //7:30 - 21 o 8 - 22
			let auxT = hourToNum(val)

			if (auxT >= hourToNum(values.edTime)) {
				auxT = Math.ceil(auxT) + ":" + (auxT % 1 == 0 ? "30" : "00")
				setValues({ ...values, ['edTime']: auxT, [e]: val })

				return

			}
		}

		setValues({ ...values, [e]: val })
	}


	const computeAppointmentInfo = () => {
		let aHours = hourToNum(values.edTime) - hourToNum(values.stTime)
		aHours = Math.floor(aHours) + (aHours % 1 > 0.1 ? 0.5 : 0)

		if (aHours != appointmentInfo.amountHours || (values.dryingMachine != '---') != appointmentInfo.withDrying) {

			const infoPrice = callForPriceToBD(aHours)

			setAppointmentInfo({ amountHours: aHours, price: infoPrice.normalPrice, extraPrice: infoPrice.extra, withDrying: (values.dryingMachine != '---') })
		}
	}

	useEffect(() => { computeAppointmentInfo() }, [values.dryingMachine, values.stTime, values.edTime])

	useEffect(() => {
		const stIndexPeriod = (hourToNum(values.stTime) - (isWeekends ? 8 : 7.5)) / 0.5
		const edIndexPeriod = (hourToNum(values.edTime) - (isWeekends ? 8 : 7.5)) / 0.5

		setWashingMachineInfos(getMachines(true, stIndexPeriod, edIndexPeriod, daySchedule))
		setDryingMachineInfos(getMachines(false, stIndexPeriod, edIndexPeriod, daySchedule))

	}, [values.stTime, values.edTime, daySchedule])

	useEffect(() => {
		if (!washingMachineInfos) { return }
		let wMachine = '---'
		let dMachine = '---'
		washingMachineInfos.map((machine) => {
			if (machine.ableUse) {
				wMachine = machine.serial
				return
			}
		})

		if (appointmentInfo.withDrying) {
			dryingMachineInfos.map((machine) => {
				if (machine.ableUse) {
					dMachine = machine.serial
					return
				}
			})
		}

		setValues({ ...values, washingMachine: wMachine, dryingMachine: dMachine })


	}, [washingMachineInfos, dryingMachineInfos])

	useEffect(() => {
		getDayMatrix()
		if (values.date === minDate.slice(0, 10)) {
			setHours(getHours(isWeekends, { ok: true, hour: currDate.getUTCHours() }))
			onAppointmentChange('stTime', (currDate.getUTCHours() + 1) + ":00")
		} else {
			setHours(getHours(isWeekends, { ok: false, hour: 0 }))
		}
	}, [values.date])

	useEffect(() => { onAppointmentChange('date', minDate.slice(0, 10)) }, [])

	const createSchedule = async () =>{
		try {
			console.log(props)
			const wash =  daySchedule.find(obj => obj.serial === values.washingMachine)
			const dry = daySchedule.find(obj => obj.serial === values.dryingMachine)

			if(!wash){ 
				showPopUp('No hay una lavadora selecccionada, si no hay disponible elija otro horario') 
				return 
			}
			const stDate = new Date(values.date + "T" + (values.stTime.length < 5 ? "0" : '' ) + values.stTime)
			const edDate = new Date(values.date + "T" + (values.edTime.length < 5 ? "0" : '' ) + values.edTime)

			const toSend = { state : 'utilized', //add maintenace
				washingMachine :wash.id,
				dryingMachine : (dry ? dry.id : null),
				user : props.sub,
				startTime : stDate,
				endTime: edDate}

			const response = await axios.post(`${process.env.API_URL}/schedule/${props.sub}`, toSend)

			if (response.status === 200) {
				console.log(response.data)
				router.push('/schedule/'+response.data.createdSchedule._id)
			}else {
				showPopUp("Error: " + response.data.message)
			}
		} catch (err) {
			showPopUp("Error: " + err)
			console.log(err)
		}
	}

	const showPopUp = (msg) => {
		setMsgPopUp(msg)
		setOpenPopUp(true)
	}

	const showHours = (isStart) => {
		let isOkHour = isStart


		return hours.map((hour, i, arr) => {
			if (isOkHour && (!isStart || i < arr.length - 1)) {
				return (
					<Td key={hour} mx='auto' borderWidth='0' w='80px' h='64px' >
						<Button borderWidth='2px' borderColor='brand.500' w='70px' colorScheme='white' color='brand.500' ml='-5'
							_hover={{ bg: 'brand.500', color: 'white' }}
							onClick={() => onAppointmentChange(isStart ? 'stTime' : 'edTime', hour)}>
							{hour}
						</Button>
					</Td>
				)
			} else {
				isOkHour = (values.stTime == hour)
			}
		})
	}

	const showMachines = (isWashingMachine) => {
		const machines = (isWashingMachine ? washingMachineInfos : dryingMachineInfos)


		return machines.map((machine, i, arr) => {

			let sColor = (machine.ableUse ? 'brand.500' : 'brand.100')
			let swColor = (machine.ableUse ? brandCol500 : brandCol100)

			function handleClick(ableUse, serial) {
				if (serial === 'Ninguna') {
					onAppointmentChange(isWashingMachine ? 'washingMachine' : 'dryingMachine', '---');
					return
				}

				if (!ableUse) {
					showPopUp(((isWashingMachine ? "Lavadora" : "Secadora") + " no disponible"));
					return
				}

				onAppointmentChange(isWashingMachine ? 'washingMachine' : 'dryingMachine', serial)
			}

			return (
				<Td key={machine} mx='auto' w='90px' h='150px' >

					<Flex cursor='pointer' direction='column' alignItems='center' fontWeight='medium' color={sColor} w='80px' h='120px' border='2px' ml='-5' rounded='xl'
						_hover={{ bg: swColor, color: 'white' }} onClick={() => handleClick(machine.ableUse, machine.serial)}>
						<Spacer maxH='2' />

						<Box position='relative' color='currentcolor' >
							{(machine.serial != 'Ninguna' && ((isWashingMachine &&
								<WashingMachineIcon width='80' height='80' fill={machine.ableUse ? 'currentColor' : swColor} />) ||
								<DryingMachineIcon width='80' height='80' fill={machine.ableUse ? 'currentColor' : swColor} />)) ||
								<Box width='0' height='74' mb='1' />
							}

							{!machine.ableUse &&
								<Box position='absolute' top="-4" left={machine.serial != 'Ninguna' ? '1px' : '-37px'} zIndex="2" w='80px' h='110px'
									display="flex" justifyContent="center" alignItems="center" _hover={{ color: 'white' }} color={machine.serial != 'Ninguna' ? 'whiteAlpha.50' : 'currentcolor'}>
									<BlockedIcon fill='currentColor' width='95' height='95' top='-20px' />
								</Box>
							}

						</Box>
						
						{isWashingMachine || i > 0 ? "#" : ''}{machine.serial}
					</Flex>

				</Td>
			)
		})
	}

	const objectPicker = (objectsPick, valuePick, title, leftIcon) => {

		const [isOpen, setIsOpen] = useState(false);

		return (
			<>
				<Flex w='60vw' bg='white' maxH='15vh' minH='5vh' mt='5vh' roundedTop='xl' align="center" cursor="pointer" alignItems='center'
					roundedBottom={isOpen ? 0 : 'xl'} onClick={() => setIsOpen(!isOpen)} >

					<Text ml='1vw' mr='auto' display='flex' justifyContent="center" alignItems="center" fontSize={props.width > 600 && props.height > 500 ? '3vh' : '4vw-2vh'} fontWeight="thin">
						<Box mt='0.5'>	{leftIcon}</Box> <Box ml='1vw'> {title}</Box>
					</Text>

					<Flex bg='brand.500' maxH='7' minH='5vh' w='full' maxW={props.width > 800 ? '10vw' : '25vw'} alignContent='center' alignItems='center' rounded='xl' roundedBottomRight={isOpen ? 0 : 'xl'}>
						<Text ml='3' fontSize={props.width > 600 && props.height > 500 ? '2vh' : '3vw-2vh'} fontWeight="bold" w='full' maxW='20' alignSelf='center' align='center' color='white' >
							{valuePick} </Text>
						<Box mr='3' ml='auto' color='white' h='full' w='full' maxW='10' >
							{isOpen ? <ChevronDownIcon boxSize='full' /> : <ChevronUpIcon boxSize='full' />}
						</Box>
					</Flex>


				</Flex>

				<Box as={Collapse} w='60vw' in={isOpen}>
					<Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" />
					<Table w='full' display='flex' roundedBottom='xl' bg='white' flexWrap='wrap' alignContent='center' align='center'>
						<Tbody w='full' mx='5' mb='8' mt='4' flexWrap='wrap' display="grid" gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))" >
							{isOpen && objectsPick()}
						</Tbody>
					</Table>
				</Box>
			</>
		)
	}

	const extraInfo = () => {

		const [isOpen, setIsOpen] = useState(false);
		const finalHourCount = remainingHours - appointmentInfo.amountHours
		const formatedFinalHors = Math.floor(Math.abs(finalHourCount)) + ":" + (Math.abs(finalHourCount) % 1 > 0.1 ? "30" : "00")
		const formatedHours = Math.floor(appointmentInfo.amountHours) + ":" + (appointmentInfo.amountHours % 1 > 0.1 ? "30" : "00")
		return (
			<>
				<Flex minW='100px' w='300px' maxW='60vw' bg='white' maxH='15vh' minH='5vh' mt='10vh' roundedTop='xl' align="center" cursor="pointer" alignItems='center'
					onClick={() => setIsOpen(!isOpen)}>
					<Text ml='1vw' mr='auto' display='flex' justifyContent="center" alignItems="center" fontWeight="thin">
						<Box mt='0.5'><ScheduleIcon width='40' height='40' fill={brandCol500} /> </Box> <Box ml='1vw' overflowWrap='wrap' flexWrap='wrap'> Informacion del Agendamiento</Box>
					</Text>

					<Flex bg='brand.500' maxH='full' minH='full' w='20' alignContent='center' alignItems='center' rounded='xl' roundedBottomRight={isOpen ? 0 : 'xl'}  >
						<Box mx='auto' color='white' h='full' w='full' maxW='20' >
							{isOpen ? <ChevronDownIcon boxSize='full' /> : <ChevronUpIcon boxSize='full' />}
						</Box>
					</Flex>
				</Flex>
				<Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" bg='white' />
				<Box bg='white' minW='100px' w='300px' maxW='60vw' minH='120%' maxH='1000' as={Collapse} in={isOpen}>
					<Flex alignSelf='center' justifyContent="start" alignItems="start" flexWrap='wrap' >
						<Flex ml='5' mr='auto' mt='2' boxSize='full' alignItems='center' justifyContent='center'>
							<Text fontWeight='normal' color='brand.500' fontSize='16' mr='10px' >Descripcion:</Text>
							<Text ml='auto' mr='3' fontWeight='thin' color='black' fontSize={props.width / props.height < 1 ? '4vw' : '20'}>
								Lavado {appointmentInfo.withDrying && "y Secado"}</Text>
						</Flex>
						<Flex ml='5' mr='auto' mt='2' boxSize='full' alignItems='center' justifyContent='center'>
							<Text fontWeight='normal' color='brand.500' fontSize='16' mr='10px' >Duracion:</Text>
							<Text ml='auto' mr='5' fontWeight='thin' color='black' fontSize='20' >{formatedHours} Hrs</Text>
						</Flex>
						<Flex ml='5' mr='auto' mt='2' boxSize='full' alignItems='center' justifyContent='center'>
							<Text fontWeight='normal' color='brand.500' fontSize='16' mr='10px'>Precio:</Text>
							<Text ml='auto' mr='5' fontWeight='thin' color='black' fontSize='20'>${appointmentInfo.price}</Text>
						</Flex>
						<Flex ml='5' mr='auto' mt='2' flexWrap='nowrap' boxSize='full' alignItems='center' justifyContent='center' >
							<Text overflowX='clip' fontWeight='normal' color='brand.100' fontSize='16' mr='10px' overflow='clip' textOverflow="ellipsis" >Sobreuso:</Text>
							<Text ml='auto' mr='5' fontWeight='thin' color='black' fontSize='20'>+${appointmentInfo.extraPrice}</Text>
						</Flex>
					</Flex>
					<Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" mt='5' mb='5' w='80%' mx='auto' />
					<Flex alignSelf='center' justifyContent="start" alignItems="start" flexWrap='wrap' mb='5'>
						<Flex ml='5' mr='auto' mt='2' boxSize='full' alignItems='center' justifyContent='center'>
							<Text fontWeight='normal' color='brand.500' fontSize='16' mr='10px' >Total:</Text>
							<Text ml='auto' mr='5' fontWeight='thin' color='black' fontSize='20' >${appointmentInfo.price + appointmentInfo.extraPrice}</Text>
						</Flex>
						<Flex ml='5' mr='auto' mt='2' boxSize='full' alignItems='center' justifyContent='center'>
							<Text fontWeight='normal' color={finalHourCount >= 0 ? 'brand.500' : 'brand.100'} fontSize={props.width < 520 ? '3.5vw' : '18'} mr='10px'  >
								{finalHourCount >= 0 ? "Mensualidad restante:" : "Sobre mensualidad(+):"}</Text>
							<Text ml='auto' mr='5' fontWeight='thin' color='black' fontSize={props.width < 520 ? '4vw' : '20'}>{formatedFinalHors} Hrs</Text>
						</Flex>
					</Flex>
				</Box>
			</>
		)

	}


	return (
		<>
			<SideNavigationBar {...props} />
			<Container minH='92vh' minW='74vw' maxW='74vw' bg='whiteAlpha.800' centerContent overflow='hidden'>
				<Flex minW='200' w='60vw' maxW='300' bg='white' maxH='15vh' minH='5vh' rounded='xl' mt='5vh'>
					<Text overflow="hidden" textOverflow="ellipsis" alignSelf='center' ml='3vw' mr='auto' fontSize={props.width > 600 && props.height > 500 ? '3vh' : '4vw-2vh'} fontWeight="thin">
						Fecha:
					</Text>
					<Box as={Input} defaultValue={minDate.slice(0, 10)} alignSelf='center' maxH='7' minH='5vh' w='150px' type="date" rounded='xl' bg='brand.500' color='white' fontWeight='medium'
						min={minDate.slice(0, 10)} max={maxDate.slice(0, 10)} onChange={(e) => onAppointmentChange('date', e.target.value)} />

				</Flex>

				{objectPicker(() => showHours(true), values.stTime, "Hora inicio:", <ClockIcon margin='3' width='30' height='30' fill={brandCol500} />)}
				{objectPicker(() => showHours(false), values.edTime, "Hora Termino:", <ClockIcon width='30' height='30' fill={brandCol500} />)}
				{objectPicker(() => showMachines(true), "#" + values.washingMachine, "Lavadora:", <WashingMachineIcon width='30' height='30' fill={brandCol500} />)}
				{objectPicker(() => showMachines(false), "#" + values.dryingMachine, "Secadora:", <DryingMachineIcon width='30' height='30' fill={brandCol500} />)}

				{extraInfo()}
				<Flex minW='100px' w='300px' maxW='60vw' justifyContent="center" pt='20px' alignItems="center" minH='50px' roundedBottom='xl' bg='white' mb='30px' >
					<Button bg={brandCol500} color='white' h='60px' minW='200' w='20vw' mb='10px' fontWeight='bold' border='2px' borderColor='black' _hover={{ borderColor: 'brand.500', bg: 'white', color: brandCol500 }}
					onClick={()=> createSchedule()}>
						<ConfirmScheduleIcon min-height='50px' height='50px' min-width='50px' width='50px' fill='currentColor' margin-right='30' />
						A g e n d a r <Spacer w='5' minW='3' maxW='5' /> H o r a </Button>
				</Flex>

				<Modal isOpen={openPopUp} onClose={() => setOpenPopUp(false)} >
					<ModalOverlay>
						<ModalContent bg='brand.100'>
							<ModalHeader textAlign='center' color='white'>{msgPopUp}</ModalHeader>
						</ModalContent>
					</ModalOverlay>
				</Modal>
			</Container>
		</>
	)
}

//array with around 28 numbers 14 hours - 28 half hours

const chekAvailability = (machine, st, ed) => {
	for (let i = st; i < ed; i++) {
		if (!machine[i]) { return false }
	}

	return true
}

const getMachines = (isWashingMachine, stIndexPeriod, edIndexPeriod, datMatr) => { //datMatr 

	if (datMatr.length == 0) { return }
	console.log("onGetMachines " + {datMatr})
	const machines = []
	if (!isWashingMachine) { machines.push({ serial: 'Ninguna', ableUse: false }) }

	console.log(stIndexPeriod + " ed " + edIndexPeriod + "  " + datMatr)
	for (let i = 0; i < datMatr.length; i++) {
		
		if((!isWashingMachine && datMatr[i].type === 'washingMachine') || 
		(isWashingMachine && datMatr[i].type === 'dryingMachine') ){ continue }
		machines.push({ serial: datMatr[i].serial, ableUse: chekAvailability(datMatr[i].ableUse, stIndexPeriod, edIndexPeriod) })
	}
	return machines
}

const getHours = (isWeekends, isToday) => {

	const timeMatrix = [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0]

	const timeHour = isWeekends ? { ini: 8, end: 22.5 } : { ini: 7.5, end: 21.5 };
	const iniHour = (isToday.ok ? (isToday.hour > timeHour.ini ? isToday.hour + 1 : timeHour.ini) : timeHour.ini);
	const endHour = timeHour.end

	const halfHours = []

	for (let i = iniHour; i < endHour; i += 0.5) {
		halfHours.push(Math.floor(i) + (i % 1 != 0 ? ":30" : ":00"))
	}
	return halfHours
}


const hourToNum = (toConv) => {
	return Number.parseInt(toConv.substring(0, toConv.indexOf(":"))) + (Number.parseInt(toConv.substring(toConv.indexOf(":") + 1, toConv.length)) * 0.01 > 0 ? 0.5 : 0)
}

export default scheduling
