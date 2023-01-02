import '../styles/globals.css'
import { ChakraProvider, extendTheme, ThemeProvider, Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const jwt = require('jwt-simple');
const theme = extendTheme({
  colors: {
    brand: {
      50: "#44337A",
      100: "#f09090", //#f06078  #f09090 #bb5877
      500: '#60D3F4', //alternative #344fa6

    }
  }
});

function MyApp({ Component, pageProps }) {
  const [viewportSize, setViewportSize] = useState({
    width: 0,
    height: 0
  });

  const [credentials, setCredentials] = useState({});


  useEffect(() => {
    function handleResize() {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    handleResize()
    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  useEffect(() => {
    const onCookies = async () => {
      try {
        console.log(document.cookie)
        const response = jwt.decode(document.cookie.split('=')[1], process.env.SECRET_KEY)
        if (response) {
          setCredentials(response)
        }
      } catch (error) {
        console.log(error)
      }
    }
    onCookies()
  }, [])


  return (
    <ChakraProvider >
      <ThemeProvider theme={theme} >
        <Box
          w="full" h='full'
          css={{
            backgroundImage: "url(/background.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: 'initial',
            position: "fixed",
            zIndex: "-1"
          }}
        >
        </Box>

        {<Component {...pageProps} {...viewportSize} {...credentials} />}
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default MyApp
