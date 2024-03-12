import React, { useContext } from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Text,
  Box,
  VStack,
} from "@chakra-ui/react"
import { FormattedMessage, useIntl } from 'react-intl'
import * as Yup from "yup"
import { Field, Formik } from 'formik'
import { Link } from "react-router-dom"
import { Language } from '../App'

import 'yup-phone-lite'
import 'libphonenumber-js'

const RegisterForm = () => {

  const intl = useIntl()
  const lan = useContext(Language)

  return (
    <Box
      minW="sm"
      borderRadius="lg"
      borderWidth="2px"
      p="1em"
      maxW="lg"
    >
      <Formik
          initialValues={{
            name: "",
            surname: "",
            tel: "",
            email: "",
            password: "",
            cpassword: "",
            policy: false
          }}
          onSubmit={(values, { resetForm }) => {
            resetForm()
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(<FormattedMessage id='required'/>),
            surname: Yup.string().required(<FormattedMessage id='required'/>),
            tel: Yup.string().phone(null, intl.formatMessage({id: 'invalidtel'})).required(<FormattedMessage id='required'/>),
            email: Yup.string().email().required(<FormattedMessage id='required'/>),
            password: Yup.string().min(8, <FormattedMessage id="passshort"/>).max(12, <FormattedMessage id='passshort'/>).required(<FormattedMessage id='required'/>),
            cpassword: Yup.string().oneOf([Yup.ref('password'), null], <FormattedMessage id='passmatch'/>).required(<FormattedMessage id='required'/>),
            policy: Yup.bool().oneOf([true], <FormattedMessage id='checkpolicy'/>)
          })}
        >
          {({handleSubmit, errors, touched, values, setFieldValue}) => (
            <form onSubmit={handleSubmit}>
              <VStack gap="1em">
                <FormControl isInvalid={touched.name && errors.name}>
                  <FormLabel htmlFor='name'><FormattedMessage id='name'/></FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.surname && errors.surname}>
                  <FormLabel htmlFor='surname'><FormattedMessage id='surname'/></FormLabel>
                  <Field
                    as={Input}
                    id="surname"
                    name="surname"
                  />
                  <FormErrorMessage>{errors.surname}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.tel && errors.tel}>
                  <FormLabel htmlFor='tel'><FormattedMessage id='tel'/></FormLabel>
                  <Field
                    as={Input}
                    id="tel"
                    name="tel"
                    type="tel"
                  />
                  <FormErrorMessage>{errors.tel}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.email && errors.email}>
                  <FormLabel htmlFor='email'><FormattedMessage id='email'/></FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.password && errors.password}>
                  <FormLabel htmlFor='password'><FormattedMessage id='pass'/></FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.cpassword && errors.cpassword}>
                  <FormLabel htmlFor='cpassword'><FormattedMessage id='passa'/></FormLabel>
                  <Field
                    as={Input}
                    id="cpassword"
                    name="cpassword"
                    type="password"
                  />
                  <FormErrorMessage>{errors.cpassword}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.policy && errors.policy}>
                  <Field
                    as={Checkbox}
                    id="policy"
                    name="policy"
                  >
                    <Flex align="center" gap={1} justifyContent="center">
                      {lan === "TR" && <Link to="/corporate/privacy"><Text><FormattedMessage id="kvkk"/></Text></Link>}
                      <Text><FormattedMessage id="read"/></Text>
                      {lan === "EN" && <Link to="corporate/privacy"><Text><FormattedMessage id="kvkk"/></Text></Link>}
                    </Flex>
                  </Field>
                  <FormErrorMessage>{errors.policy}</FormErrorMessage>
                </FormControl>
                <Button w="100%" type='submit'><FormattedMessage id='register'/></Button>
              </VStack>
            </form>
          )}
      </Formik>
    </Box>
  )
}

export default RegisterForm