import { Box, Spinner, Text, Icon, Flex, Skeleton } from "@chakra-ui/react";
import { GrStatusGood } from "react-icons/gr";

import React from "react";

type Props = {
  name: string;
  isVoting: boolean;
  vote: number | null;
  isCurrentUser: boolean;
};

const User = ({ name, isVoting, vote, isCurrentUser }: Props) => {
  const hasVote = vote && vote > 0;
  return (
    <Flex
      borderWidth="3px"
      borderColor={isCurrentUser ? "green.300" : "#e7e7e7"}
      padding={4}
      minH="150px"
      minW="150px"
      borderRadius="xl"
      bg="white"
      flexWrap="wrap"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
    >
      {name && (
        <Box>
          <Text textAlign="center" fontSize="xl" fontWeight="bold">
            {name}
          </Text>
        </Box>
      )}
      <Box w="100%">
        <Text textAlign="center" fontSize="2xl" fontWeight="bold">
          {isVoting && !!hasVote && <Icon as={GrStatusGood} w={10} h={10} />}
          {isVoting && !hasVote && (
            <Skeleton
              height="30px"
              w="100%"
              startColor="blue.200"
              endColor="green.200"
            />
          )}
        </Text>
        {!isVoting && (
          <Text textAlign="center" fontSize="3xl">
            {vote}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default User;
