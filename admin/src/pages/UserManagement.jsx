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

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/admin/user/getAllUser",
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
          setUsers(responseData.users);
        } else {
          alert(responseData.errors);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error has occurred.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box>
      <Box>
        <FormControl>
          <TableContainer m="4.5rem">
            <Table size="lg" variant="striped" colorScheme="gray">
              <TableCaption>Bütün Kullanıcılar</TableCaption>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>İsim</Th>
                  <Th>Soy isim</Th>
                  <Th>Mail</Th>
                  <Th>Telefon Numarası</Th>
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
            surname: "",
            mail: "",
            password: "",
            telephone_number: "",
          }}
          onSubmit={(values, { resetForm }) => {
            // addUser(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            surname: Yup.string().required(),
            mail: Yup.string().email().required(),
            password: Yup.string().required(),
            telephone_number: Yup.string().required(),
          })}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <VStack gap="1em">
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
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="password">
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
                <Button w="100%" type="submit">
                  Kullanıcı Ekle
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
            surname: "",
            mail: "",
            password: "",
            telephone_number: "",
          }}
          onSubmit={(values, { resetForm }) => {
            // updateUser(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            id: Yup.number().required(),
            name: Yup.string().required(),
            surname: Yup.string().required(),
            mail: Yup.string().email().required(),
            password: Yup.string().required(),
            telephone_number: Yup.string().required(),
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
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor="password">
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
                <Button w="100%" type="submit">
                  Kullanıcı Güncelle
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
            // deleteUser(values);
            resetForm();
          }}
          validationSchema={Yup.object({
            id: Yup.number().required(),
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
                  Kullanıcıyı Sil
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default UserManagement;
