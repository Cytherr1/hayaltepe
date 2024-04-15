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
    <TableContainer m="4.5rem">
      <Table size="lg" variant="striped" colorScheme="gray">
        <TableCaption>Actions performed by the authorized users</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Date</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map((log, index) => (
            <Tr key={index}>
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
