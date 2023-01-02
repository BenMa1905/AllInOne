import { React, useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
const jwt = require('jwt-simple');
import Cookies from 'js-cookie'
import { verifyToken } from '../data/user'

import {
    Input, Stack, Button, DrawerOverlay, DrawerContent, DrawerCloseButton, Drawer,
    DrawerHeader, DrawerBody, DrawerFooter, Box, Flex, Text, IconButton, Icon, Divider,
    useTheme, Avatar, Menu, MenuButton, MenuList, MenuItem, HStack
} from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'
import { WashingMachineIcon, HomeIcon, ScheduleIcon, HistoryIcon, LogoLavanderia, FinancesIcon, SupplyIcon } from '../public/SVGsResources'

const SideNavigationBar = (viewportSize) => {
    const [isOpen, setIsOpen] = useState(false);
    const btnRef = useRef()


    const theme = useTheme()
    const generalColor = theme.colors.brand[500];
    const router = useRouter()


    const [homeButtCol, setHomeButtCol] = useState(generalColor)
    const [scheduleButtCol, setScheduleButtCol] = useState(generalColor)
    const [historyButtCol, setHistoryButtCol] = useState(generalColor)
    const [financesButtCol, setFinancesButtCol] = useState(generalColor)
    const [supplyButtCol, setSupplyButtCol] = useState(generalColor)

    const [decoded, setdecoded] = useState();
    const [userName, setusername] = useState();
    const [userId, setSub] = useState();

    useEffect(() => {async function decodificador(){
        try {
            const decoded = jwt.decode(document.cookie.split('=')[1],process.env.SECRET_KEY)
            if (decoded) {
                setdecoded(decoded)
                setusername(decoded.name)
                setSub(decoded.sub)
                // console.log(decoded)
            }
        } catch (error) { }
    }
    decodificador()
    }, [
    ])

const userIcon = '/favicon.ico'

return (
    <>
        <Flex justifyContent="space-between" alignItems="stretch" alignContent="stretch" spacing={4} bg="white" py='2' maxH='8vh' w="full"
            backgroundAttachment="fixed" position="fixed" zIndex="999" >

            <IconButton ref={btnRef} justifySelf="start" mr='0' alignSelf="center" h='8vh' rounded='0' colorScheme="white" onClick={() => setIsOpen(!isOpen)} _hover={{ bg: "brand.500" }} >
                <HamburgerIcon w={8} h='full' color="Black" />
            </IconButton>

            <Text color='brand.500' ml='-8vh' mr='-20vw' fontSize={viewportSize.width > 600 ? '3vw' : '4vh'} fontWeight="thin" justifySelf="center" alignSelf="center"
                display="flex" justifyContent="space-between" alignItems="center" clipPath='inset(0 0 3.5vh 0)' >
                <LogoLavanderia style={{ 'marginTop': '2px', 'marginRight': '8px' }} fill={generalColor} height='15vh' width='15vh' />
                LAVANDERIA
            </Text>

            <Menu align="center" justifySelf="end" alignSelf="center" w='20vw'>
                <MenuButton as={Button} colorScheme='brand' color='black' alignContent="stretch" bg='white' rounded='0' py='0' h='8vh' w='20vw'
                    align="center" justifySelf="center" alignSelf="center" _hover={{ bg: "brand.500" }}  >

                    <HStack>
                        <Avatar ml='1vw' h='6vh' w='6vh' src={userIcon} />
                        <Text alignSelf='center' fontWeight="medium" fontSize='-moz-initial'
                            overflow="hidden" textOverflow="ellipsis" pl='3' >
                            {userName}
                        </Text>
                    </HStack>

                </MenuButton>
                <MenuList borderBottom='1px' borderLeft='1px' borderTop='0' borderColor='brand.500' mt='-2' roundedTop='0' roundedBottom='xl' minW="20vw" align="center" justifySelf="start" alignSelf="center"  >
                    <MenuItem _hover={{ bg: "brand.500" }} _focus={{ bg: "brand.500" }} onClick={() => router.push(`/usuario/editarcl/${userId}`)}>
                        Editar Perfil</MenuItem>
                    <MenuItem _hover={{ bg: "brand.500" }} _focus={{ bg: "brand.500" }} onClick={() => router.push('/productos')}>
                        Ver Membresia</MenuItem>
                    <MenuItem _hover={{ bg: "brand.500" }} _focus={{ bg: "brand.500" }} onClick={() => { router.push("/"), Cookies.remove("token") }}>
                        Cerrar Sesion</MenuItem>
                </MenuList>
            </Menu>

        </Flex>
        <Divider borderColor="brand.500" borderWidth="1px" borderStyle="double" backgroundAttachment="fixed" position="fixed" zIndex="1" mt='8vh' />
        <Stack mb='8vh'></Stack>

        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={() => setIsOpen(false)}
            colorScheme="brand"
            finalFocusRef={btnRef}
        >

            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />

                <DrawerHeader display="flex" justifyContent="space-between" alignItems="center" mb={2} mr='10' >
                    <LogoLavanderia style={{ 'marginLeft': '10px', 'marginTop': '1px' }} fill={generalColor} width="80" height="80" />

                    <Text mx='auto' pt='1' fontSize="xl" fontWeight="thin" >LAVANDERIA</Text>
                </DrawerHeader>

                <Divider borderColor="brand.500" borderWidth="1px" borderStyle="dashed" mb={10} />

                <DrawerBody p={0}>
                    <Button

                        rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                        colorScheme='white' color='black'
                        display="flex" justifyContent="space-between" alignItems="center"

                        leftIcon={<HomeIcon fill={homeButtCol} width="42" height="42" />}

                        _hover={{ bg: "brand.500" }}
                        onMouseLeave={() => setHomeButtCol(generalColor)}
                        onMouseEnter={() => setHomeButtCol("#FFFFFF")}

                        onClick={() => router.push('/userPage', '/Usuario')} >

                        <Text ml='7' mr='auto'>Inicio</Text>
                    </Button>

                    <Button

                        rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                        colorScheme='white' color='black'
                        display="flex" justifyContent="space-between" alignItems="center"

                        leftIcon={<ScheduleIcon fill={scheduleButtCol} width="42" height="42" />}

                        _hover={{ bg: "brand.500" }}
                        onMouseLeave={() => setScheduleButtCol(generalColor)}
                        onMouseEnter={() => setScheduleButtCol("#FFFFFF")}
                        onClick={() => router.push('/scheduling')}
                    >

                        <Text ml='6' mr='auto'>Añadir agendamiento</Text>
                    </Button>

                    <Button

                        rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                        colorScheme='white' color='black'
                        display="flex" justifyContent="space-between" alignItems="center"

                        leftIcon={<HistoryIcon fill={historyButtCol} width="42" height="42" />}

                        _hover={{ bg: "brand.500" }}
                        onMouseLeave={() => setHistoryButtCol(generalColor)}
                        onMouseEnter={() => setHistoryButtCol("#FFFFFF")}

                        onClick={() => router.push('/shedules')}
                    >

                        <Text ml='6' mr='auto' >Agendamientos previos</Text>
                    </Button>

<Button
                            rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                            colorScheme='white' color='black'
                            display="flex" justifyContent="space-between" alignItems="center"
                            leftIcon={<FinancesIcon fill={financesButtCol} width="42" height="42" />}
                            _hover={{ bg: "brand.500" }}
                            onMouseLeave={() => setFinancesButtCol(generalColor)}
                            onMouseEnter={() => setFinancesButtCol("#FFFFFF")}
                            onClick={() => router.push('/Finances')}
                        >
                            <Text ml='6' mr='auto' >Contabilidad</Text>
                        </Button>

                        <Button
                            rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                            colorScheme='white' color='black'
                            display="flex" justifyContent="space-between" alignItems="center"
                            leftIcon={<SupplyIcon fill={supplyButtCol} width="42" height="42" />}
                            _hover={{ bg: "brand.500" }}
                            onMouseLeave={() => setSupplyButtCol(generalColor)}
                            onMouseEnter={() => setSupplyButtCol("#FFFFFF")}
                            onClick={() => router.push('/Supply')}
                        >
                            <Text ml='6' mr='auto' >Inventario</Text>
                        </Button>
                        <Button
                            rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                            colorScheme='white' color='black'
                            display="flex" justifyContent="space-between" alignItems="center"
                            leftIcon={<WashingMachineIcon fill={historyButtCol} width="42" height="42" />}
                            _hover={{ bg: "brand.500" }}
                            onMouseLeave={() => WashingMachineIcon(generalColor)}
                            onMouseEnter={() => WashingMachineIcon("#FFFFFF")}
                            onClick={() => router.push('/maquinaria')}
                        >
                            <Text ml='6' mr='auto' >Ver Maquinaria</Text>
                        </Button>
                        <Button
                            rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                            colorScheme='white' color='black'
                            display="flex" justifyContent="space-between" alignItems="center"
                            leftIcon={<MoneyIcon fill={historyButtCol} width="42" height="42" />}
                            _hover={{ bg: "brand.500" }}
                            onMouseLeave={() => MoneyIcon(generalColor)}
                            onMouseEnter={() => MoneyIcon("#FFFFFF")}
                            onClick={() => router.push('/registrodepago')}
                        >
                            <Text ml='6' mr='auto' >Ver registrodepago</Text>
                        </Button>
                        <Button
                            rounded='0' pr='10' pl='10' w='full' mb={2} h='16'
                            colorScheme='white' color='black'
                            display="flex" justifyContent="space-between" alignItems="center"
                            leftIcon={<MoneyIcon fill={historyButtCol} width="42" height="42" />}
                            _hover={{ bg: "brand.500" }}
                            onMouseLeave={() => MoneyIcon(generalColor)}
                            onMouseEnter={() => MoneyIcon("#FFFFFF")}
                            onClick={() => router.push('/pagosdeusuario')}
                        >
                            <Text ml='6' mr='auto' >Ver pagos de usuario</Text>
                        </Button>
                </DrawerBody>

                <DrawerFooter>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>


    </>
)
}

export default SideNavigationBar
