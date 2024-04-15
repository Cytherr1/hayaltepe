import React, { useState, useEffect } from 'react'
import {
  Flex,
  Spinner,
  Text,
  Icon,
  VStack
} from '@chakra-ui/react'
import { WarningTwoIcon } from '@chakra-ui/icons'
import ProductCard from '../components/ProductCard'
import { FormattedMessage } from 'react-intl';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  // get products
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/getAllProducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
        setError(true);
      });
  }, []);
  

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg="y.500"
      minW="sm"
      minH="85vh"
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
          return (
            <ProductCard
              key={product.ID}
              image={product.PRODUCT_IMAGE}
              name={product.PRODUCT_NAME}
              url={product.PRODUCT_URL}
            />
          );
        })}
      </Flex>
    </Flex>
  )
}

export default Products