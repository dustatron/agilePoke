import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  Wrap,
  WrapItem,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Room, UserData } from "../../utils/types";
import { useAddVoter, useResetAllVotes, useUpdateDoc } from "../../hooks";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";

import BasicForm from "../BasicForm";
import Card from "../Card";
import SettingsMenu from "../SettingsMenu";
import User from "../User";
import { getFirestore } from "../../utils/firebase";

type ToolBarProps = {
  roomData: Room;
  handleShow: () => void;
  handleResetAllVotes: () => void;
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
      <Stack direction="row" paddingTop="20px" justifyContent="start">
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
        <Button onClick={handleResetAllVotes} padding="3" variant="outline">
          Reset Vote
          <Icon as={GrPowerReset} marginLeft={2} />
        </Button>
      </Stack>
    </>
  );
};

type Props = {
  roomData: Room;
  roomId: string;
  voteData: UserData[];
  votesLoading: boolean;
};

const PokerBoard = ({ roomData, roomId, voteData, votesLoading }: Props) => {
  const [currentUser, setCurrentUser] = useState<UserData>();

  const isBrowser = typeof window !== "undefined";

  const firebaseApp = getFirestore();
  const { updateRoomData, updateVote } = useUpdateDoc(firebaseApp, roomId);
  const { addNewVoter, addVoterByUserData } = useAddVoter();
  const resetAllVotes = useResetAllVotes(voteData, roomId);

  const options = [1, 2, 3, 5, 8, 13, 21, 34, 55, 99];

  const handleAddUser = async (currentUser: string) => {
    const newVoter = await addNewVoter(currentUser, roomId);
    if (newVoter) {
      setCurrentUser(newVoter);
      window.localStorage.setItem("agile-poker", JSON.stringify(newVoter));
    }
  };

  const handleUpdateVote = (vote: number) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser!, vote });
      updateVote(currentUser, { vote });
    }
  };

  const handleShow = () => {
    updateRoomData({
      isVoting: !roomData.isVoting,
    });
  };

  const handleResetAllVotes = () => {
    resetAllVotes();
    updateRoomData({
      isVoting: true,
    });
  };

  // Set currentUser from localStorage
  useEffect(() => {
    if (isBrowser) {
      const fromLocalStorage = window.localStorage.getItem("agile-poker");
      setCurrentUser(fromLocalStorage && JSON.parse(fromLocalStorage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add user to firebase if currentUser is not in voterData
  useEffect(() => {
    const isUserInVoteData = !!voteData?.find(
      (user) => user?.id === currentUser?.id
    );
    if (!isUserInVoteData && currentUser) {
      addVoterByUserData(currentUser, roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
      {!currentUser && (
        <Box padding="2">
          <Text as="h2" textAlign="center" fontSize="xl" fontWeight="bold">
            Username to show on the board
          </Text>
          <BasicForm
            title="Enter Name"
            placeholder="Name"
            buttonCopy="Go"
            onSubmit={(name: string) => handleAddUser(name)}
          />
        </Box>
      )}
      {currentUser && (
        <ToolBar
          roomData={roomData}
          handleResetAllVotes={handleResetAllVotes}
          handleShow={handleShow}
        />
      )}
      {currentUser && (
        <>
          <Flex
            minH="43vh"
            w="100%"
            justifyContent="space-between"
            direction="column"
            alignContent="space-between"
            padding="5"
          >
            <Wrap spacing="10px" justify="center">
              {votesLoading && <>...loading</>}
              {!votesLoading &&
                voteData.map((user) => (
                  <WrapItem key={user?.id}>
                    <User
                      isVoting={roomData.isVoting}
                      name={user?.name}
                      vote={user?.vote}
                      isCurrentUser={user?.id === currentUser.id}
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

          {currentUser && (
            <SettingsMenu
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              roomId={roomId}
              voteData={voteData}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default PokerBoard;
