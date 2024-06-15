import React, { useState, useEffect } from 'react'
import {
	useMediaQuery,
	Text,
	Spinner,
	Flex,
	VStack,
	HStack,
	Heading,
	IconButton,
} from '@chakra-ui/react'
import { WarningTwoIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ProductCard from '../components/ProductCard'
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'
import axios from 'axios';

const TopProducts = () => {

	const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
	const [isMobile] = useMediaQuery("(max-width: 768px)")
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
				setProducts(response.data.products.slice(0, 3));
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
		products.length > 0 &&
		<Flex
			w="100%"
			minH="65vh"
			bgColor="y.500"
			alignItems="center"
			justifyContent="center"
			p="3em"
			gap={isMobile ? "50px" : "100px"}
			wrap="wrap"
		>
			<HStack gap="5em" wrap="wrap" alignItems="center" justifyContent="center">
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
			</HStack>
			<VStack gap={7} alignItems={isMobile ? "center" : "flex-start"}>
				<Heading color="dg.500"><FormattedMessage id='topproducth'/></Heading>
				<Text ><FormattedMessage id='topproduct'/></Text>
				<IconButton as={Link} boxSize={50} fontSize="75px" bg="none" borderRadius="50%" _hover={{bg: "none"}} icon={<ChevronRightIcon color="dg.500"/>} to='/products'/>
			</VStack>
		</Flex>
	)
}

export default TopProducts