import React from "react";
import logo from "../assets/ht_logo_m.png";
import {
  Flex,
  Spacer,
  Button,
  Center,
  Image,
  UnorderedList,
  ListItem,
  Heading
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const logout = () => {
    localStorage.removeItem("auth-token"); 
    window.location.replace("/loginform")
  }

  return (
    <>
      <Flex bg="black" h="25px" align="center" justify="flex-end"></Flex>
      <Flex alignItems="center" p="1.5em" bg="#5F6F52" maxH="100px" gap={3}>
        <Spacer />
        <Center
          bgGradient="linear(to-b, y.500, g.500)"
          borderRadius="0px 0px 5px 5px"
          boxShadow="md"
          minW="150px"
          zIndex={10}
        >
          <Image boxSize="150px" src={logo} alt="Hayaltepe Logo" />
        </Center>
        <Spacer />
        <Heading size="lg" fontWeight="500">HayalTepe Admin</Heading>
        <Spacer />
        <Spacer />
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
            Ana Sayfa
          </ListItem>
          <ListItem
            _hover={{ color: "#A9B388" }}
            fontWeight="semibold"
            transition="0.3s"
            as={Link}
            to="/productmanagement"
          >
            Ürün Yönetimi
          </ListItem>
          <ListItem
            _hover={{ color: "#A9B388" }}
            fontWeight="semibold"
            transition="0.3s"
            as={Link}
            to="/usermanagement"
          >
            Kullanıcı Yönetimi
          </ListItem>
        </UnorderedList>
        <Spacer />
        <Button variant="nav" onClick={logout}>Çıkış yap</Button>
      </Flex>
    </>
  );
};

export default Navbar;
