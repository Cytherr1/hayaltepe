import React from 'react'
import {
	Flex,
	Heading,
	Text,
	VStack,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

const NotFound = () => {
	return (
		<Flex
      alignItems="center"
      justifyContent="center"
      bg="y.500"
      minW="sm"
      minH="87vh"
      p="1em"
      pt="4em"
      pb="4em"
      w="100%"
    >
			<VStack gap={5}>
				<Heading size="4xl" color="dg.500" textAlign="center">404</Heading>
				<Heading size="lg" color="dg.500" textAlign="center"><FormattedMessage id='notfound'/></Heading>
				<Text><FormattedMessage id='notfounddesc'/></Text>
      </VStack>
		</Flex>
	)
}

export default NotFound