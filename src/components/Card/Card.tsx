import { Box, Button, Center, Text } from "@chakra-ui/react";

import React from "react";

type Props = {
  number: number;
  select: (value: number) => void;
};

const Card = ({ number, select }: Props) => {
  return (
    <>
      <Button
        minW="60px"
        minH="80px"
        bg="gray.100"
        borderRadius="md"
        borderWidth="2px"
        borderColor="gray.200"
        onClick={() => select(number)}
      >
        <Text fontSize="2xl" fontWeight="medium" color="black">
          {number}
        </Text>
      </Button>
    </>
  );
};

export default Card;
