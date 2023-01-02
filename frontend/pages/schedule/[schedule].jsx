import { useState, useEffect } from 'react'
import {
    Textarea, Button, Container, Table, Thead, Tr, Td, Th, Tbody, Text, Box, Flex, Divider, Collapse, Input,
    Icon, IconButton, useTheme, Spacer, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, Select, InputLeftAddon, InputGroup, color, ModalFooter, ModalCloseButton
} from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
//import axios from 'axios'
import { useRouter } from 'next/router'
import { WashingMachineIcon, ScheduleIcon, HistoryIcon, BlockedIcon, DryingMachineIcon, ClockIcon, ConfirmScheduleIcon, MoneyIcon } from '../../public/SVGsResources'
import SideNavigationBar from '../../components/SideNavigationBar'
import { FaUserAlt, FaArrowRight, FaEye, FaTools, FaArrowLeft, FaTrashAlt } from 'react-icons/fa'


import axios from 'axios'

export async function getServerSideProps(context) {
    try {

        const response = await axios.get(`${process.env.API_URL}/schedule/search/${context.query.schedule}`)
        if (response.status === 200) {
            return {
                props: {
                    data: response.data
                }
            }
        } else {
            return {
                props: {
                    data: false
                }
            }
        }

    } catch (err) {
        console.log(err)
        let previousPageUrl = context.req.headers.referer;
        if (!previousPageUrl || previousPageUrl === context.req.headers.url) { previousPageUrl = '/' }
        return {
            redirect: {
                destination: previousPageUrl,
                permanent: true
            }
        }
    }
}

const scheduleView = (props) => {
    const router =useRouter()
    const theme = useTheme()
    const brandCol500 = theme.colors.brand[500]
    const brandCol100 = theme.colors.brand[100]

    const [item, setItem] = useState({
        id: props.data._id,
        description: (props.data.state === 'maintenace' ? 'maintenace' : (props.data.washingMachine != null ? 'washingDrying' : 'washing')),
        date: props.data.startTime.split('T')[0],
        stTime: props.data.startTime.split('T')[1].substring(0, 5),
        edTime: props.data.endTime.split('T')[1].substring(0, 5),
        serial: (props.data.washingMachine ?props.data.washingMachine.serial : '?') + (props.data.dryingMachine ? " #"+props.data.dryingMachine.serial : ''),
        user: props.data.user.name
    });

    const [openPopUp, setOpenPopUp] = useState(false);
    const [msgPopUp, setMsgPopUp] = useState('');

    const showPopUp = (msg) => {
        setMsgPopUp(msg)
        setOpenPopUp(true)
    }
     const deleteSchedule = async ()=>{
        try {

            const response = await axios.delete(`${process.env.API_URL}/schedule/delete/${item.id}`)
            if (response.status === 200) {
                router.push('/schedules')
            } else {
                showPopUp("No se pudo eliminar(" + response.message+") ¿Reintentar?")
            }
    
        } catch (err) {
            showPopUp("No se pudo eliminar(" + err +")")
            console.log(err)
        }
    }

    return (
        <>
            <SideNavigationBar {...props} />
            <Container minH='92vh' minW='60vw' maxW='60vw' bg='whiteAlpha.800' centerContent overflow='hidden'>

                <Box minW='min-content' maxW='73vw' mb='60px' mt='30px' border='2px' borderColor='black' rounded='xl' w='50vw' bg='white' display='flex' justifyContent='center' alignItems='center' flexWrap='wrap'>
                    <Text display='flex' justifyContent='center' w='100%' bg='brand.500' py='auto' mx='auto' borderBottom='double' fontSize={props.width > 600 ? '150%' : '120%'} h={props.width > 500 ? '150%' : '120%'} fontWeight='thin'
                        borderBottomColor='black' roundedTop='xl' color='white'> INFORMACION DEL AGENDAMIENTO </Text>

                    <Box mx='auto' mt='40px'>
                        <Box roundedTop='xl' border='1px' borderColor='brand.500' borderBottom='0' h='20px' mt='30px'>
                            <Box as={ScheduleIcon} mx='auto' bg='white' mt='-50px' fill='gray.600' width='80px' height='80px' />
                        </Box>

                        <Box mx='auto' my='10px' h='35vh' w='min-content' mt='0' display='flex' fontSize='110%' border='1px' flexWrap='wrap' borderColor='brand.500' borderTop='0' rounded='xl' roundedTop='0' justifyContent='center' alignItems='center'>
                            <Flex w='fit-content' mx='auto' mt='10px'>
                                <Box as={ScheduleIcon} mr='10px' my='auto' fill={brandCol500} width='30px' height='30px' />
                                <Text color='brand.500' my='auto' fontWeight='medium' mr='10px'>Fecha:</Text> <Text fontWeight='thin' my='auto'>{item.date}</Text>

                            </Flex>

                            <Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" my='0' />

                            <Flex w='fit-content' mx='2vw' my='auto'  >
                                <Box as={ClockIcon} mr='5px' my='auto' fill={brandCol500} width='30px' height='30px' />
                                <Text color='brand.500' fontWeight='medium' my='auto' mr='2vw'>Inicio:</Text> <Text my='auto' fontWeight='thin'>{item.stTime}</Text>
                                <Box as={FaArrowRight} my='auto' mx='2vw' fill={brandCol500} w='20px' h='20px' />
                                <Text color='brand.500' fontWeight='medium' my='auto' mr='2vw'>Termino:</Text> <Text my='auto' fontWeight='thin'>{item.edTime}</Text>
                            </Flex>

                            <Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" my='0' />
                            <Flex w='fit-content' mb='10px'>
                                <Text color='brand.500' fontWeight='medium' mr='10px' my='auto'>Tipo:</Text>

                                <Flex _hover={{ bg: 'blue.50' }} maxW='100%' my='auto' p='5px' rounded='xl' border='1px' borderColor='brand.500' mx='auto' mr={item.description === 'washingDrying' ? '30px' : 'auto'}
                                    justifyContent='center' title={item.description[0] === 'm' ? 'Mantenimiento' : (item.description.length > 7 ? 'Lavado y secado' : 'Lavado')} alignItems='center'>

                                    {(item.description === 'maintenance' && <Box as={FaTools} mx='auto' width='30px' height='30px' fill='gray.600' />) ||
                                        (<Box as={WashingMachineIcon} mx='auto' width='40px' height='40px' fill='gray.600' />)}

                                    {item.description === 'washingDrying' && (<><Box as={FaArrowRight} mx='2px' fill={brandCol500} w='20px' h='20px' />
                                        <Box as={DryingMachineIcon} mx='auto' width='35px' height='35px' fill='gray.600' /></>)}

                                </Flex>
                            </Flex>

                        </Box>
                    </Box>

                    <Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" my='0' />

                    <Box mx='10px' mt='25px'>
                        <Box roundedTop='xl' border='1px' borderColor='brand.500' borderBottom='0' h='20px' mt='30px'>
                            <Box as={MoneyIcon} mx='auto' bg='white' mt='-50px' fill='gray.600' width='80px' height='80px' />
                        </Box>

                        <Box mx='auto' my='10px' h='20vh' w='min-content' mt='0' display='flex' fontSize='110%' border='1px' flexWrap='wrap' borderColor='brand.500' borderTop='0' rounded='xl' roundedTop='0' justifyContent='center' alignItems='center'>
                            <Flex w='fit-content' mx='auto' mt='10px'>
                                <Box as={MoneyIcon} mr='10px' my='auto' fill={brandCol500} width='30px' height='30px' />
                                <Text color='brand.500' my='auto' fontWeight='medium' mr='10px'>Precio:</Text> <Text fontWeight='thin' my='auto'>$10.000</Text>

                            </Flex>

                            <Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" my='0' />

                            <Flex w='fit-content' mx='2vw' my='auto' mt='5px'  >
                                <Box as={ClockIcon} mr='5px' my='auto' fill={brandCol500} width='30px' height='30px' />
                                <Text color='brand.500' fontWeight='medium' my='auto' mr='2vw'>Duracion:</Text> <Text my='auto' fontWeight='thin'>{item.stTime}</Text>
                            </Flex>
                        </Box>
                    </Box>

                    <Box mx='30px' mt='25px' minW='200px'>
                        <Box roundedTop='xl' border='1px' borderColor='brand.500' borderBottom='0' h='20px' mt='30px'>
                            <Box as={FaUserAlt} mx='auto' bg='white' mt='-50px' fill='gray.600' width='80px' height='80px' />
                        </Box>

                        <Box mx='auto' my='10px' h='10vh' w='min-content' minW='200px' mt='0' display='flex' fontSize='110%' border='1px' flexWrap='wrap' borderColor='brand.500' borderTop='0' rounded='xl' roundedTop='0' justifyContent='center' alignItems='center'>

                            <Flex w='fit-content' mt='10px'>
                                <Text color='brand.500' fontWeight='medium' my='auto' mr='2vw'>Usuario:</Text> <Text my='auto' fontWeight='thin'>{item.user}</Text>
                            </Flex>

                        </Box>
                    </Box>
                    <Box w='100%' alignSelf='flex-end' mb='30px' />

                    <Button bg={brandCol100} color='white' h='60px' mx='0' w='100%' maxW='70vw' rounded='xl' roundedTop='0' mb='0' fontWeight='bold'
                        borderTop='2px' borderColor='black' _hover={{ borderColor: 'brand.100', bg: 'white', color: brandCol100 }}
                        onClick={() => showPopUp(("¿Esta seguro de que desea borrar el agendemiento?"))}>

                        <BlockedIcon min-height='50px' height='50px' min-width='50px' width='50px' fill='currentColor' margin-right='30' />
                        C A N C E L A R <Spacer w='5' minW='3' maxW='5' /> A G E N D A M I E N T O </Button>
                </Box>

                <Modal isOpen={openPopUp} onClose={() => setOpenPopUp(false)} >
                    <ModalOverlay>
                        <ModalContent bg='brand.100'>
                            <ModalHeader textAlign='center' color='white'>{msgPopUp}</ModalHeader>

                            <ModalFooter display='flex' justifyContent='center'>
                                <Button onClick={() => setOpenPopUp(false)} bg={brandCol500} color='white' mx='auto' h='60px' minW='30' w='10vw' mb='10px' fontWeight='bold' border='2px' borderColor='black' _hover={{ borderColor: 'brand.500', bg: 'white', color: brandCol500 }}>

                                    Volver </Button>

                                <Button bg={brandCol100} color='white' h='60px' mx='auto' minW='30' w='10vw' mb='10px' fontWeight='bold' border='2px' borderColor='black' _hover={{ borderColor: 'brand.100', bg: 'white', color: brandCol100 }}
                                onClick={()=> deleteSchedule()}>
                                    <FaTrashAlt min-height='50px' height='50px' min-width='30px' width='30px' fill='currentColor' marginRight='5' />
                                    Borrar </Button>
                            </ModalFooter>
                        </ModalContent>

                    </ModalOverlay>
                </Modal>
            </Container>
        </>
    )
}


export default scheduleView
