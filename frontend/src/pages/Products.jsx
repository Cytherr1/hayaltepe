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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:3000/general/product/getAllProduct",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.success) {
        setProducts(responseData.products);
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
          return(
            <ProductCard
              key={product.ID}
              image={product.IMAGE}
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