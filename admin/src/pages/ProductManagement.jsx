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
  Input,
  FormControl,
  FormLabel,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/admin/product/getAllProduct",
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
        <FormControl>
          <TableContainer m="4.5rem">
            <Table size="lg" variant="striped" colorScheme="gray">
              <TableCaption>All products</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Image</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, index) => (
                  <Tr key={index}>
                    <Td>{product.ID}</Td>
                    <Td>{product.NAME}</Td>
                    <Td>{product.IMAGE}</Td>
                    <Td>{product.LINK}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </FormControl>
      </Box>
      <Box
        minW="sm"
        maxW="md"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        bgColor="white"
        p="1em"
      >
        <Formik
          initialValues={{
            name: "",
            image: null,
            link: "",
          }}
          onSubmit={(values, { resetForm }) => {
            // addProduct(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            image: Yup.mixed()
              .test("fileSize", "Image size is too large", (value) => {
                if (!value) return false;
                return value.size <= 5242880;
              })
              .test("fileType", "Unsupported file type", (value) => {
                if (!value) return false;
                return ["image/jpeg", "image/png"].includes(value.type);
              })
              .required("Please select an image file"),
            link: Yup.string().required(),
          })}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack gap="1em">
                <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="name">
                    Name
                  </FormLabel>
                  <Field as={Input} id="name" name="name" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="image">
                    Image
                  </FormLabel>
                  <Field as={Input} id="image" name="image" type="file"/>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="link">
                    Link
                  </FormLabel>
                  <Field as={Input} id="link" name="link" />
                </FormControl>
                <Button w="100%" type="submit">
                  Add Product
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
      <Box
        minW="sm"
        maxW="md"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        bgColor="white"
        p="1em"
      >
        <Formik
          initialValues={{
            id: "",
            name: "",
            image: null,
            link: "",
          }}
          onSubmit={(values, { resetForm }) => {
            // updateProduct(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            id: Yup.number().required(),
            name: Yup.string().required(),
            image: Yup.mixed()
              .test("fileSize", "Image size is too large", (value) => {
                if (!value) return false;
                return value.size <= 5242880;
              })
              .test("fileType", "Unsupported file type", (value) => {
                if (!value) return false;
                return ["image/jpeg", "image/png"].includes(value.type);
              })
              .required("Please select an image file"),
            link: Yup.string().required(),
          })}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack gap="1em">
              <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="id">
                    ID
                  </FormLabel>
                  <Field as={Input} id="id" name="id" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="name">
                    Name
                  </FormLabel>
                  <Field as={Input} id="name" name="name" />
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="image">
                    Image
                  </FormLabel>
                  <Field as={Input} id="image" name="image" type="file"/>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="link">
                    Link
                  </FormLabel>
                  <Field as={Input} id="link" name="link" />
                </FormControl>
                <Button w="100%" type="submit">
                  Update Product
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
      <Box
        minW="sm"
        maxW="md"
        borderWidth="2px"
        borderRadius="lg"
        overflow="hidden"
        bgColor="white"
        p="1em"
      >
        <Formik
          initialValues={{
            id: "",
            name: "",
            image: null,
            link: "",
          }}
          onSubmit={(values, { resetForm }) => {
            // deleteProduct(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            id: Yup.number().required(),
            name: Yup.string().required(),
            image: Yup.mixed()
              .test("fileSize", "Image size is too large", (value) => {
                if (!value) return false;
                return value.size <= 5242880;
              })
              .test("fileType", "Unsupported file type", (value) => {
                if (!value) return false;
                return ["image/jpeg", "image/png"].includes(value.type);
              })
              .required("Please select an image file"),
            link: Yup.string().required(),
          })}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack gap="1em">
              <FormControl>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="id">
                    ID
                  </FormLabel>
                  <Field as={Input} id="id" name="id" />
                </FormControl>
                <Button w="100%" type="submit">
                  Delete Product
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ProductManagement;
