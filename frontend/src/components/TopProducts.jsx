import React, { useState, useEffect } from 'react'
import {
	useMediaQuery,
	Spinner,
	Flex,
	VStack,
	HStack,
	Spacer,
	Heading,
	IconButton,
} from '@chakra-ui/react'
import { WarningTwoIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ProductCard from '../components/ProductCard'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'


const TopProducts = () => {

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
				setProducts(responseData.products.slice(0, 3));
				console.log(products);
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
			w="100%"
			h="65vh"
			bgColor="y.500"
			alignItems="center"
			justifyContent="center"
		>
			<HStack w="100%" alignItems="center" justifyContent="center" gap={7}>
				<Spacer/>
				<Spacer/>
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
								image={"http://localhost:3000/images/" + product.IMAGE}
								name={product.NAME}
								url={product.LINK}
							/>
						);
					}
				)}
				<Spacer/>
				<VStack gap={7}>
					<Heading>Ürünlerimize göz atın</Heading>
					<IconButton as={Link} boxSize={50} fontSize="75px" bg="none" borderRadius="50%" _hover={{bg: "none"}} icon={<ChevronRightIcon color="dg.500"/>} to='/products'/>
				</VStack>
				<Spacer/>
				<Spacer/>
			</HStack>
		</Flex>
	)
}

export default TopProducts