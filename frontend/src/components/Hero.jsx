import React from 'react'
import {
	useMediaQuery,
	Flex,
	Image,
	Heading,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'
import ht_hero from '../assets/ht-hero.jpg'
import logo from '../assets/ht_logo_m.png'

const Hero = () => {

	const [isMobile] = useMediaQuery("(max-width: 768px)")

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
			flexDirection="column"
			gap="4em"
		>
			<Image boxSize={isMobile ? 150 : 350} src={logo} bgGradient="linear(to-b, y.500, g.500)" borderRadius="50%"/>
			<Heading w={isMobile ? "50%" : "100%"} textAlign="center" color="y.500" fontWeight={200} size={isMobile ? "lg" : "2xl"}>Bir Hayal Kurduk, Adını HAYALTEPE Koyduk</Heading>
		</Flex>
	)
}

export default Hero