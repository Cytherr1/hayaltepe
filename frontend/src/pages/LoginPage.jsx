import React from 'react'
import {
  Flex,
  Heading
} from '@chakra-ui/react'
import { FormattedMessage } from "react-intl"
import LoginForm from "../components/LoginForm"

const LoginPage = () => {
	return (
		<Flex
      bgColor="y.500"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      h="85vh"
      gap="2em"
    >
			<Heading size="lg"><FormattedMessage id='loginp'/></Heading>
			<LoginForm/>
		</Flex>
	)
}

export default LoginPage