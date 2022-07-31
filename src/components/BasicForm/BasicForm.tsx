import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react"

import React from "react"
import { useState } from "react"

type Props = {
  onSubmit: (val: string) => void
  title: string
  buttonCopy: string
  placeholder: string
}
const BasicForm = ({ onSubmit, title, buttonCopy, placeholder }: Props) => {
  const [roomName, setRoomName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.replace(/[^a-z0-9-]/gi, "")
    if (inputVal.length < 25) {
      setRoomName(inputVal)
    }
  }

  const preventSubmitDefault = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onSubmit(roomName)
  }

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

          <Box paddingTop={2} width="100%">
            <Button
              type="submit"
              width="100%"
              colorScheme="twitter"
              isDisabled={roomName.length < 1}
            >
              {buttonCopy}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  )
}

export default BasicForm
