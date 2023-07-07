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
    <>
      {roomData.isVoting && (
        <Box bg="blue.500" color="white" textAlign="center">
          <Text as="h3" fontWeight={600} fontSize={20}>
            Pointing In Progress
          </Text>
        </Box>
      )}

      {!roomData.isVoting && (
        <Box bg="green.500" color="white" textAlign="center">
          <Text as="h3" fontWeight={600} fontSize={20}>
            Showing
          </Text>
          {isAutoReset && <ProgressBar />}
        </Box>
      )}
      <Stack direction="row" paddingTop="20px" justifyContent="end">
        {currentUser && (
          <SettingsMenu
            roomId={roomId}
            voteData={voteData}
            toggleAutoReset={handleAutoReset}
            isAutoResetOn={isAutoResetOn}
          />
        )}
      </Stack>
    </>
  );
};

export default ToolBar;
