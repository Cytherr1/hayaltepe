import React from 'react'
import {
	Flex, 
	Box, 
	Text, 
	VStack,
	Heading,
	Spacer,
	Button,
	Card,
	CardBody,
	CardFooter,
	Image,
	Link
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

const ProductCard = (props) => {
  return (
		<Card 
			maxW="xs" 
			alignItems="center" 
			justifyContent="center" 
			bgColor="b.500" 
			borderColor='black' 
			boxShadow="2xl"
			borderRadius="2xl"
			p="0.5em"
		>
			<CardBody>
				<Image src={props.image} alt='product image' borderRadius='2xl' boxSize='250'/>
			</CardBody>
			<Heading size='md' maxW="250px">{props.name}</Heading>
			<CardFooter>
					<Link bgColor="y.500" opacity="0.8" borderRadius="3xl" w="250px" as={Button} href={props.url} _hover={{textDecoration: "none", opacity: "1", bgColor: "y.500"}}><FormattedMessage id='buy'/></Link>
			</CardFooter>
		</Card>
  )
}

export default ProductCard