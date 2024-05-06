import { 
  Flex, 
  Spacer,
  VStack,
  Image,
  Heading,
  UnorderedList,
  Text,
  ListItem,
} from '@chakra-ui/react'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import logo from '../assets/ht_logo_m.png'
import { Link } from 'react-router-dom'

const Footer = (props) => {
  return (
    <VStack spacing="none">
      <Flex
        width="100%"
        align="center"
        justify="center"
        bg="g.500"
        p="1em"
        gap="1.5em"
        flexWrap="wrap"
        minH="80vh"
      >
        <Spacer/>
        <VStack alignItems="flex-start" gap={30}>
          <Image src={logo} alt="Hayaltepe logo" boxSize="110px"/>
          <VStack align="flex-start">
            <Heading size="sm"><FormattedMessage id='qmenu'/></Heading>
            <UnorderedList style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0"}} spacing="0.5em">
              <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/"><FormattedMessage id='home'/></ListItem>
              <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/products"><FormattedMessage id='products'/></ListItem>
              <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/corporate"><FormattedMessage id='corpo'/></ListItem>
              <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/"><FormattedMessage id='home'/></ListItem>
            </UnorderedList>
          </VStack>
        </VStack>
        <Spacer/>
        <VStack alignItems="flex-start" p="1em" gap={50}>
          <VStack align="flex-start">
            <Heading size="sm"><FormattedMessage id='corpo'/></Heading>
            <UnorderedList style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0"}} spacing="0.5em">
              <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/corporate/about" onClick={() => props.tabSetter(0)}><FormattedMessage id='about'/></ListItem>
              <ListItem  _hover={{color: "#5F6F52"}} transition="0.3s" as={Link} to="/corporate/privacy" onClick={() => props.tabSetter(1)}><FormattedMessage id='privacy'/></ListItem>
            </UnorderedList>
          </VStack>
          <VStack align='flex-start'>
            <Heading size='sm'><FormattedMessage id='cinfo'/></Heading>
            <UnorderedList style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0"}} spacing="0.5em">
              <Text>Yeşilüzümlü mah. Fethiye/Muğla</Text>
              <Text>info@hayaltepe.com</Text>
              <Text>+90 541 487 59 78</Text>
            </UnorderedList>
          </VStack>
        </VStack>
      </Flex>
      <Flex align="center" justify="center" bg="#5F6F52" w="100%" p="1em"><FormattedMessage id='reserved'/> 2024 © | Hayaltepe</Flex>
    </VStack>
  )
}

export default Footer