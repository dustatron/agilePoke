import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react"

import React from "react"

type Props = {
  name: string
  isVoting: boolean
  vote: number | null
}

const User = ({ name, isVoting, vote }: Props) => {
  return (
    <Box borderWidth="3px" padding={4} h="95px" minW="150px">
      {name && (
        <Text textAlign="center" fontSize="xl" fontWeight="bold">
          {name}
        </Text>
      )}
      {!isVoting && (
        <Text textAlign="center" fontSize="md">
          {vote}
        </Text>
      )}
    </Box>
  )
}

export default User
