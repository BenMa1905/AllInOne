import { useState, useEffect } from 'react'
import {
	Textarea, Button, Container, Table, Thead, Tr, Td, Th, Tbody, Text, Box, Flex, Divider, Collapse, Input,
	Icon, IconButton, useTheme, Spacer, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, Select, InputLeftAddon, InputGroup, color
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
//import axios from 'axios'
import { useRouter } from 'next/router'
import { WashingMachineIcon, ScheduleIcon, HistoryIcon, BlockedIcon, DryingMachineIcon, ClockIcon, ConfirmScheduleIcon } from '../public/SVGsResources'
import SideNavigationBar from '../components/SideNavigationBar'
import { FaUserAlt, FaArrowRight, FaEye, FaTools } from 'react-icons/fa'
import axios from 'axios'

const jwt = require('jwt-simple');

export async function getServerSideProps(context) {
    try {
		const decoded = jwt.decode(context.req.headers.cookie.split('=')[1], process.env.SECRET_KEY)
		console.log(decoded)
        let response = await axios.get(`${process.env.API_URL}/schedules/` + null)
		
		console.log(response.data)
		
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
		let previousPageUrl = context.req.headers.referer;
		if(!previousPageUrl){ previousPageUrl = '/' }
		return {
            redirect: {
                destination: previousPageUrl,
                permanent: true
            }
        }
    }
}


const schedules = (props) => {

	const formatSchedules = (schedules) =>{
		if(!schedules){ return null}
		return schedules.map((sched)=>{
			return {
				id: sched._id,
				description: (sched.state === 'maintenace' ? 'maintenace' : (sched.dryingMachine != null ? 'washingDrying' : 'washing')),
				date: sched.startTime.split('T')[0],
				stTime: sched.startTime.split('T')[1].substring(0, 5),
				edTime: sched.endTime.split('T')[1].substring(0, 5),
				serial: (sched.washingMachine ?sched.washingMachine.serial : '??') + (sched.dryingMachine ? " #"+sched.dryingMachine.serial : ''),
				user: sched.user.name
			}
		})
	} 
	const router = useRouter()
	const theme = useTheme()
	const brandCol500 = theme.colors.brand[500]
	const brandCol100 = theme.colors.brand[100]
	const [items, setItems] = useState(formatSchedules(props.data)); 
	
	const [searchTerm, setSearchTerm] = useState({
		serial: '',
		stDate: '',
		edDate: '',
		user: '',
		useType: '-'
	});
	const [sortColumn, setSortColumn] = useState('date'); 
	const [sortDirection, setSortDirection] = useState('asc'); 
	console.log(props)
	const filteredItems = (!items ? null : (items.filter(item => {
		
		return ((props.role === 'admin' || item.user.toLowerCase() === props.name) &&
			item.serial.toString().includes(searchTerm.serial) && item.user.toLowerCase().includes(searchTerm.user.toLowerCase()) &&
			(searchTerm.useType === '-' || item.description === searchTerm.useType) &&
			(searchTerm.stDate === '' || item.date >= searchTerm.stDate) && (searchTerm.edDate === '' || item.date <= searchTerm.edDate))
	})));

	// Sort the filtered items based on the sort column and direction
	const sortedItems = (!filteredItems ? null : filteredItems.sort((a, b) => {
		if (sortDirection === 'asc') {
			if (typeof a[sortColumn] === 'string') {
				return a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase() ? 1 : -1;
			} else {
				return a[sortColumn] > b[sortColumn] ? 1 : -1;

			}
		} else {
			if (typeof a[sortColumn] === 'string') {
				return a[sortColumn].toLowerCase() < b[sortColumn].toLowerCase() ? 1 : -1;
			} else {
				return a[sortColumn] < b[sortColumn] ? 1 : -1;
			}
		}
	}));

	const onFilterChange = (e, val) => {
		setSearchTerm({ ...searchTerm, [e]: val })
	}
	const onSortChange = (val) => {
		if (sortColumn != val) {
			setSortColumn(val)
			setSortDirection('asc')
		} else {
			setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')

		}
	}
	const showSchedule = (e) =>{
		router.push('/schedule/'+e)
	}
//20489055-5
	const showSchedules = ()=>{
		if(!sortedItems){ return <Text mx ='auto' fontSize='3vw' textAlign='center'> No hay agendamientos </Text> }

		return sortedItems.map((schedule, i, arr) => (
			<Tr key={schedule.id} w='100%' borderTop='0' borderBottom='dashed' borderWidth={i < arr.length - 1 ? '1px' : '0'} borderBottomColor='brand.500' display='flex' justifyContent='space-between' alignItems='center'>

				<Td w='18%' maxW='18%' minW='18%' display='flex' justifyContent='center' alignItems='center'>
					<Flex _hover={{ bg: 'blue.50' }} maxW='100%' p='5px' rounded='xl' border='1px' borderColor='brand.500' mx='auto' mr={schedule.description === 'washingDrying' ? '30px' : 'auto'}
						justifyContent='center' title={schedule.description[0] === 'm' ? 'Mantenimiento' : (schedule.description.length > 7 ? 'Lavado y secado' : 'Lavado')} alignItems='center'>

						{(schedule.description === 'maintenance' && <Box as={FaTools} mx='auto' width='30px' height='30px' fill={brandCol500} />) ||
							(<Box as={WashingMachineIcon} mx='auto' width='40px' height='40px' fill={brandCol500} />)}

						{schedule.description === 'washingDrying' && (<><Box as={FaArrowRight} mx='2px' fill={brandCol500} w='20px' h='20px' />
							<Box as={DryingMachineIcon} mx='auto' width='35px' height='35px' fill={brandCol500} /></>)}

					</Flex>
					<Box borderRight='1px' ml='auto' mr='-5' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
				</Td>

				<Td w='30%' maxW='30%' fontSize='15' textAlign='center' display='flex' justifyContent='center' alignItems='center'>
					{schedule.date} :
					<Box borderRight='1px' mx='1' mt='6px' w='2px' maxW='2px' borderRightColor='white' h='20px' />
					{schedule.stTime}
					<Box as={FaArrowRight} mx='2' fill={brandCol500} w='10px' h='10px' />
					{schedule.edTime}
					<Box borderRight='1px' ml='auto' mr='-5' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
				</Td>

				<Td w='17%' display='flex' justifyContent='center' alignItems='center'>#{schedule.serial}
					<Box borderRight='1px' ml='auto' mr='-5' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
				</Td>

				<Td w='20%' minW='20%' maxW='20%' display='flex' justifyContent='center' alignItems='center' overflowY='clip' >
					<Text textOverflow='ellipsis' overflow='clip' ml='0' mr='10px'> {schedule.user}</Text>
					<Box borderRight='1px' ml='auto' mr='-5' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
				</Td>

				<Td w='17%' display='flex' justifyContent='center' alignItems='center'>
					<Button onClick={(e)=> showSchedule(schedule.id)} bg='brand.500' border='1px' borderColor='brand.500' color='white' _hover={{ color: 'brand.500', bg: 'white' }} title='Ver agendamiento' >
						<ScheduleIcon width='30px' height='30px' fill='currentcolor' />
						<FaEye style={{ marginLeft: '-8px', marginTop: '5px' }} width='30px' height='30px' fill='currentcolor' /> </Button>
				</Td>
			</Tr>
		))
	}

	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<SideNavigationBar {...props} />
			<Container minH='92vh' minW='74vw' maxW='74vw' bg='whiteAlpha.800' centerContent overflow='hidden'>
				<Flex w='70vw' roundedTop='xl' bg='white' border='1px' borderColor='black' borderBottom='double' flexWrap='wrap' borderBottomColor='gray.400' mt='10' justifyContent='space-between' alignItems='center'>
					<Text w='100%' textAlign='center' pt='2' color='brand.500' fontWeight='bold' borderBottom='dotted' borderBottomColor='brand.500' h='10'>
						BUSQUEDA
					</Text>
					<Flex justifyContent='space-between' alignItems='center' mx='auto' min='60%' flexWrap='wrap'>
						<Flex mx='auto' justifyContent='center' alignItems='center'>
							<Text w='15' mr='5'> Desde: </Text>
							<Input ml='0' borderColor='brand.500' mr='10' w='30' my='2' h='10' type="date" value={searchTerm.stDate} onChange={(e) => onFilterChange('stDate', e.target.value)} />
						</Flex>

						<Flex mx='auto' justifyContent='center' alignItems='center'>
							<Text w='15' mr='5'> Hasta: </Text>
							<Input ml='0' mr='10' borderColor='brand.500' w='30' my='2' h='10' type="date" value={searchTerm.edDate} onChange={(e) => onFilterChange('edDate', e.target.value)} />
						</Flex>
					</Flex>
					<Flex mx='auto' alignContent='center' alignItems='center' textAlign='start' w='max' h='100%' cursor='pointer'
						color='brand.500' onClick={() => setIsOpen(!isOpen)} justifyContent='center'>
						Busqueda avanzada
						<Box mr='3' ml='auto' color='white' minH='100%' w='full' maxW='10' >
							{isOpen ? <ChevronDownIcon boxSize='full' color='brand.500' /> : <ChevronUpIcon boxSize='full' color='brand.500' />}
						</Box>

					</Flex>

					<Box w='100%' as={Collapse} in={isOpen} >

						<Divider borderColor="gray.200" borderWidth="1px" />
						<Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>

							<Flex justifyContent='space-between' alignItems='center' mx='auto' >
								<Text w='15' mr='3'> Tipo: </Text>
								<Select borderColor='brand.500' w='30' value={searchTerm.useType} onChange={e => onFilterChange('useType', e.target.value)} >
									<option key={'none'} value={'-'}> Cualquiera </option>
									<option key={'washing'} value={'washing'}> Lavado </option>
									<option key={'washingDrying'} value={'washingDrying'}> Lavado y secado </option>
									<option key={'maintenance'} value={'maintenance'}> Mantenimiento </option>
								</Select>
							</Flex>

							<InputGroup mx='auto' w='200px' maxW='200px' minW='200px' my='2' h='10' justifyContent='center' alignItems='center'>
								<Text mr='3'> Serial: </Text>
								<InputLeftAddon textColor='white' bg='brand.500' borderColor='brand.500' w='10' p='0' pl='3.5' children='#' />
								<Input borderColor='brand.500' type="number" value={searchTerm.serial} onChange={e => onFilterChange('serial', e.target.value)} />

							</InputGroup>
							<InputGroup mx='auto' w='250px' maxW='300px' minW='250px' my='2' h='10' justifyContent='center' alignItems='center'>
								<Text mr='3'>  Usuario: </Text>
								<InputLeftAddon bg='brand.500' borderColor='brand.500' w='10' p='0' pl='2.5' children={<FaUserAlt fill='white' />} />
								<Input borderColor='brand.500' type="name" value={searchTerm.user} onChange={e => onFilterChange('user', e.target.value)} />

							</InputGroup>

						</Flex>
					</Box>
				</Flex>


				<Box w='70vw' bg='white' minH='100px' scrollBehavior='smooth' overflowX={props.width < 1100 ? "scroll" : 'hidden'} border='1px' borderColor='black' borderBottomColor='white' borderTopColor='white'>
					<Table mt='2' minW='800px' >
						<Thead>
							<Tr borderBottom='1px' borderColor='gray.300' display='flex' justifyContent='space-between' alignItems='center' >
								<Th display='flex' w='100%' cursor='pointer' onClick={() => onSortChange('description')}>
									Tipo
									<Box mr='3' ml='auto' color='white' minH='50%' w='5' maxW='7' >
										{sortColumn === 'description' && (sortDirection === 'asc' ? <ChevronDownIcon boxSize='full' color='brand.500' /> : <ChevronUpIcon boxSize='full' color='brand.500' />)}
									</Box>
								</Th>
								<Th>
									<Box borderRight='1px' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
								</Th>

								<Th display='flex' w='170%' cursor='pointer' onClick={() => onSortChange('date')}>
									Fecha
									<Box mr='3' ml='auto' color='white' minH='50%' w='5' maxW='7' >
										{sortColumn === 'date' && (sortDirection === 'asc' ? <ChevronDownIcon boxSize='full' color='brand.500' /> : <ChevronUpIcon boxSize='full' color='brand.500' />)}
									</Box>
								</Th>
								<Th>
									<Box borderRight='1px' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
								</Th>
								<Th display='flex' w='70%' maxW='70%' cursor='pointer' onClick={() => onSortChange('serial')}>
									Maquina
									<Box mr='3' ml='auto' color='white' minH='50%' w='5' maxW='7' >
										{sortColumn === 'serial' && (sortDirection === 'asc' ? <ChevronDownIcon boxSize='full' color='brand.500' /> : <ChevronUpIcon boxSize='full' color='brand.500' />)}
									</Box>
								</Th>
								<Th>
									<Box borderRight='1px' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
								</Th>
								<Th display='flex' w='100%' cursor='pointer' onClick={() => onSortChange('user')}>
									Usuario
									<Box mr='3' ml='auto' color='white' minH='50%' w='5' maxW='7' >
										{sortColumn === 'user' && (sortDirection === 'asc' ? <ChevronDownIcon boxSize='full' color='brand.500' /> : <ChevronUpIcon boxSize='full' color='brand.500' />)}
									</Box>
								</Th>
								<Th>
									<Box borderRight='1px' mt='6px' w='2px' maxW='2px' borderRightColor='brand.500' h='20px' />
								</Th>
								<Th w='100%' >Expandir</Th>
								
							</Tr>
							
							<Tr mt = '0' maxH = '10px' p = '0' w = 'full%'>
								<Td mt = '0' w = 'full%' p = '0' maxH = '10px' mx = '0'>
									<Box mt = '0' mb = 'auto' h='10px' w='full' style={{ background: 'linear-gradient(to bottom, rgba(0.9, 0.9, 0.9, 0.2), rgba(0.9, 0.9, 0.9, 0))' }} />
								</Td>
							</Tr>
							
						</Thead>
						
						<Box as={Tbody} minW='800px' overflowY='scroll' maxH='500px' display='flex' justifyContent='start' alignItems='start' flexWrap='wrap'>
							{ showSchedules()}
						</Box>
					</Table>
				</Box>

				<Box w='70vw' bg='white' h='20px' roundedBottom='xl' mb = '30px' border='1px' borderColor='black' borderTop='dashed' borderTopColor='brand.500' />

			</Container>
		</>
	)
}


export default schedules
