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
        bg="#A9B388"
        p="1em"
        flexWrap="wrap"
      >
        <Spacer/>
        <Image src={logo} alt="Hayaltepe logo" boxSize="200px"/>
        <Spacer/>
        <VStack align='flex-start'>
          <UnorderedList style={{display: "flex", flexDirection: "column", alignItems: "flex-start", margin: "0"}} spacing="0.5em">
            <Text>Yeşilüzümlü mah. Fethiye/Muğla</Text>
            <Text>info@hayaltepe.com</Text>
            <Text>+90 541 487 59 78</Text>
          </UnorderedList>
        </VStack>
        <Spacer/>
      </Flex>
      <Flex align="center" justify="center" bg="#5F6F52" w="100%" p="1em"><FormattedMessage id='reserved'/> 2024 © | Hayaltepe</Flex>
    </VStack>
  )
}

export default Footer