import { Box, Button, Stack, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { Room, UserData } from "../../utils/types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

type ToolBarProps = {
  roomData: Room;
  handleShow: () => void;
  handleResetAllVotes: () => void;
  playersList?: UserData[];
};

const ToolBar = ({
  roomData,
  handleShow,
  handleResetAllVotes,
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
        </Box>
      )}
      <Stack
        direction="row"
        paddingTop="20px"
        justifyContent="center"
        spacing="20"
      >
        <Button
          colorScheme={roomData.isVoting ? "green" : "blue"}
          padding="5px 30px"
          onClick={handleShow}
          variant="outline"
        >
          <Icon
            as={roomData.isVoting ? AiOutlineEye : AiOutlineEyeInvisible}
            marginRight={2}
          />
          {roomData.isVoting ? "Show" : "Hide"}
        </Button>
        <Button
          onClick={handleResetAllVotes}
          padding="3"
          variant="outline"
          colorScheme="red"
        >
          Reset Vote
          <Icon as={GrPowerReset} marginLeft={2} />
        </Button>
      </Stack>
    </>
  );
};

export default ToolBar;
