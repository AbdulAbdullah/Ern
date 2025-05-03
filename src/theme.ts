import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'whiteAlpha.900',
      }
    }
  },
  colors: {
    brand: {
      50: '#f0e7ff',
      100: '#d1bfff',
      200: '#b397ff',
      300: '#946fff',
      400: '#7547ff',
      500: '#5c2ffc',
      600: '#4723c2',
      700: '#341989',
      800: '#210f51',
      900: '#0f051a',
    }
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'whiteAlpha.50',
            _hover: {
              bg: 'whiteAlpha.100',
            },
            _focus: {
              bg: 'whiteAlpha.100',
            },
          },
        },
      },
    },
  },
});

export default theme;