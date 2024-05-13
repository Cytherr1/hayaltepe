// Main theme entrypoint
import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors'
import borders from './foundations/borders'
import components from './components'


export const theme = extendTheme({
    colors,
    borders,
    components,
    fonts: {

    },
});