import React, { useRef } from 'react'
import logo from '../assets/ht_logo_m.png'
import tr from '../assets/tr.png'
import en from '../assets/en.png'
import {
  Flex,
  Spacer,
  Button,
  Center,
  Text,
  Image,
  UnorderedList,
  ListItem,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FormattedMessage, useIntl} from 'react-intl'
import { Link } from 'react-router-dom'

const NavbarMobile = (props) => {

  const toast = useToast();
  const intl = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const langChangeHandler = (lan) => {
    props.langSelector(lan)
  }

  return (
    <>
      <Flex
        bg="black"
        maxH="20px"
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
        bg="#5F6F52"
        maxH="80px"
        gap={3}
        >
        <Spacer/>
        <Center
          bgGradient="linear(to-b, y.500, g.500)"
          borderRadius="0px 0px 5px 5px"
          boxShadow="md"
          minW="120px"
          zIndex={10}
        >
          <Image
            boxSize="120px"
            src={logo}
            alt='Hayaltepe Logo'
          />
        </Center>
        <Spacer/>
        <Spacer/>
        <Button variant="nav" w="42px" ref={btnRef} onClick={onOpen}><HamburgerIcon/></Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay/>
          <DrawerContent bgColor="g.500">
            <DrawerCloseButton/>
            <DrawerHeader></DrawerHeader>

            <DrawerBody>
              <UnorderedList
                style={{display: "flex", flexDirection:"column", gap: "3em"}}
                styleType="none"
              >
                <ListItem onClick={onClose} _hover={{color: "dg.500"}} fontWeight="semibold" transition="0.3s" as={Link} to="/"><FormattedMessage id='home'/></ListItem>
                <ListItem onClick={onClose} _hover={{color: "dg.500"}} fontWeight="semibold" transition="0.3s" as={Link} to="/products"><FormattedMessage id='products'/></ListItem>
                <ListItem fontWeight="semibold" transition="0.3s" as={Accordion} allowMultiple>
                  <AccordionItem border="none">
                    <AccordionButton pl="0" _hover={{color: "dg.500"}} fontWeight="semibold">
                      <FormattedMessage style={{padding: "none"}} id='corpo'/>
                    </AccordionButton>
                    <AccordionPanel>
                      <Text as={Link} onClick={onClose} _hover={{color: "dg.500"}} fontWeight="semibold" transition="0.3s" to="/corporate/about"><FormattedMessage id='about'/></Text>
                    </AccordionPanel>
                    <AccordionPanel>
                      <Text as={Link} onClick={onClose} _hover={{color: "dg.500"}} fontWeight="semibold" transition="0.3s" to="/corporate/privacy"><FormattedMessage id='privacy'/></Text>
                    </AccordionPanel>
                  </AccordionItem>
                </ListItem>
                <ListItem onClick={onClose} _hover={{color: "dg.500"}} fontWeight="semibold" transition="0.3s" as={Link} to="/contact"><FormattedMessage id='contact'/></ListItem>
              </UnorderedList>
            </DrawerBody>

            <DrawerFooter>
              <Flex gap="1em">
                {!localStorage.getItem("auth-token") ?
                <>
                <Button variant="form" as={Link} to="/login" onClick={onClose}><FormattedMessage id='login'/></Button>
                <Button variant="form" as={Link} to="/register" onClick={onClose}><FormattedMessage id='register'/></Button>
                </>
                :
                <Button variant="form" onClick={() => {
                  onClose();
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
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Spacer/>
      </Flex>
    </>
  )
}

export default NavbarMobile