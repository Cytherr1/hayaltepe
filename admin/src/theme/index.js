// Main theme entrypoint
import { extendTheme } from '@chakra-ui/react';
import colors from './foundations/colors'
import { components } from './components';


const overrides = {
    colors,
    components,
}

export default extendTheme(overrides)