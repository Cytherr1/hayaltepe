import React from 'react'
import {
	Flex, 
	Box, 
	Text, 
	VStack,
	Heading,
	Spacer,
	Center,
	Button,
	Card,
	CardBody,
	CardFooter,
	Image,
	Link
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

const BrandCard = (props) => {
	return (
		<Card
			w={275}
			h={500}
			borderRadius="2xl"
			bgColor="b.500"
			opacity={0.8}
			transition="0.3s"
			_hover={{opacity: "1"}}
			boxShadow="2xl"
		>
			{props.name === "Tisse" ?
				<Center w={275} h={275} borderTopRadius="2xl" bgColor="white">
					<Image boxSize={200} borderTopRadius="2xl" src={props.image} alt={`${props.name} logo`}/>
				</Center> :
				<Image boxSize={275} borderTopRadius="2xl" src={props.image} alt={`${props.name} logo`}/>
			}
			<CardBody>
				<VStack gap="1em" textAlign="center">
					<Heading size="md">{props.name}</Heading>
					<Text><FormattedMessage id={props.textId}/></Text>
				</VStack>
			</CardBody>
			<CardFooter alignItems="center" justifyContent="center">
				<Button variant="card" as={Link} href={props.url} _hover={{textDecoration: "none"}} w="xs" borderRadius="2xl"><FormattedMessage id='visit'/></Button>
			</CardFooter>
		</Card>
	)
}

export default BrandCard