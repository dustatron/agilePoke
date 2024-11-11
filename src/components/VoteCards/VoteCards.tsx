import { Stack, Wrap, WrapItem, Flex } from "@chakra-ui/react";
import React from "react";
import User from "../User";
import { Room, UserData } from "../../utils/types";
import { sortVotes } from "../../utils/sortVotes";
import { PokerUserRecord } from "pocketTypes";

type Props = {
  voteData: PokerUserRecord[];
  roomData: Room;
  currentUser: PokerUserRecord;
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
                name={user?.name || ""}
                vote={user?.currentVote || 0}
                isCurrentUser={user?.id === currentUser?.id}
                isActive={user.isActive || false}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      {!isVoting && (
        <>
          <Stack direction="row" spacing="20" justify="center">
            {sorted.map((item) => (
              <Flex direction="row" key={item[0]} wrap="wrap">
                {item[1].users.map((user: any) => (
                  <WrapItem key={user?.id} marginLeft="-4" my="1">
                    <User
                      isVoting={roomData.isVoting}
                      name={user?.name}
                      vote={user?.currentVote || 0}
                      isCurrentUser={user?.id === currentUser?.id}
                      isActive={user?.isActive || false}
                    />
                  </WrapItem>
                ))}
              </Flex>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default VoteCards;
