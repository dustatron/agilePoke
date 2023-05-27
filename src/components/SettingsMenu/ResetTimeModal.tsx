import {
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React from "react";
import useTimeoutState from "../../hooks/useTimeoutState";

function ResetTimeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [timeout, setTimeout] = useTimeoutState((state) => [
    state.timeout,
    state.setTimeout,
  ]);
  return (
    <>
      <MenuItem onClick={onOpen}>Auto reset timeout</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <ModalHeader>Auto Reset Timer</ModalHeader>

            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Reset time in minutes</FormLabel>
                <NumberInput
                  size="md"
                  value={timeout}
                  max={60}
                  min={1}
                  onChange={(e) => setTimeout(Number(e))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResetTimeModal;
