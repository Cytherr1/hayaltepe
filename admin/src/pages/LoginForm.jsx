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

const LoginForm = () => {

  const login = async (formData) => {
    try {
        const response = await fetch("http://localhost:3000/admin/auth/login", {
            method: "POST",
            headers: {
                Accept: "application/form-data",
                'Content-Type': "application/json",
            },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
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
          borderWidth="2px" 
          borderRadius="lg" 
          overflow="hidden" 
          bgColor="white"
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
                  <Button w="100%" type='submit'>Giriş</Button>
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