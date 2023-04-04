import { Box, Heading, Text } from "@chakra-ui/react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useAddUser from "../../hooks/useAddUser";
import useLocalStorage from "../../hooks/useLocalStorage";
import useMakeRoom from "../../hooks/useMakeRoom";
import { useAlertStore } from "../../pages/[id]";
import { firestoreDB } from "../../utils/firebase";
import { Room, UserData } from "../../utils/types";
import BasicForm from "../BasicForm";
import PokerBoard from "../PokerBoard";

type Props = { roomId: string };

function PokerGame({ roomId }: Props) {
  const [currentUser] = useLocalStorage("mcPoker-user-name", {});
  const [isShowGetUser, setIsShowGetUser] = useAlertStore((state) => [
    state.isShowingAddUser,
    state.setIsShowingAddUser,
  ]);

  const [roomData, setRoomData] = useState<Room>();
  const [playersList, setPlayersList] = useState<UserData[]>();

  console.log("roomData", roomData);
  console.log("playersList", playersList);

  const { mutate: addUser } = useAddUser({ roomId });

  useEffect(() => {
    if (currentUser.name) {
      setIsShowGetUser(false);
    }
  }, [currentUser]);

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
      setPlayersList(tempPlayersList);
    });
    return () => {
      unSubRooms();
      unSubPlayers();
    };
    //Should only run on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUser = (name: string) => {
    console.log("click");
    addUser(name);
    setIsShowGetUser(false);
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
            onSubmit={(name: string) => handleAddUser(name)}
          />
        </Box>
      )}
      {roomData && !isShowGetUser && (
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
            voteData={playersList as UserData[]}
            votesLoading={roomData.isVoting}
            currentUser={currentUser}
          />
        </>
      )}
    </div>
  );
}

export default PokerGame;
