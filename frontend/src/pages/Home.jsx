import React from 'react'
import { VStack } from '@chakra-ui/react'
import BrandSection from '../components/BrandSection'
import Hero from '../components/Hero'
import TopProducts from '../components/TopProducts'

const Home = () => {
  return (
    <VStack gap="none">
      <Hero/>
      <BrandSection/>
      <TopProducts/>
    </VStack>
  )
}

export default Home