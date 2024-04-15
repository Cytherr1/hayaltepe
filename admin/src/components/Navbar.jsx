import React from "react";
import logo from "../assets/ht_logo_m.png";
import tr from "../assets/tr.png";
import en from "../assets/en.png";
import {
  Flex,
  Spacer,
  Button,
  Center,
  Image,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const langChangeHandler = (lan) => {
    props.langSelector(lan);
  };

  return (
    <>
      <Flex bg="black" maxH="25px" align="center" justify="flex-end">
        <Image src={tr} alt="TR" width="16px" height="12px" />
        <Button
          color="#FEFAE0"
          _hover={{ color: "#B99470", bg: "none" }}
          bg="none"
          onClick={() => langChangeHandler("TR")}
        >
          TR
        </Button>
        <Image src={en} alt="EN" width="16px" height="12px" />
        <Button
          color="#FEFAE0"
          _hover={{ color: "#B99470", bg: "none" }}
          bg="none"
          onClick={() => langChangeHandler("EN")}
        >
          EN
        </Button>
      </Flex>
      <Flex alignItems="center" p="1.5em" bg="#5F6F52" maxH="100px" gap={3}>
        <Spacer />
        <Center
          bg="#A9B388"
          borderRadius="0px 0px 5px 5px"
          boxShadow="md"
          minW="150px"
          zIndex={10}
        >
          <Image boxSize="150px" src={logo} alt="Hayaltepe Logo" />
        </Center>
        <Spacer />
        <Spacer />
        <UnorderedList style={{ display: "flex", gap: "3em" }} styleType="none">
          <ListItem
            _hover={{ color: "#A9B388" }}
            fontWeight="semibold"
            transition="0.3s"
            as={Link}
            to="/"
          >
            <FormattedMessage id="home" />
          </ListItem>
          <ListItem
            _hover={{ color: "#A9B388" }}
            fontWeight="semibold"
            transition="0.3s"
            as={Link}
            to="/productmanagement"
          >
            <FormattedMessage id="productmanagement" />
          </ListItem>
          <ListItem
            _hover={{ color: "#A9B388" }}
            fontWeight="semibold"
            transition="0.3s"
            as={Link}
            to="/usermanagement"
          >
            <FormattedMessage id="usermanagement" />
          </ListItem>
        </UnorderedList>
        <Spacer />
      </Flex>
    </>
  );
};

export default Navbar;
