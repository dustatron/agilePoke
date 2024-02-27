import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Room, UserData } from "../../utils/types";

import ProgressBar from "./ProgressBar";
import HotkeysModal from "../HotkeysModal";
import SettingsMenu from "../SettingsMenu";

type ToolBarProps = {
  roomData: Room;
  isAutoReset: boolean;
  currentUser: UserData;
  roomId: string;
  voteData: UserData[];
  handleAutoReset: () => void;
  isAutoResetOn: boolean;
};

const ToolBar = ({
  roomData,
  isAutoReset,
  currentUser,
  roomId,
  voteData,
  handleAutoReset,
  isAutoResetOn,
}: ToolBarProps) => {
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
      {currentUser && (
        <SettingsMenu
          roomId={roomId}
          voteData={voteData}
          toggleAutoReset={handleAutoReset}
          isAutoResetOn={isAutoResetOn}
        />
      )}
    </Stack>
  );
};

export default ToolBar;
