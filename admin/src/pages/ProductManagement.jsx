import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/product/getAllProduct", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        if (responseData.success) {
          setProducts(responseData.products);
        } else {
          alert(responseData.errors);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error has occurred.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box>
    <Box>
    <TableContainer m="4.5rem">
      <Table size="lg" variant="striped" colorScheme="gray">
        <TableCaption>All products</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Link</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product, index) => (
            <Tr key={index}>
              <Td>{product.NAME}</Td>
              <Td>{product.IMAGE}</Td>
              <Td>{product.LINK}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </Box>
    <Box>
      Add Product
    </Box>
    <Box>
      Update Product
    </Box>
    <Box>
      Delete Product
    </Box>
    </Box>
  );
};

export default ProductManagement;
