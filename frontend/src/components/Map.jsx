import React from 'react'
import { 
	useMediaQuery,
	AspectRatio,
} from '@chakra-ui/react'

const Map = () => {

	const [isMobile] = useMediaQuery("(max-width: 768px)")

	return (
		<AspectRatio 
			minW={isMobile ? "md" : "2xl"}
			h="xl" 
			borderWidth="2px" 
			borderRadius={isMobile ? "lg" : "10px 0px 0px 10px"} 
			overflow="hidden"
			boxShadow="lg"
		>
			<iframe
				title='hayaltepe location'
				loading='lazy'
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102348.13807137153!2d29.185781895284943!3d36.713450418233485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c05172146d8c67%3A0x8b3f537b3a757cd9!2sHayaltepe%20Mountain%20Lodge%20-%20Organic%20Farm%20-%20Pelet!5e0!3m2!1str!2str!4v1708616496563!5m2!1str!2str"
			/>
		</AspectRatio>
  	)
}

export default Map