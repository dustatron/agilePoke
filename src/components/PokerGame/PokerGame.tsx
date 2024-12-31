import { Box, Center, Heading, SlideFade, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAlertStore } from "../../pages/[id]";
import { LocalStorageKeys, Room } from "../../utils/types";
import PokerBoard from "../PokerBoard";
import { PokerRoomRecord, PokerUserRecord } from "pocketTypes";
import useAddUserToRoomPB from "../../hooks/useAddUserToRoomPB";
import CreateUser from "../CreateUser";
import useGetUser from "../../hooks/useGetUser";
import useCreateUserPB from "../../hooks/useCreateUserPB";

type Props = {
  roomId: string;
  roomRecord: PokerRoomRecord;
  localVotersList: PokerUserRecord[];
};

function PokerGame({ roomId, roomRecord, localVotersList }: Props) {
  const [localUserData, setLocalUserData] = useLocalStorage<PokerUserRecord>(
    LocalStorageKeys.User,
    null
  );
  const [isShowingGetUser, setIsShowingGetUser] = useAlertStore((state) => [
    state.isShowingAddUser,
    state.setIsShowingAddUser,
  ]);

  const { data: userData, status: getUserState } = useGetUser({
    userId: localUserData?.id,
  });

  // Update user room
  const { mutate: addUserToRoom } = useAddUserToRoomPB({
    userId: localUserData?.id,
    pokerRoomId: roomRecord?.id,
  });

  // create User
  const { mutate: createUser } = useCreateUserPB({
    userName: localUserData?.name,
    pokerRoom: roomId,
  });

  // handle User data setup on server
  useEffect(() => {
    if (localUserData?.id && getUserState === "success" && !userData?.id) {
      createUser({
        userName: localUserData.name,
        pokerRoom: roomId,
      });
    }
  }, [
    createUser,
    getUserState,
    localUserData?.id,
    localUserData?.name,
    roomId,
    userData,
  ]);

  // Check user state
  useEffect(() => {
    if (!localUserData) {
      setIsShowingGetUser(true);
    }
  }, [localUserData, setIsShowingGetUser]);

  // Add user to room
  useEffect(() => {
    const hasUserData = !!localUserData?.id;
    const isCurrentUserInRoom =
      (Array.isArray(localVotersList) &&
        localUserData &&
        localVotersList.filter((user) => user.id === localUserData.id)
          .length) ||
      false;

    if (!isCurrentUserInRoom && hasUserData) {
      addUserToRoom({
        userId: localUserData.id,
        pokerRoomId: roomRecord.id,
        userName: localUserData?.name,
      });
      setTimeout(() => {
        // refetchUserList();
      }, 300);
    }
  }, [
    addUserToRoom,
    localUserData,
    localVotersList,
    roomRecord,
    isShowingGetUser,
  ]);

  return (
    <Box p="0">
      {isShowingGetUser && (
        <CreateUser roomId={roomId} setIsShowing={setIsShowingGetUser} />
      )}
      {roomRecord && localVotersList && !isShowingGetUser && (
        <SlideFade in={!isShowingGetUser} offsetY="50px">
          <Center>
            <Stack
              justifyContent="center"
              alignItems="center"
              backgroundColor="blackAlpha.900"
              p="4"
              w={{ sm: "100%", md: "100%", lg: "75%" }}
              rounded="md"
              spacing="0"
            >
              <Heading
                textAlign="center"
                marginBottom={2}
                textTransform="capitalize"
                background="whiteAlpha.200"
                color="white"
                width="98%"
                p="2"
                mb="1"
                rounded="md"
              >
                {roomRecord.name?.toLowerCase()} Room
              </Heading>
              <PokerBoard
                roomId={roomId}
                roomData={roomRecord as Room}
                voteData={localVotersList}
                currentUser={localUserData}
              />
            </Stack>
          </Center>
        </SlideFade>
      )}
    </Box>
  );
}

export default PokerGame;
