import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

function HotkeysModal({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem onClick={onOpen}>Hot Keys</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hotkey options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table size="md">
                <Thead>
                  <Tr>
                    <Th>Action</Th>
                    <Th>Key</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Toggle show results</Td>
                    <Td>SHIFT + S</Td>
                  </Tr>
                  <Tr>
                    <Td>Reset voting</Td>
                    <Td>ESC</Td>
                  </Tr>
                </Tbody>
                <Tbody>
                  <Tr>
                    <Td>Vote 1</Td>
                    <Td>SHIFT + 1</Td>
                  </Tr>
                </Tbody>
                <Tbody>
                  <Tr>
                    <Td>Vote 2</Td>
                    <Td>SHIFT + 2</Td>
                  </Tr>
                </Tbody>
                <Tbody>
                  <Tr>
                    <Td>Vote 3</Td>
                    <Td>SHIFT + 3</Td>
                  </Tr>
                </Tbody>
                <Tbody>
                  <Tr>
                    <Td>Vote 5</Td>
                    <Td>SHIFT + 5</Td>
                  </Tr>
                </Tbody>
                <Tbody>
                  <Tr>
                    <Td>Vote 8</Td>
                    <Td>SHIFT + 8</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HotkeysModal;
