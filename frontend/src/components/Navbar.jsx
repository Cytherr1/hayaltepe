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
  UnorderedList,
  ListItem,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

const Navbar = (props) => {

  const toast = useToast();
  const intl = useIntl();
  const langChangeHandler = (lan) => {
    props.langSelector(lan);
  }

  return (
    <>
      <Flex
        bg="black"
        maxH="25px"
        align="center"
        justify="flex-end"
      >
        <Image src={tr} alt='TR' width="16px" height="12px"/>
        <Button color="#FEFAE0" _hover={{color: "#B99470", bg: "none"}} bg="none" onClick={() => langChangeHandler("TR")}>TR</Button>
        <Image src={en} alt='EN' width="16px" height="12px"/>
        <Button color="#FEFAE0" _hover={{color: "#B99470", bg: "none"}} bg="none" onClick={() => langChangeHandler("EN")}>EN</Button>
      </Flex>
      <Flex 
        alignItems='center' 
        p="1.5em"
        bg="dg.500"
        maxH="100px"
        gap={3}
        >
        <Spacer/>
        <Center
          bgGradient="linear(to-b, y.500, g.500)"
          borderRadius="0px 0px 5px 5px"
          boxShadow="md"
          minW="150px"
          zIndex={10}
        >
          <Image
            boxSize="150px"
            src={logo}
            alt='Hayaltepe Logo'
          />
        </Center>
        <Spacer/>
        <Spacer/>
        <UnorderedList
          style={{display: "flex", gap: "3em"}}
          styleType="none"
        >
          <ListItem _hover={{color: "#A9B388"}} fontWeight="semibold" transition="0.3s" as={Link} to="/"><FormattedMessage id='home'/></ListItem>
          <ListItem _hover={{color: "#A9B388"}} fontWeight="semibold" transition="0.3s" as={Link} to="/products"><FormattedMessage id='products'/></ListItem>
          <ListItem _hover={{color: "#A9B388"}} fontWeight="semibold" transition="0.3s" as={Link} to="/corporate"><FormattedMessage id='corpo'/></ListItem>
          <ListItem _hover={{color: "#A9B388"}} fontWeight="semibold" transition="0.3s" as={Link} to="/contact"><FormattedMessage id='contact'/></ListItem>
        </UnorderedList>
        <Spacer/>
        <Spacer/>
        <Flex gap="1em">
          {!localStorage.getItem("auth-token") ?
          <>
          <Button variant="nav" as={Link} to="/login"><FormattedMessage id='login'/></Button>
          <Button variant="nav" as={Link} to="/register"><FormattedMessage id='register'/></Button>
          </>
          :
          <Button variant="nav" onClick={() => {
            localStorage.removeItem("auth-token");
            toast({
              description: intl.formatMessage({ id: "toastlogoutsuccess" }),
              duration: 5000,
              isClosable: true,
            });
            setTimeout(() => {
              window.location.replace("/");
            }, 1500);
          }}>
            <FormattedMessage id='logout'/>
          </Button>
          }
        </Flex>
        <Spacer/>
      </Flex>
    </>
  )
}

export default Navbar