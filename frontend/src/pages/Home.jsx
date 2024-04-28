import React from 'react'
import { VStack } from '@chakra-ui/react'
import BrandSection from '../components/BrandSection'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <VStack gap="none">
      <Hero/>
      <BrandSection/>
    </VStack>
  )
}

export default Home