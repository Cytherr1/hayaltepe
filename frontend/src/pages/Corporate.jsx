import React from 'react'
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Box,
  Text,
  Heading,
  Center,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

const Corporate = (props) => {
  return (
    <Center
      w="100%"
      h="85vh"
      p="1em"
      bg="y.500"
    >
      <Box
        w="95%"
        h="90%"
        borderWidth="2px"
        borderRadius="lg"
        p="1em"
        bg="b.500"
      >
        <Tabs 
          orientation='vertical'
          index={props.index}
          defaultIndex={props.index}
          >
          <TabList>
            <Tab as={Link} to="/corporate/about" onClick={() => props.tabSetter(0)}><FormattedMessage id='about'/></Tab>
            <Tab as={Link} to="/corporate/privacy" onClick={() => props.tabSetter(1)}><FormattedMessage id='privacy'/></Tab>
            <Tab as={Link} to="/corporate/contract" onClick={() => props.tabSetter(2)}><FormattedMessage id='dsc'/></Tab>
            <Tab as={Link} to="/corporate/refund" onClick={() => props.tabSetter(3)}><FormattedMessage id='refund'/></Tab>
          </TabList>

          <TabPanels>
            <TabPanel p="2em">
              <Heading size="xl"><FormattedMessage id='about'/></Heading>
              <Text>one!</Text>
            </TabPanel>
            <TabPanel p="2em">
              <Heading size="xl"><FormattedMessage id='privacy'/></Heading>
              <Text>two!</Text>
            </TabPanel>
            <TabPanel p="2em">
              <Heading size="xl"><FormattedMessage id='dsc'/></Heading>
              <Text>three!</Text>
            </TabPanel>
            <TabPanel p="2em">
              <Heading size="xl"><FormattedMessage id='refund'/></Heading>
              <Text>three!</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  )
}

export default Corporate