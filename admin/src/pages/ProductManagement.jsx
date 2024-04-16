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
    fetchProducts();
  }, []);

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

  const addProduct = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/admin/product/add", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error has occured.");
    }
  };

  const updateProduct = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/admin/product/update",
        {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error has occured.");
    }
  };

  const deleteProduct = async (formData) => {
    try {
      const response = await fetch(
        "http://localhost:3000/admin/product/delete",
        {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error has occured.");
    }
  };

  return (
    <Box>
      <Box display="flex">
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
              image: "",
              link: "",
            }}
            onSubmit={(values, { resetForm }) => {
              addProduct(values);
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
                  <FormControl isInvalid={touched.name && errors.name}>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="name">
                      İsim
                    </FormLabel>
                    <Field as={Input} id="name" name="name" />
                  </FormControl>
                  <FormControl isInvalid={touched.image && errors.image}>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="image">
                      Görsel
                    </FormLabel>
                    <Field as={Input} id="image" name="image" type="file" />
                  </FormControl>
                  <FormControl isInvalid={touched.link && errors.link}>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="link">
                      Link
                    </FormLabel>
                    <Field as={Input} id="link" name="link" />
                  </FormControl>
                  <Button w="100%" type="submit">
                    Ürün Ekle
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
              image: "",
              link: "",
            }}
            onSubmit={(values, { resetForm }) => {
              updateProduct(values);
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
                  <FormControl isInvalid={touched.id && errors.id}>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="id">
                      ID
                    </FormLabel>
                    <Field as={Input} id="id" name="id" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="name">
                      İsim
                    </FormLabel>
                    <Field as={Input} id="name" name="name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="image">
                      Görsel
                    </FormLabel>
                    <Field as={Input} id="image" name="image" type="file" />
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="link">
                      Link
                    </FormLabel>
                    <Field as={Input} id="link" name="link" />
                  </FormControl>
                  <Button w="100%" type="submit">
                    Ürünü Güncelle
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
            }}
            onSubmit={(values, { resetForm }) => {
              deleteProduct(values);
              resetForm();
            }}
            validationSchema={Yup.object({
              id: Yup.number().required(),
            })}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack gap="1em">
                  <FormControl isInvalid={touched.id && errors.id}>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor="id">
                      ID
                    </FormLabel>
                    <Field as={Input} id="id" name="id" />
                  </FormControl>
                  <Button w="100%" type="submit">
                    Ürünü Sil
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </Box>

      <Box>
        <FormControl>
          <TableContainer>
            <Table size="lg" variant="striped" colorScheme="gray">
              <TableCaption>Bütün Ürünler</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>İsim</Th>
                  <Th>Görsel</Th>
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
    </Box>
  );
};

export default ProductManagement;
