import React from 'react'
import logo from '../assets/ht_logo_m.png'
import tr from '../assets/tr.png'
import en from '../assets/en.png'
import {
  Flex,
  Spacer,
  Button,
  Center,
  Box,
  Image,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

const Navbar = (props) => {
  return (
    <>
      <Flex
        bg="black"
        maxH="25px"
        align="center"
        justify="flex-end"
      >
        <Image src={tr} alt='TR' width="16px" height="12px"/>
        <Button color="#FEFAE0" _hover={{color: "#B99470"}} bg="none">TR</Button>
        <Image src={en} alt='EN' width="16px" height="12px"/>
        <Button color="#FEFAE0" _hover={{color: "#B99470"}} bg="none">EN</Button>
      </Flex>
      <Flex 
        alignItems='center' 
        p="1.5em"
        bg="#5F6F52"
        maxH="100px"
        >
        <Center
          bg="#A9B388"
          borderRadius="md"
          boxShadow="md"
          zIndex={10}
        >
          <Image
            boxSize="150px"
            src={logo}
            alt='Hayaltepe Logo'
          />
        </Center>
        <Spacer/>
        <Box>zorzortzort</Box>
        <Spacer/>
        <Flex gap="1em">
          <Button><FormattedMessage id='login'/></Button>
          <Button><FormattedMessage id='register'/></Button>
        </Flex>
      </Flex>
    </>
  )
}

export default Navbar