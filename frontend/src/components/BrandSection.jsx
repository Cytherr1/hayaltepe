import React from 'react'
import {
	useMediaQuery,
	Flex,
	HStack,
	Heading,
	Divider,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'
import BrandCard from './BrandCard'
import tisselogo from "../assets/logo512.png"
import sapalogo from "../assets/sapa-logo.jpg"
import saltalogo from "../assets/salta-logo.jpg"

const BrandSection = () => {
	
	const [isMobile] = useMediaQuery("(max-width: 768px)")

	const brands = [
		{
			name: "Tisse",
			logo: tisselogo,
			url: "https://tisse.net",
			textId: "tisse",
		},
		{
			name: "Sapa",
			logo: sapalogo,
			url: "http://sapacampertrailers.com",
			textId: "sapa",
		},
		{
			name: "Salta",
			logo: saltalogo,
			url: "http://saltaboatsandyachts.com",
			textId: "salta",
		}
	]

	return (
		<Flex
			bgColor="y.500"
			w="100%"
			minH="75vh"
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			gap="3em"
			p={isMobile ? "5em" : "3em"}
		>
			<Heading><FormattedMessage id='brands'/></Heading>
			<Divider borderColor="b.500"/>
			<HStack gap="5em" wrap="wrap" alignItems="center" justifyContent="center">
				{brands.map((brand, i) => {
					return <BrandCard key={i} name={brand.name} image={brand.logo} url={brand.url} textId={brand.textId}></BrandCard>
				})}
			</HStack>
			<Divider borderColor="b.500"/>
		</Flex>
	)
}

export default BrandSection