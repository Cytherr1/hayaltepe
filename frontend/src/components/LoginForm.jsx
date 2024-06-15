import React from 'react'
import { FormattedMessage, useIntl } from "react-intl"
import { Field, Formik } from 'formik'
import * as Yup from "yup"
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
  Box
} from "@chakra-ui/react"
import axios from 'axios'

const LoginForm = () => {

  const toast = useToast();
  const intl = useIntl();
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post("general/auth/login", formData, {
          headers: {
            Accept: "application/form-data",
            'content-type': "application/json",
          },
        }
      );
  
      if(response.data.success) {
        toast({
          title: intl.formatMessage({ id: "toastsuccessh" }),
          description: intl.formatMessage({ id: "toastloginsuccess" }),
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        localStorage.setItem("auth-token", response.data.accessToken);
        setTimeout(() => {
          window.location.replace("/");
        }, 1500);
      }
    } catch (error){
      if (error.response.status == 404) {
        toast({
          title: intl.formatMessage({ id: "toasterrorh"}),
          description: intl.formatMessage({ id: "toastloginerror"}),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: intl.formatMessage({ id: "toasterrorh"}),
          description: intl.formatMessage({ id: "toasterror"}),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }

  return (
    <Box 
      minW="sm"
      maxW="md"
      border="2px solid"
      borderColor="dg.500"
      borderRadius="lg" 
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
              <Button variant="form" w="100%" type='submit'><FormattedMessage id='login'/></Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default LoginForm