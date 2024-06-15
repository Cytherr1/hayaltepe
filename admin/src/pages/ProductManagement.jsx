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
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const toast = useToast();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isAdjOpen, onOpen: onAdjOpen, onClose: onAdjClose } = useDisclosure();
  const { isOpen: isDelOpen, onOpen: onDelOpen, onClose: onDelClose } = useDisclosure();
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("admin/product/getAllProduct", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Ürünlere ulaşılamıyor lütfen tekrar deneyiniz.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addProduct = async (formData) => {
    try {
      await axiosInstance.post("admin/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if(response.data.success) {
        toast({
          title: "Başarılı!",
          description: "Ürün eklendi.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Ürün eklenemedi.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateProduct = async (formData) => {
    try {
      await axiosInstance.post("admin/product/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if(response.data.success) {
        toast({
          title: "Başarılı!",
          description: "Ürün başarıyla güncellendi.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }

    } catch (error) {
      toast({
          title: "Hata!",
          description: "Ürün güncellenemedi.",
          status: "error",
          duration: 5000,
          isClosable: true,
      });
    }
  };

  const deleteProduct = async (formData) => {
    try {
      const response = await axiosInstance.post("admin/product/delete", formData, {
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
          },
        });

        if(response.data.success) {
          toast({
            title: "Başarılı!",
            description: "Ürün başarıyla silindi.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Ürün silinemedi.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" gap="3.5em" w="100%" h="10vh" flexWrap="wrap">

      <Button variant="nav" onClick={onAddOpen}>Ürün Ekle</Button>
        <Modal isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay/>
          <ModalContent bgColor="y.500">
            <ModalHeader>Ürün Ekle</ModalHeader>
            <ModalCloseButton/>
            <ModalBody p="1em">
              <Box
                minW="sm"
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="dg.500"
                overflow="hidden"
                bgColor="g.500"
                p="1em"
              >
                <Formik
                  initialValues={{
                    name: "",
                    image: null,
                    link: "",
                  }}
                  onSubmit={(values, { resetForm }) => {
                    addProduct(values);
                    resetForm();
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required(),
                    image: Yup.mixed().required(),
                    link: Yup.string().required(),
                  })}
                >
                  {({ handleSubmit, errors, touched, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                      <VStack gap="1em">
                        <FormControl isInvalid={touched.name && errors.name}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="name">
                            İsim
                          </FormLabel>
                          <Field as={Input} id="name" name="name" />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="image">
                            Görsel
                          </FormLabel>
                          <Input
                            id="image"
                            type="file"
                            onChange={(e) =>
                              setFieldValue("image", e.target.files[0])
                            }
                          />
                        </FormControl>
                        <FormControl isInvalid={touched.link && errors.link}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="link">
                            Link
                          </FormLabel>
                          <Field as={Input} id="link" name="link" />
                        </FormControl>
                        <Button variant="form" w="100%" type="submit">
                          Ürün Ekle
                        </Button>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Button variant="nav" onClick={onAdjOpen}>Ürün Ekle</Button>
        <Modal isOpen={isAdjOpen} onClose={onAdjClose}>
          <ModalOverlay/>
          <ModalContent bgColor="y.500">
            <ModalHeader>Ürün Ekle</ModalHeader>
            <ModalCloseButton/>
            <ModalBody p="1em">
              <Box
                minW="sm"
                maxW="md"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="dg.500"
                overflow="hidden"
                bgColor="g.500"
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
                    updateProduct(values);
                    resetForm();
                  }}
                  validationSchema={Yup.object({
                    id: Yup.number().required(),
                    name: Yup.string(),
                    image: Yup.mixed(),
                    link: Yup.string(),
                  })}
                >
                  {({ handleSubmit, errors, touched, setFieldValue }) => (
                    <form onSubmit={handleSubmit}>
                      <VStack gap="1em">
                        <FormControl isInvalid={touched.id && errors.id}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="id">
                            ID
                          </FormLabel>
                          <Field as={Input} id="id" name="id" />
                        </FormControl>
                        <FormControl isInvalid={touched.name && errors.name}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="name">
                            İsim
                          </FormLabel>
                          <Field as={Input} id="name" name="name" />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="image">
                            Görsel
                          </FormLabel>
                          <Input
                            id="image"
                            type="file"
                            onChange={(e) =>
                              setFieldValue("image", e.target.files[0])
                            }
                          />
                        </FormControl>
                        <FormControl isInvalid={touched.link && errors.link}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="link">
                            Link
                          </FormLabel>
                          <Field as={Input} id="link" name="link" />
                        </FormControl>
                        <Button variant="form" w="100%" type="submit">
                          Ürünü Güncelle
                        </Button>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Button variant="nav" onClick={onDelOpen}>Ürün Ekle</Button>
        <Modal isOpen={isDelOpen} onClose={onDelClose}>
          <ModalOverlay/>
          <ModalContent bgColor="y.500">
            <ModalHeader>Ürün Ekle</ModalHeader>
            <ModalCloseButton/>
            <ModalBody p="1em">
              <Box
                minW="sm"
                maxW="md"
                borderWidth="1px"
                borderColor="dg.500"
                borderRadius="lg"
                overflow="hidden"
                bgColor="g.500"
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
                        <Button variant="form" w="100%" type="submit">
                          Ürünü Sil
                        </Button>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
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
