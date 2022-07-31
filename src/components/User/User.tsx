import { Box, Text } from "@chakra-ui/react"

import React from "react"

type Props = {
  name: string
  isVoting: boolean
  vote: number | null
  isCurrentUser: boolean
}

const User = ({ name, isVoting, vote, isCurrentUser }: Props) => {
  return (
    <Box borderWidth="3px" padding={4} h="95px" minW="150px">
      {name && (
        <Text textAlign="center" fontSize="xl" fontWeight="bold">
          {name}
        </Text>
      )}
      <Text textAlign="center" fontSize="xl" fontWeight="bold">
        {isVoting && vote! > 0 && !isCurrentUser && "👍"}
      </Text>
      {!isVoting && (
        <Text textAlign="center" fontSize="md">
          {vote}
        </Text>
      )}
      {isVoting && isCurrentUser && (
        <Text textAlign="center" fontSize="md">
          {vote}
        </Text>
      )}
    </Box>
  )
}

export default User
