import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useAddUser from "../../hooks/useAddUser";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useAlertStore } from "../../pages/[id]";
import { firestoreDB } from "../../utils/firebase";
import { LocalStorageKeys, Room, UserData } from "../../utils/types";
import BasicForm from "../BasicForm";
import PokerBoard from "../PokerBoard";

type Props = { roomId: string };

function PokerGame({ roomId }: Props) {
  const [currentUser, setCurrentUser] = useLocalStorage(
    LocalStorageKeys.User,
    "initial"
  );
  const [isShowGetUser, setIsShowGetUser] = useAlertStore((state) => [
    state.isShowingAddUser,
    state.setIsShowingAddUser,
  ]);

  const [roomData, setRoomData] = useState<Room>();
  const [votersList, setVotersList] = useState<UserData[]>();

  const { mutate: addUser, isLoading: isAddUserLoading } = useAddUser({
    roomId,
    setUser: (user) => setCurrentUser(user),
    userId: currentUser?.id,
    onSettled: () => {
      setIsShowGetUser(false);
    },
  });

  useEffect(() => {
    const isCurrentUserInRoom = !!votersList?.find(
      (voter) => voter.id === currentUser?.id
    );
    if (!isCurrentUserInRoom && !isShowGetUser) {
      addUser(currentUser.name);
    }
  }, [addUser, currentUser?.id, currentUser.name, isShowGetUser, votersList]);

  useEffect(() => {
    if (!currentUser) {
      setIsShowGetUser(true);
    }
  }, [currentUser, setIsShowGetUser]);

  useEffect(() => {
    const roomRef = doc(firestoreDB, "rooms", roomId as string);
    const playersRef = collection(firestoreDB, `rooms/${roomId}/votes`);

    const unSubRooms = onSnapshot(roomRef, (doc) => {
      setRoomData({ ...(doc.data() as Room) });
    });

    const unSubPlayers = onSnapshot(playersRef, (querySnapshot) => {
      let tempPlayersList: UserData[] = [];
      querySnapshot.forEach((player) => {
        tempPlayersList.push({
          ...player.data(),
          id: player.id,
        } as UserData);
      });
      setVotersList(tempPlayersList);
    });
    return () => {
      unSubRooms();
      unSubPlayers();
    };
    //Should only run on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUser = (name: string) => {
    console.log("add user");
    addUser(name);
  };

  return (
    <div>
      {isShowGetUser && (
        <Box padding="2">
          <Text as="h2" textAlign="center" fontSize="xl" fontWeight="bold">
            Username to show on the board
          </Text>
          <BasicForm
            title="Enter Name"
            placeholder="Name"
            buttonCopy="Go"
            isLoading={isAddUserLoading}
            onSubmit={(name: string) => handleAddUser(name)}
          />
        </Box>
      )}
      {roomData && currentUser && !isShowGetUser && (
        <>
          <Heading
            textAlign="center"
            marginBottom={2}
            textTransform="capitalize"
          >
            {roomData.name.toLowerCase()} Room
          </Heading>
          <PokerBoard
            roomId={roomId}
            roomData={roomData as Room}
            voteData={votersList as UserData[]}
            currentUser={currentUser}
          />
        </>
      )}
    </div>
  );
}

export default PokerGame;
