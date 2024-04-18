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

const Home = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/log/getAllLogs", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();

        if (responseData.success) {
          setLogs(responseData.logs);
        } else {
          alert(responseData.errors);
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
        <Box w="100%" h="70vh">
          <Tbody display="table" w="100%">
            {logs.map((log, index) => (
              <Tr display="table" w="100%" key={index} style={{tableLayout: "fixed"}}>
                <Td>{log.LOG_USER}</Td>
                <Td>{log.LOG_TIMESTAMP}</Td>
                <Td>{log.LOG_DESCR}</Td>
              </Tr>
            ))}
          </Tbody>
        </Box>
      </Table>
    </TableContainer>
  );
};

export default Home;
