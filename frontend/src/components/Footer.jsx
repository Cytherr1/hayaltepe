import { 
  Flex, 
  Spacer,
  VStack,
  Image,
  Heading,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import logo from '../assets/ht_logo_m.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <VStack spacing="none">
      <Flex
        width="100%"
        align="center"
        justify="center"
        bg="#A9B388"
        p="1em"
      >
        <Spacer/>
        <Image src={logo} alt="Hayaltepe logo" boxSize="200px"/>
        <Spacer/>
        <VStack>
          <Heading size="sm"><FormattedMessage id='qmenu'/></Heading>
          <UnorderedList style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}} spacing="0.5em">
            <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/"><FormattedMessage id='home'/></ListItem>
            <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/products"><FormattedMessage id='products'/></ListItem>
            <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/corporate"><FormattedMessage id='corpo'/></ListItem>
            <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/"><FormattedMessage id='home'/></ListItem>
          </UnorderedList>
        </VStack>
        <Spacer/>
        Footer
        <Spacer/>
      </Flex>
      <Flex align="center" justify="center" bg="#5F6F52" w="100%" p="1em"><FormattedMessage id='reserved'/> 2024 © | Hayaltepe</Flex>
    </VStack>
  )
}

export default Footer