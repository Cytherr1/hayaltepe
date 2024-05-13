import React from 'react'
import {
  Flex,
  Heading
} from '@chakra-ui/react'
import { FormattedMessage } from "react-intl"
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
	return (
		<Flex
      bgColor="y.500"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      minH="90vh"
      gap="2em"
      p="3em"
    >
			<Heading size="lg"><FormattedMessage id='registerp'/></Heading>
			<RegisterForm/>
		</Flex>
	)
}

export default RegisterPage