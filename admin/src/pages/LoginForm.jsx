import React from 'react'
import { Field, Formik } from 'formik'
import * as Yup from "yup"
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  VStack,
  Heading,
  Flex
} from "@chakra-ui/react"
import axios from "axios";

const LoginForm = () => {

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  const login = async (formData) => {

    try {
      const response = await axiosInstance.post("admin/auth/login", formData, {
        headers: {
          Accept: "application/form-data",
          'content-type': "application/json",
        },
      })
      localStorage.setItem("auth-token", response.data.accessToken);
      window.location.replace("/");
    } catch (error) {
        console.error("Error:", error);
        alert("An error has occured.");
    }
}

  return (
    <Flex
      w="100%"
      h="100vh"
      bgColor="y.500"
      justifyContent="center"
      alignItems="center"
      p="5em"
    >
      <VStack
        gap="5em"
      >
        <Heading size='xl'>HayalTepe Admin</Heading>
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
              email: "",
              password: "",
            }}
            onSubmit={(values, {resetForm}) => {
              login(values)
              resetForm()
            }}
            validationSchema={Yup.object({
              email: Yup.string().email().required(),
              password: Yup.string().required(),
            })}
          >
            {({handleSubmit, errors, touched}) => (
              <form onSubmit={handleSubmit}>
                <VStack gap="1em">
                  <FormControl isInvalid={touched.email && errors.email}>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor='email'>Email</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={touched.password && errors.password}>
                    <FormLabel fontWeight="600" fontSize="lg" htmlFor='password'>Şifre</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Button variant="form" w="100%" type='submit'>Giriş</Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </VStack>
    </Flex>
  )
}

export default LoginForm