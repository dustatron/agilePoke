import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Room } from "../../utils/types";
import SettingsMenu from "../SettingsMenu";
import { PokerUserRecord } from "pocketTypes";

type ToolBarProps = {
  roomData: Room;
  currentUser: PokerUserRecord;
  roomId: string;
  voteData: PokerUserRecord[];
};

const ToolBar = ({ roomData, currentUser, roomId, voteData }: ToolBarProps) => {
  return (
    <Stack direction="row" justify="space-between">
      <Box w="5%"></Box>
      <Box w="90%">
        {roomData.isVoting && (
          <Box bg="blue.500" color="white" textAlign="center" h="100%">
            <Text as="h3" fontWeight={600} fontSize={20}>
              Pointing In Progress
            </Text>
          </Box>
        )}

        {!roomData.isVoting && (
          <Box bg="green.500" color="white" textAlign="center" h="100%">
            <Text as="h3" fontWeight={600} fontSize={20}>
              Showing
            </Text>
          </Box>
        )}
      </Box>
      {currentUser && <SettingsMenu roomId={roomId} voteData={voteData} />}
    </Stack>
  );
};

export default ToolBar;
