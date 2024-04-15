import React from 'react'
import {FormattedMessage} from "react-intl"
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
    <Box 
        minW="sm"
        maxW="md"
        borderWidth="2px" 
        borderRadius="lg" 
        overflow="hidden" 
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
            email: Yup.string().email(<FormattedMessage id='notemail'/>).required(<FormattedMessage id='required'/>),
            password: Yup.string().required(<FormattedMessage id='required'/>),
          })}
        >
          {({handleSubmit, errors, touched}) => (
            <form onSubmit={handleSubmit}>
              <VStack gap="1em">
                <FormControl isInvalid={touched.email && errors.email}>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor='email'><FormattedMessage id='email'/></FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.password && errors.password}>
                  <FormLabel fontWeight="600" fontSize="lg" htmlFor='password'><FormattedMessage id='pass'/></FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button w="100%" type='submit'><FormattedMessage id='login'/></Button>
              </VStack>
            </form>
          )}
        </Formik>
    </Box>
  )
}

export default LoginForm