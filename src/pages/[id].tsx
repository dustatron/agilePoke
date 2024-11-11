import { useRouter } from "next/router";
import PokerGame from "../components/PokerGame";
import { create } from "zustand";
import useMakeRoom from "../hooks/useMakeRoom";
import { useGetRoom } from "../hooks";
import { Button, Center, Stack, Text, Box } from "@chakra-ui/react";
import PokerBoardLoad from "../components/PokerBoardLoad/PokerBoardLoad";
import { createBrowserClient } from "../utils/pocketbase";
import { useCallback, useEffect, useState } from "react";
import { PokerRoomResponse, PokerUserRecord } from "pocketTypes";
import useGetUserListByRoom from "../hooks/useGetUserListByRoom";

type State = {
  isShowingAddUser: boolean;
};
type Action = {
  setIsShowingAddUser: (isShowing: boolean) => void;
};
export const useAlertStore = create<State & Action>((set) => ({
  isShowingAddUser: false,
  setIsShowingAddUser: (isShowing: boolean) =>
    set({ isShowingAddUser: isShowing }),
}));

const Poker = () => {
  const router = useRouter();
  const [roomDataSub, setRoomDataSub] = useState<PokerRoomResponse>();
  const [usersDataSub, setUsersDataSub] = useState<PokerUserRecord[]>();
  const { data: userList, error: userListError } = useGetUserListByRoom({
    roomName: roomDataSub?.id,
  });
  const { id: roomIdUrl } = router.query;
  const { mutate: addRoom } = useMakeRoom({ roomId: roomDataSub?.id || "" });
  const {
    data: roomDataCall,
    isLoading,
    error: roomDataError,
    refetch,
  } = useGetRoom({ roomId: roomIdUrl });

  console.log("userList", usersDataSub);
  console.log("roomDataCall", roomDataCall);

  useEffect(() => {
    if (
      !userListError &&
      !!userList?.items?.length &&
      userList.items.length > 0
    ) {
      setUsersDataSub(userList.items);
    }
  }, [userList]);

  const subToRoom = (id: string) => {
    const pb = createBrowserClient();

    // Sub user list
    pb.collection("pokerUser").subscribe("*", (e) => {
      if (e.action === "update" || e.action === "create") {
        pb.collection("pokerUser")
          .getList(1, 10, {
            filter: `pokerRoom.id="${id}"`,
            sort: "-name",
          })
          .then((userList) => setUsersDataSub(userList.items));
      }
    });

    return pb.collection("pokerRoom").subscribe(id, (e) => {
      if (e.action === "update" || e.action === "create") {
        pb.collection("pokerRoom")
          .getOne(e.record.id, { expand: "users" })
          .then((res) => console.log("res", res));

        return setRoomDataSub(e.record);
      }
      return undefined;
    });
  };
  console.log("roomDataSub", roomDataSub);

  useEffect(() => {
    if (roomDataCall?.id && !roomDataSub) {
      subToRoom(roomDataCall.id);
      setRoomDataSub(roomDataCall);
    }
  }, [roomDataCall?.id]);

  if (isLoading) {
    return <PokerBoardLoad />;
  }
  if (roomDataSub?.id && !roomDataError) {
    return (
      <>
        <PokerGame
          roomId={roomDataSub.id}
          roomData={roomDataSub}
          localVotersList={usersDataSub || []}
        />
      </>
    );
  }
  if (!roomDataSub && roomDataError) {
    return (
      <Center>
        <Stack>
          <Box>
            <Text as="h2" textAlign="center" fontSize="xl" fontWeight="light">
              No Room Data
            </Text>
          </Box>
          <Box>
            <Text align="center">
              The room{" "}
              <Text
                fontWeight="black"
                display="inline"
                textTransform="capitalize"
              >
                {roomIdUrl}
              </Text>{" "}
              does not exist. would you like to created it?
            </Text>

            <Stack p="5">
              <Button
                onClick={() => {
                  addRoom(roomIdUrl as string);
                  refetch();
                }}
                colorScheme="green"
              >
                Make Room
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Center>
    );
  }
  return <div>Error</div>;
};

export default Poker;
