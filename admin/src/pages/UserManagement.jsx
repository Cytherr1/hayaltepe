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
  FormErrorMessage,
  Button,
  VStack,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isAdjOpen, onOpen: onAdjOpen, onClose: onAdjClose } = useDisclosure();
  const { isOpen: isDelOpen, onOpen: onDelOpen, onClose: onDelClose } = useDisclosure();
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("admin/user/getAllUser", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

      if (response.data.success) {
        setUsers(response.data.products);
      }
    } catch (error) {
      toast({
        title: "Hata!",
        description: "Kullanıcılar yüklenemedi, tekrar deneyiniz.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const addUser = async (formData) => {
    try {
      const response = await axiosInstance.post("admin/user/add", formData, {
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast({
          title: "Başarılı!",
          description: "Kullanıcı başarıyla eklendi.",
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
        description: "Kullanıcı eklenemedi.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const updateUser = async (formData) => {
    try {
      const response = await axiosInstance.post("admin/user/update", formData, {
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast({
          title: "Başarılı!",
          description: "Kullanıcı başarıyla değiştirildi.",
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
        description: "Kullanıcı değişiklikleri kaydedilemedi.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteUser = async (formData) => {
    try {
      const response = await axiosInstance.post("admin/user/delete", formData, {
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast({
          title: "Başarılı!",
          description: "Kullanıcı başarıyla silindi.",
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
        description: "Kullanıcı silinemedi.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" gap="3.5em" w="100%" h="10vh" flexWrap="wrap">

      <Button variant="nav" w="200" onClick={onAddOpen}>Kullanıcı Ekle</Button>
        <Modal isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay/>
          <ModalContent bgColor="y.500">
            <ModalHeader>Kullanıcı Ekle</ModalHeader>
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
                    name: "",
                    surname: "",
                    mail: "",
                    password: "",
                    tel: "",
                    rolefilter: "U",
                  }}
                  onSubmit={(values, { resetForm }) => {
                    addUser(values);
                    resetForm();
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required(),
                    surname: Yup.string().required(),
                    mail: Yup.string().email().required(),
                    password: Yup.string().required(),
                    tel: Yup.string().required(),
                    rolefilter: Yup.string().required(),
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
                          <FormErrorMessage>{errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={touched.surname && errors.surname}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="surname">
                            Soy İsim
                          </FormLabel>
                          <Field as={Input} id="surname" name="surname" />
                          <FormErrorMessage>{errors.surname}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={touched.mail && errors.mail}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="mail">
                            Mail
                          </FormLabel>
                          <Field as={Input} id="mail" name="mail" />
                          <FormErrorMessage>{errors.mail}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={touched.password && errors.password}>
                          <FormLabel
                            fontWeight="600"
                            fontSize="lg"
                            htmlFor="password"
                          >
                            Şifre
                          </FormLabel>
                          <Field as={Input} id="password" name="password" />
                          <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={touched.tel && errors.tel}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="tel">
                            Telefon Numarası
                          </FormLabel>
                          <Field as={Input} id="tel" name="tel" />
                          <FormErrorMessage>{errors.tel}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={touched.tel && errors.tel}>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="rolefilter">
                            Rol Filtresi
                          </FormLabel>
                          <Field as={Select} id="tel" name="rolefilter">
                            <option value="AU">Admin Kullanıcı (AU)</option>
                            <option value="U">Normal Kullanıcı (U)</option>
                          </Field>
                          <FormErrorMessage>{errors.tel}</FormErrorMessage>
                        </FormControl>
                        <Button variant="form" w="100%" type="submit">
                          Kullanıcı Ekle
                        </Button>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Button variant="nav" w="200" onClick={onAdjOpen}>Kullanıcı Güncelle</Button>
        <Modal isOpen={isAdjOpen} onClose={onAdjClose}>
          <ModalOverlay/>
          <ModalContent bgColor="y.500">
            <ModalHeader>Kullanıcı Güncelle</ModalHeader>
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
                    surname: "",
                    mail: "",
                    password: "",
                    tel: "", 
                  }}
                  onSubmit={(values, { resetForm }) => {
                    updateUser(values);
                    resetForm();
                  }}
                  validationSchema={Yup.object({
                    id: Yup.number().required(),
                    name: Yup.string(),
                    surname: Yup.string(),
                    mail: Yup.string().email(),
                    password: Yup.string(),
                    tel: Yup.string(),
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
                          <FormErrorMessage>{errors.id}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="name">
                            İsim
                          </FormLabel>
                          <Field as={Input} id="name" name="name" />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="surname">
                            Soy İsim
                          </FormLabel>
                          <Field as={Input} id="surname" name="surname" />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="mail">
                            Mail
                          </FormLabel>
                          <Field as={Input} id="mail" name="mail" />
                        </FormControl>
                        <FormControl>
                          <FormLabel
                            fontWeight="600"
                            fontSize="lg"
                            htmlFor="password"
                          >
                            Şifre
                          </FormLabel>
                          <Field as={Input} id="password" name="password" />
                        </FormControl>
                        <FormControl>
                          <FormLabel fontWeight="600" fontSize="lg" htmlFor="tel">
                            Telefon Numarası
                          </FormLabel>
                          <Field as={Input} id="tel" name="tel" />
                        </FormControl>
                        <Button variant="form" w="100%" type="submit">
                          Kullanıcıyı Güncelle
                        </Button>
                      </VStack>
                    </form>
                  )}
                </Formik>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Button variant="nav" w="200" onClick={onDelOpen}>Kullanıcı sil</Button>
        <Modal isOpen={isDelOpen} onClose={onDelClose}>
          <ModalOverlay/>
          <ModalContent bgColor="y.500">
            <ModalHeader>Kullanıcı Sil</ModalHeader>
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
                  }}
                  onSubmit={(values, { resetForm }) => {
                    deleteUser(values);
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
                          <FormErrorMessage>{errors.id}</FormErrorMessage>
                        </FormControl>
                        <Button variant="form" w="100%" type="submit">
                          Onayla
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
              <TableCaption>Bütün Kullanıcılar</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>İsim</Th>
                  <Th>Soy İsim</Th>
                  <Th>Mail</Th>
                  <Th>Telefon Numarası</Th>
                  <Th>Rol Filtresi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.ID}</Td>
                    <Td>{user.NAME}</Td>
                    <Td>{user.SURNAME}</Td>
                    <Td>{user.MAIL}</Td>
                    <Td>{user.TELEPHONE_NUMBER}</Td>
                    <Td>{user.ROLE_FILTER}</Td>
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

export default UserManagement;
