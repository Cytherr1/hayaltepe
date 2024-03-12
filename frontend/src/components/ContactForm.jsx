import React, { useContext, useState } from 'react'
import {FormattedMessage} from "react-intl"
import { Field, Formik } from 'formik'
import * as Yup from "yup"
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  Flex,
  Input,
  Textarea,
  Text,
  Box,
  VStack,
} from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { Language } from '../App'

const ContactForm = () => {

    const [charCount, setCharCount] = useState(0);
    const lan = useContext(Language);
    const [load, setLoad] = useState(false);
  
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
                initialValues= {{
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                    policy: false
                }}
                onSubmit={(values, {resetForm}) => {
                    resetForm()
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required(<FormattedMessage id='required'/>),
                    email: Yup.string().email(<FormattedMessage id='notemail'/>).required(<FormattedMessage id='required'/>),
                    subject: Yup.string().max(20).required(<FormattedMessage id='required'/>),
                    message: Yup.string().min(25, <FormattedMessage id='tooshort'/>).max(300).required(<FormattedMessage id='required'/>),
                    policy: Yup.bool().oneOf([true], <FormattedMessage id='checkpolicy'/>)   
                })}
                >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack spacing="1em">
                            <FormControl isInvalid={touched.name && errors.name}>
                            <FormLabel fontWeight="600" fontSize="lg" htmlFor='name'><FormattedMessage id='name'/></FormLabel>
                            <Field
                                as={Input}
                                id="name"
                                name="name"
                            />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={touched.email && errors.email}>
                            <FormLabel fontWeight="600" fontSize="lg" htmlFor='email'><FormattedMessage id='email'/></FormLabel>
                            <Field
                                as={Input}
                                id="email"
                                name="email"
                                type='email'
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={touched.subject && errors.subject}>
                            <FormLabel fontWeight="600" fontSize="lg" htmlFor='subject'><FormattedMessage id='subject'/></FormLabel>
                            <Field
                                as={Input}
                                id="subject"
                                name="subject"
                            />
                            <FormErrorMessage>{errors.subject}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={touched.message && errors.message}>
                            <FormLabel fontWeight="600" fontSize="lg" htmlFor='message'><FormattedMessage id='message'/></FormLabel>
                            <Field
                                as={Textarea}
                                resize="none"
                                h="150px"
                                onInput={(e) => setCharCount(e.target.value.length)}
                                id="message"
                                name="message"
                                maxLength="300"
                            />
                            <Text fontSize="xs" mr="25px" color="dg.500">{charCount}/300</Text>
                            <FormErrorMessage>{errors.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={touched.message && errors.message}>
                            <Field
                                as={Checkbox}
                                id="policy"
                                name="policy"
                            >
                                <Flex align="center" gap={1}>
                                {lan === "TR" && <Link to="/privacy"><Text><FormattedMessage id="kvkk"/></Text></Link>}
                                <Text><FormattedMessage id="read"/></Text>
                                {lan === "EN" && <Link to="/privacy"><Text><FormattedMessage id="kvkk"/></Text></Link>}
                                </Flex>
                            </Field>
                            <FormErrorMessage>{errors.policy}</FormErrorMessage>
                            </FormControl>
                            <Button w="100%" isLoading={load} type='submit'><FormattedMessage id='submit'/></Button>
                        </VStack>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default ContactForm