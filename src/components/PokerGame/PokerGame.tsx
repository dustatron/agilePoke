import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  SlideFade,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAlertStore } from "../../pages/[id]";
import { LocalStorageKeys, Room } from "../../utils/types";
import BasicForm from "../BasicForm";
import PokerBoard from "../PokerBoard";
import { createBrowserClient } from "../../utils/pocketbase";
import { PokerRoomRecord, PokerUserRecord } from "pocketTypes";
import useCreateUserPB from "../../hooks/useCreateUserPB";
import useAddUserToRoomPB from "../../hooks/useAddUserToRoomPB";

type Props = {
  roomId: string;
  roomRecord: PokerRoomRecord;
  localVotersList: PokerUserRecord[];
};

function PokerGame({ roomId, roomRecord, localVotersList }: Props) {
  const pb = createBrowserClient();
  // const [localVotersList, setLocalVotersList] = useState<PokerUserRecord[]>();
  const [currentUser, setCurrentUser] = useLocalStorage<PokerUserRecord>(
    LocalStorageKeys.User,
    null
  );
  const [isShowGetUser, setIsShowGetUser] = useAlertStore((state) => [
    state.isShowingAddUser,
    state.setIsShowingAddUser,
  ]);

  // Update user room
  const { mutate: addRoomToUser } = useAddUserToRoomPB({
    userId: currentUser?.id,
    pokerRoomId: roomRecord?.id,
  });

  // create User
  const {
    mutate: createUser,
    data: thisUser,
    status: creatingUserStatus,
  } = useCreateUserPB({
    userName: currentUser?.name,
    pokerRoom: roomRecord?.id,
  });

  // Get User name
  useEffect(() => {
    if (!currentUser) {
      setIsShowGetUser(true);
    }
  }, [currentUser, setIsShowGetUser]);

  // on user creation
  useEffect(() => {
    if (thisUser?.id) {
      setCurrentUser(thisUser);
      setIsShowGetUser(false);
    }
  }, [thisUser]);

  // Add user to room
  useEffect(() => {
    const hasUserData = !!currentUser?.id;

    const isCurrentUserInRoom =
      (Array.isArray(localVotersList) &&
        currentUser &&
        localVotersList.filter((user) => user.id === currentUser.id).length) ||
      false;

    if (!isCurrentUserInRoom && hasUserData) {
      console.log("addUser");
      addRoomToUser({
        userId: currentUser.id,
        pokerRoomId: roomRecord.id,
        userName: currentUser?.name,
      });
      setTimeout(() => {
        // refetchUserList();
      }, 300);
    }
  }, [currentUser, localVotersList, roomRecord]);

  useEffect(() => {
    pb.collection("pokerUser");
    if (currentUser?.id) {
      pb.collection("pokerUser")
        .getOne(currentUser.id)
        .then((user) => {
          console.log("user issue", user);
        })
        .catch((error) => {
          // TODO: NEED TO HANDLE THIS
          console.error("No User", error);
        });
    }

    //Should only run on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUser = (name: string) => {
    if (name) {
      createUser({ userName: name, pokerRoom: roomRecord?.id });
    }
  };

  return (
    <Box p="0">
      {isShowGetUser && (
        <SlideFade in={isShowGetUser} offsetY="100px">
          <Container padding="2">
            <Text as="h2" textAlign="center" fontSize="xl" fontWeight="light">
              Provide your name
            </Text>
            <BasicForm
              title="Display name"
              placeholder="Name"
              buttonCopy="Go"
              isLoading={creatingUserStatus === "loading"}
              onSubmit={(name: string) => handleAddUser(name)}
            />
          </Container>
        </SlideFade>
      )}
      {roomRecord && localVotersList && currentUser && !isShowGetUser && (
        <SlideFade in={!isShowGetUser} offsetY="50px">
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
                currentUser={currentUser}
              />
            </Stack>
          </Center>
        </SlideFade>
      )}
    </Box>
  );
}

export default PokerGame;
