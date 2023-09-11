import {
  Box,
  Center,
  Stack,
  Wrap,
  WrapItem,
  Text,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import User from "../User";
import { Room, UserData } from "../../utils/types";
import { sortVotes } from "../../utils/sortVotes";

type Props = {
  voteData: UserData[];
  roomData: Room;
  currentUser: UserData;
};

const VoteCards = ({ voteData, roomData, currentUser }: Props) => {
  const isVoting = roomData.isVoting;
  const sorted = Object.entries(sortVotes(voteData)).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );

  return (
    <Stack>
      {isVoting && (
        <Wrap spacing="10px" justify="center">
          {voteData.map((user) => (
            <WrapItem key={user?.id}>
              <User
                isVoting={roomData.isVoting}
                name={user?.name}
                vote={user?.vote}
                isCurrentUser={user?.id === currentUser?.id}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      {!isVoting && (
        <>
          <Stack direction="row" spacing="20" justify="center">
            {sorted.map((item, index) => (
              <Stack direction="row" key={item[0]} spacing={"-10"}>
                {item[1].users.map((user: any) => (
                  <WrapItem key={user?.id}>
                    <User
                      isVoting={roomData.isVoting}
                      name={user?.name}
                      vote={user?.vote}
                      isCurrentUser={user?.id === currentUser?.id}
                    />
                  </WrapItem>
                ))}
              </Stack>
            ))}
          </Stack>
          {/* <Center>
            <Text fontWeight="extrabold" fontSize="xl" display="inline" ml="4">
              Stats:
            </Text>
            {sorted.map((item) => (
              <Box
                key={item[0]}
                display="flex"
                flexWrap="wrap"
                border="1px"
                borderColor="gray.400"
                borderRadius="md"
                py="1"
                px="2"
                mx="1"
              >
                <Text
                  display="block"
                  fontWeight="extrabold"
                  fontSize="xl"
                  mx="1"
                >
                  {item[0]}
                </Text>
                <Box
                  display="block"
                  fontSize="sm"
                  fontWeight="medium"
                  backgroundColor="gray.200"
                  borderRadius="lg"
                  height="20%"
                  alignItems="center"
                  px="2"
                  color="gray.900"
                >
                  {item[1].count}
                </Box>
              </Box>
            ))}
          </Center> */}
        </>
      )}
    </Stack>
  );
};

export default VoteCards;
