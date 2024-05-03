import React from 'react'
import {
	Heading,
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
			alignItems="center" 
			justifyContent="center"
			bgColor="b.500" 
			borderColor='black' 
			boxShadow="2xl"
			borderRadius="2xl"
			p={2}
			gap={3}
		>
			<CardBody p={2}>
				<Image src={props.image} alt='product image' borderRadius='2xl' boxSize='250'/>
			</CardBody>
			<Heading size='md' maxW="250px">{props.name}</Heading>
			<CardFooter p={2}>
				<Button bgColor="y.500" opacity="0.8" borderRadius="2xl" w="250px" as={Link} href={props.url} _hover={{textDecoration: "none", opacity: "1", bgColor: "y.500"}}><FormattedMessage id='buy'/></Button>
			</CardFooter>
		</Card>
  )
}

export default ProductCard