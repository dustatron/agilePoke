import { Box, Container, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Room, UserData } from "../../utils/types";
import { useAddVoter, useResetAllVotes } from "../../hooks";

import Card from "../Card";
import SettingsMenu from "../SettingsMenu";
import User from "../User";
import ToolBar from "../ToolBar";

type Props = {
  roomData: Room;
  roomId: string;
  voteData: UserData[];
  votesLoading: boolean;
  currentUser: UserData;
};

const PokerBoard = ({
  roomData,
  roomId,
  voteData,
  votesLoading,
  currentUser,
}: Props) => {
  const isBrowser = typeof window !== "undefined";

  const { addNewVoter, addVoterByUserData } = useAddVoter();
  const resetAllVotes = useResetAllVotes(voteData, roomId);

  const options = [1, 2, 3, 5, 8, 13, 21, 34, 55, 99];

  const handleUpdateVote = (vote: number) => {
    // if (currentUser) {
    //   setCurrentUser({ ...currentUser!, vote });
    //   // updateVote(currentUser, { vote });
    // }
  };

  const handleShow = () => {
    // updateRoomData({
    //   isVoting: !roomData.isVoting,
    // });
  };

  const handleResetAllVotes = () => {
    resetAllVotes();
    // updateRoomData({
    //   isVoting: true,
    // });
  };

  // Set currentUser from localStorage
  // useEffect(() => {
  //   if (isBrowser) {
  //     const fromLocalStorage = window.localStorage.getItem("agile-poker");
  //     setCurrentUser(fromLocalStorage && JSON.parse(fromLocalStorage));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
                voteData?.map((user) => (
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

          {currentUser && <SettingsMenu roomId={roomId} voteData={voteData} />}
        </>
      )}
    </Container>
  );
};

export default PokerBoard;
