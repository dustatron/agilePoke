import {
  Button,
  Flex,
  Icon,
  Stack,
  Wrap,
  WrapItem,
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { LocalStorageKeys, Room } from "../../utils/types";
import {
  useLocalStorage,
  useResetAllVotes,
  useUpdateVoteStatus,
} from "../../hooks";
import Card from "../Card";
import ToolBar from "../ToolBar";
import useUpdateVote from "../../hooks/useUpdateVote";
import { useHotkeys } from "react-hotkeys-hook";
import { OPTIONS } from "../../utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import VoteCards from "../VoteCards";
import { PokerUserRecord } from "pocketTypes";

type Props = {
  roomData: Room;
  roomId: string;
  voteData: PokerUserRecord[];
  currentUser: PokerUserRecord;
};

const PokerBoard = ({ roomData, roomId, voteData, currentUser }: Props) => {
  const [localUserData] = useLocalStorage<PokerUserRecord>(
    LocalStorageKeys.User,
    null
  );
  useHotkeys("shift+1", () => handleUpdateVote(1));
  useHotkeys("shift+2", () => handleUpdateVote(2));
  useHotkeys("shift+3", () => handleUpdateVote(3));
  useHotkeys("shift+5", () => handleUpdateVote(5));
  useHotkeys("shift+8", () => handleUpdateVote(8));
  useHotkeys("shift+s", () => handleShow());
  useHotkeys("esc", () => handleResetAllVotes());

  const resetAllVotes = useResetAllVotes();
  const { mutate: updateUserVote } = useUpdateVote();

  const handleUpdateVote = (vote: number) => {
    updateUserVote({ userId: localUserData.id, vote });
  };

  const { mutate: updateVoteStatus } = useUpdateVoteStatus();

  const handleShow = () => {
    updateVoteStatus({
      roomId: roomData?.id || "",
      isVoting: !roomData.isVoting,
    });
  };

  const handleResetAllVotes = () => {
    resetAllVotes(voteData, roomData?.id || "");
  };

  return (
    <Box
      bg="white"
      w="100%"
      border="1px"
      borderColor="#d4d4d4"
      padding="5"
      borderRadius="md"
      boxShadow="xl"
      backgroundColor={roomData.isVoting ? "gray.50" : "#fafafa"}
    >
      {voteData && (
        <>
          <ToolBar
            roomData={roomData}
            roomId={roomId}
            voteData={voteData}
            currentUser={currentUser}
          />
          <Flex
            minH="43vh"
            w="100%"
            justifyContent="space-between"
            direction="column"
            alignContent="space-between"
            padding="5"
          >
            <VoteCards
              currentUser={currentUser}
              roomData={roomData}
              voteData={voteData}
            />
          </Flex>
          {/* \\\\\\\\\ Voting Card /////////   */}
          <Wrap direction="row" spacing="10px" justify="center">
            {OPTIONS.map((num) => (
              <WrapItem key={num}>
                <Card number={num} select={handleUpdateVote} />
              </WrapItem>
            ))}
          </Wrap>
          <Stack direction="row" p="5" justifyContent="space-between">
            <Button
              onClick={handleResetAllVotes}
              padding="3"
              variant="outline"
              colorScheme="red"
            >
              <Text>{"Reset"}</Text>
              <Icon as={GrPowerReset} marginLeft={2} color="red.300" />
            </Button>
            <Button
              colorScheme={roomData.isVoting ? "green" : "blue"}
              padding="5px 30px"
              onClick={handleShow}
            >
              <Icon
                as={roomData.isVoting ? AiOutlineEye : AiOutlineEyeInvisible}
                marginRight={2}
              />
              {roomData.isVoting ? "Show" : "Hide"}
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default PokerBoard;
