import React from 'react'
import {
  useMediaQuery,
  Flex, 
  Box, 
  Text, 
  VStack,
  Heading,
  Spacer,
  Divider
} from '@chakra-ui/react'
import {
  PhoneIcon,
  EmailIcon,
  InfoIcon
} from '@chakra-ui/icons'
import ContactForm from '../components/ContactForm'
import Map from '../components/Map'
import { FormattedMessage } from 'react-intl'
import BrandSection from '../components/BrandSection'

const Contact = () => {

  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <Flex
      align="center"
      justify="center"
      minH="87vh"
      flexDirection="column"
      p="3.5em"
      gap="3em"
      bg="y.500"
      w="100%"
    >
      <Heading size="xl"><FormattedMessage id='contus'/></Heading>
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
          h={isMobile ? 400 : 475}
          borderWidth={isMobile ? "2px" : "2px 2px 2px 0px"}
          borderRadius={isMobile ? "lg" : "0px 10px 10px 0px"}
          borderColor="dg.500"
          bg="g.500"
          boxShadow="lg"
          w={isMobile ? "md" : "xs"}
        >
          <Spacer/>
          <Heading size="lg"><FormattedMessage id='cinfo'/></Heading>
          <Spacer/>
          <Divider borderColor="dg.500"/>
          <Spacer/>
          <Text fontWeight="600"><InfoIcon mr={2}/> Yeşilüzümlü mah. Fethiye/Muğla</Text>
          <Text fontWeight="600"><EmailIcon mr={2}/> info@hayaltepe.com</Text>
          <Text fontWeight="600"><PhoneIcon mr={1}/> +90 541 487 59 78</Text>
          <Spacer/>
          <Divider borderColor="dg.500"/>
          <Spacer/>
        </VStack>
      </Box>
      <BrandSection/>
    </Flex>
  )
}

export default Contact