import { Box, Container, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Room, UserData } from "../../utils/types";
import {
  useAddVoter,
  useResetAllVotes,
  useUpdateVoteStatus,
} from "../../hooks";

import Card from "../Card";
import SettingsMenu from "../SettingsMenu";
import User from "../User";
import ToolBar from "../ToolBar";
import useUpdateVote from "../../hooks/useUpdateVote";

type Props = {
  roomData: Room;
  roomId: string;
  voteData: UserData[];
  currentUser: UserData;
};

const PokerBoard = ({ roomData, roomId, voteData, currentUser }: Props) => {
  const isBrowser = typeof window !== "undefined";

  const resetAllVotes = useResetAllVotes(voteData, roomId);

  const options = [1, 2, 3, 5, 8, 13, 21, 34, 55, 99];
  const { mutate: updateUserVote } = useUpdateVote();

  const handleUpdateVote = (vote: number) => {
    updateUserVote({ roomId, userId: currentUser.id, vote });
  };

  const { mutate: updateVoteStatus } = useUpdateVoteStatus();

  const handleShow = () => {
    updateVoteStatus({ roomId, isVoting: !roomData.isVoting });
  };

  const handleResetAllVotes = () => {
    resetAllVotes();
    updateVoteStatus({ roomId, isVoting: true });
  };

  return (
    <Container
      size="2xl"
      maxW={["2xl", "4xl"]}
      bg="white"
      border="1px"
      borderColor="#d4d4d4"
      padding="5"
      borderRadius="xl"
      boxShadow="xl"
      backgroundColor={roomData.isVoting ? "gray.50" : "#fafafa"}
    >
      {voteData && (
        <>
          <ToolBar
            roomData={roomData}
            handleResetAllVotes={handleResetAllVotes}
            handleShow={handleShow}
          />
          <Flex
            minH="43vh"
            w="100%"
            justifyContent="space-between"
            direction="column"
            alignContent="space-between"
            padding="5"
          >
            <Wrap spacing="10px" justify="center">
              {voteData?.map((user) => (
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
          </Flex>
          <Wrap direction="row" spacing="10px" justify="center">
            {options.map((num) => (
              <WrapItem key={num}>
                <Card
                  number={num}
                  isVoting={roomData.isVoting}
                  select={handleUpdateVote}
                />
              </WrapItem>
            ))}
          </Wrap>

          {currentUser && <SettingsMenu roomId={roomId} voteData={voteData} />}
        </>
      )}
    </Container>
  );
};

export default PokerBoard;
