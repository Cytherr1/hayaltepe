import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box
} from "@chakra-ui/react";
import axios from "axios"

const Home = () => {
  const [logs, setLogs] = useState([]);
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get("log/getAllLogs", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          setLogs(response.data.logs);
        } else {
          alert(response.data.errors);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error has occurred.");
      }
    };

    fetchLogs();
  }, []);

  return (
    <TableContainer m="1.5rem" >
      <Table size="lg" variant="striped" colorScheme="gray">
        <TableCaption m="1.5rem">Gerçekleştirdiğiniz Son İşlemler</TableCaption>
        <Thead display="table" w="100%" style={{tableLayout: "fixed"}}>
          <Tr>
            <Th>Kullanıcı</Th>
            <Th>Tarih</Th>
            <Th>Açıklama</Th>
          </Tr>
        </Thead>
        <Tbody display="table" w="100%" h="70vh">
          {logs.map((log, index) => (
            <Tr display="table" w="100%" key={index} style={{tableLayout: "fixed"}}>
              <Td>{log.LOG_USER}</Td>
              <Td>{log.LOG_TIMESTAMP}</Td>
              <Td>{log.LOG_DESCR}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Home;
