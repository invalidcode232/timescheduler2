import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript, extendTheme, ThemeConfig } from '@chakra-ui/react'

function MyApp({ Component, pageProps }: AppProps) {
  const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }

  const theme = extendTheme({ config });

  return (
    <>
      <ColorModeScript initialColorMode='dark' />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default MyApp
