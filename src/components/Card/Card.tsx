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
      <Button
        minW="100px"
        minH="120px"
        bg="gray.100"
        borderRadius="md"
        borderWidth="2px"
        borderColor="gray.200"
        onClick={() => select(number)}
      >
        <Text fontSize="4xl" fontWeight="medium" color="black">
          {" "}
          {number}{" "}
        </Text>
      </Button>
    </>
  )
}

export default Card
