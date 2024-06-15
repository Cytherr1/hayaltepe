import React, { useState, useEffect } from 'react'
import {
  Flex,
  Spinner,
  Text,
  Icon,
  VStack,
  Heading
} from '@chakra-ui/react'
import { WarningTwoIcon, MoonIcon} from '@chakra-ui/icons'
import ProductCard from '../components/ProductCard'
import { FormattedMessage } from 'react-intl';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("general/product/getAllProduct", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

      if (response.data.success) {
        setProducts(response.data.products);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg="y.500"
      minW="sm"
      minH="87vh"
      p="1em"
      pt="4em"
      pb="4em"
      w="100%"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        wrap="wrap"
        gap="2em"
      >
        { products.length === 0 && !isLoading && !isError &&
          <VStack gap={5}>
            <Icon as={MoonIcon} boxSize={10} color="dg.500"/>
            <Heading size="lg" color="dg.500" textAlign="center"><FormattedMessage id='noproducth'/></Heading>
            <Text><FormattedMessage id='noproduct'/></Text>
          </VStack>
        }
        { isLoading && <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='y.500'
          color='g.500'
          size='xl'
        />}
        { !isLoading && isError && 
          <VStack>
            <Icon as={WarningTwoIcon} boxSize={10} color="dg.500"/>
            <Text fontSize="xl"><FormattedMessage id='productserror'/></Text>
          </VStack>
        }
        {products.map((product) => {
          return(
            <ProductCard
              key={product.ID}
              image={`${import.meta.env.VITE_APP_API_URL}images/` + product.IMAGE}
              name={product.NAME}
              url={product.LINK}
            />
          );
        })}
      </Flex>
    </Flex>
  )
}

export default Products