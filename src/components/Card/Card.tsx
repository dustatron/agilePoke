import { Box, Button, Center, Text } from "@chakra-ui/react"

import React from "react"

type Props = {
  number: number
  isVoting: boolean
  select: (value: number) => void
}

const Card = ({ number, isVoting, select }: Props) => {
  return (
    <>
      {isVoting && (
        <Button
          w="90px"
          h="100px"
          bg="blue.100"
          borderRadius="md"
          borderWidth="2px"
          borderColor="blue.400"
          onClick={() => select(number)}
        >
          <Text fontSize="2xl"> {number} </Text>
        </Button>
      )}
      {!isVoting && (
        <Center
          w="90px"
          h="100px"
          bg="green.100"
          borderRadius="md"
          borderWidth="2px"
          borderColor="green.400"
          textAlign="center"
        >
          <Text fontSize="2xl"> 💎 </Text>
        </Center>
      )}
    </>
  )
}

export default Card
