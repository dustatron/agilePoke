import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import React from "react";
import { useState } from "react";

type Props = {
  onSubmit: (val: string) => void;
  title: string;
  buttonCopy: string;
  placeholder: string;
  isLoading?: boolean;
  maxLength?: number;
};
const BasicForm = ({
  onSubmit,
  title,
  buttonCopy,
  placeholder,
  isLoading,
  maxLength = 10,
}: Props) => {
  const [roomName, setRoomName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const clearError = () => {
    setErrorMessage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.replace(/[^a-z0-9-]/gi, "");
    clearError();
    if (inputVal.length < 25) {
      setRoomName(inputVal);
    }
  };

  const preventSubmitDefault = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (roomName.length <= maxLength) {
      onSubmit(roomName);
    } else if (roomName.length > maxLength) {
      setErrorMessage(`Max length ${maxLength}`);
    } else {
      setErrorMessage("This was an error");
    }
  };

  return (
    <Box
      bg="blackAlpha.800"
      color="whiteAlpha.900"
      padding={6}
      borderRadius="md"
    >
      <form onSubmit={preventSubmitDefault}>
        <Stack>
          <FormControl>
            <FormLabel>{title}</FormLabel>
            <Input
              placeholder={placeholder}
              bg="white"
              value={roomName}
              color="blackAlpha.800"
              onChange={handleChange}
            />
          </FormControl>
          {!!errorMessage && (
            <Text fontWeight="semibold" color="red">
              {errorMessage}
            </Text>
          )}

          <Box paddingTop={2} width="100%">
            <Button
              type="submit"
              width="100%"
              colorScheme="twitter"
              isLoading={isLoading}
              isDisabled={roomName.length < 1 || !!errorMessage}
            >
              {buttonCopy}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default BasicForm;
