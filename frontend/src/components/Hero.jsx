import React from 'react'
import {
	useMediaQuery,
	Flex,
	HStack,
	Heading,
	Divider,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'
import ht_hero from '../assets/ht_hero.jpg'

const Hero = () => {
	return (
		<Flex
			bgColor="y.500"
			w="100%"
			h="87vh"
			backgroundImage={ht_hero}
			backgroundRepeat="no-repeat"
			backgroundPosition="center"
			backgroundSize="cover"
			alignItems="center"
			justifyContent="center"
		>
			<Heading bgGradient="linear(to-r, b.500, y.500)" size="2xl" bgClip="text">BİR HAYAL KURDUK, ADINI HAYALTEPE KOYDUK</Heading>
		</Flex>
	)
}

export default Hero