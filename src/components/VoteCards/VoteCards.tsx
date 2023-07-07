import { Box, Center, Stack, Wrap, WrapItem, Text } from "@chakra-ui/react";
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
            {sorted.map((item) => (
              <Stack direction="row" key={item[0]} spacing={0}>
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
          <Center>
            <Text fontWeight="extrabold" fontSize="xl" display="inline" ml="4">
              Stats:{" "}
            </Text>
            {sorted.map((item) => (
              <Box key={item[0]} p="1">
                <Text fontWeight="extrabold" fontSize="xl" display="inline">
                  {item[0]}
                </Text>
                <Text display="inline" fontSize="xl" fontWeight="medium">
                  [{item[1].count}]
                </Text>
              </Box>
            ))}
          </Center>
        </>
      )}
    </Stack>
  );
};

export default VoteCards;
