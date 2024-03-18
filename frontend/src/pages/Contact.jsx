import React from 'react'
import {
  useMediaQuery,
  Flex, 
  Box, 
  Text, 
  VStack,
  Heading,
  Spacer
} from '@chakra-ui/react'
import {
  PhoneIcon,
  EmailIcon,
  InfoIcon
} from '@chakra-ui/icons'
import ContactForm from '../components/ContactForm'
import Map from '../components/Map'
import { FormattedMessage } from 'react-intl'

const Contact = () => {

  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <Flex
      align="center"
      justify="center"
      p="3.5em"
      gap="1em"
      bg="y.500"
      w="100%"
    >
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : 'row'}
        justifyContent="center"
        alignItems="center"
        gap={isMobile ? "1em" : "none"}
        w="100%"
      >
        <Map/>
        <ContactForm/>
        <VStack 
          alignItems={isMobile ? "center" : "left"} 
          justify="center"
          gap="1.5em" 
          p="1.5em"
          h={isMobile ? "xs" : "xl"}
          borderWidth="2px"
          borderRadius={isMobile ? "lg" : "0px 10px 10px 0px"}
          bg="b.500"
          boxShadow="lg"
          w={isMobile ? "md" : "xs"}
        >
          <Spacer/>
          <Spacer/>
          <Heading size="lg"><FormattedMessage id='contus'/></Heading>
          <Heading size="md"><FormattedMessage id='cinfo'/></Heading>
          <Spacer/>
          <Text><InfoIcon/> Yeşilüzümlü mah. Fethiye/Muğla</Text>
          <Text><EmailIcon/> info@hayaltepe.com</Text>
          <Text><PhoneIcon/> +90 541 487 59 78</Text>
          <Spacer/>
          <Spacer/>
        </VStack>
      </Box>
    </Flex>
  )
}

export default Contact