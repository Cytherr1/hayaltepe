import React, { useEffect } from 'react'
import { 
  useMediaQuery,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Box,
  Text,
  Heading,
  Center,
  Divider,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation } from 'react-router-dom'
import Policy from '../components/Policy'
import About from '../components/About'

const Corporate = (props) => {

  const [isMobile] = useMediaQuery("(max-width: 768px)")
  let location = useLocation()

  useEffect(() => {
    if (location.pathname === '/corporate/privacy') {
      props.tabSetter(1)
    }
    else {
      props.tabSetter(0)
    }
  }, [location])

  return (
    <Center
      w="100%"
      minH="85vh"
      p="5em"
      bg="y.500"
    >
      <Box
        w="95%"
        minW="md"
        borderWidth="2px"
        borderRadius="lg"
        p="1em"
        bg="g.500"
      >
        <Tabs
          variant="solid-rounded"
          orientation='vertical'
          index={props.index}
          defaultIndex={props.index}
          colorScheme="g"
          size="sm"
          fontSize={isMobile ? "0.50rem" : "1rem"}
          p="1em"
          >
          {!isMobile &&
          <TabList gap="1em" p="none" alignItems="center" w={150}>
            <Tab w={150} as={Link} to="/corporate/about" onClick={() => props.tabSetter(0)}><FormattedMessage id='about'/></Tab>
            <Tab w={150} as={Link} to="/corporate/privacy" onClick={() => props.tabSetter(1)}><FormattedMessage id='privacy'/></Tab>
          </TabList>}

          <TabPanels>
            <TabPanel p="3em">
              <Heading size="xl"><FormattedMessage id='about'/></Heading>
              <br/>
              <Text fontSize="md"><About/></Text>
            </TabPanel>
            <TabPanel p="3em">
              <Heading size="xl"><FormattedMessage id='privacy'/></Heading>
              <br/>
              <Text fontSize="md"><Policy/></Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  )
}

export default Corporate