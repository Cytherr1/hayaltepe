import React from 'react'
import {FormattedMessage} from "react-intl"
import { Field, Formik } from 'formik'
import * as Yup from "yup"
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  VStack,
} from "@chakra-ui/react"

const LoginForm = () => {

    const login = async (formData) => {
        let responseData;
        await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            'content-type': "application/json",
          },
          body: JSON.stringify(formData),
        }).then((response) => response.json()).then((data) => responseData = data)
    
        if (responseData.success) {
          localStorage.setItem("auth-token", responseData.token);
          window.location.replace("/");
        }
        else {
          alert(responseData.errors)
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
                <Button minW="sm" type='submit'><FormattedMessage id='login'/></Button>
              </VStack>
            </form>
          )}
        </Formik>
    </Box>
  )
}

export default LoginForm