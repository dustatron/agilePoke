import { useRouter } from "next/router";
import PokerGame from "../components/PokerGame";
import { create } from "zustand";
import { useGetRoom } from "../hooks";
import PokerBoardLoad from "../components/PokerBoardLoad/PokerBoardLoad";
import { createBrowserClient } from "../utils/pocketbase";
import { useCallback, useEffect, useState } from "react";
import { PokerRoomResponse, PokerUserRecord } from "pocketTypes";
import useGetUserListByRoom from "../hooks/useGetUserListByRoom";
import CreateRoom from "../components/CreateRoom";

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
  const [userListSub, setUserListSub] = useState<PokerUserRecord[]>();
  const [isSubbed, setIsSubbed] = useState(false);

  const { id: roomIdUrl } = router.query;
  const {
    data: roomDataCall,
    isLoading,
    refetch,
  } = useGetRoom({ roomId: roomIdUrl });

  // Setup subscriptions
  const subToRoom = useCallback((id: string) => {
    const pb = createBrowserClient();

    // Sub user list
    pb.collection("pokerUser").subscribe("*", (e) => {
      if (e.action === "update" || e.action === "create") {
        pb.collection("pokerUser")
          .getList(1, 10, {
            filter: `pokerRoom.id="${id}"`,
            sort: "-name",
          })
          .then((userList) => setUserListSub(userList.items));
      }
    });

    // sub room record
    return pb.collection("pokerRoom").subscribe(id, (e) => {
      if (e.action === "update" || e.action === "create") {
        pb.collection("pokerRoom")
          .getOne(e.record.id, { expand: "users" })
          .then((res) => console.log("subRoom data", res));

        return setRoomDataSub(e.record);
      }
      return undefined;
    });
  }, []);

  // Sub to room
  useEffect(() => {
    if (roomDataCall?.id && !roomDataSub) {
      if (!isSubbed) {
        setIsSubbed(true);
        subToRoom(roomDataCall.id);
      }
      setRoomDataSub(roomDataCall);

      if (roomDataCall.expand) {
        // @ts-ignore
        setUserListSub(roomDataCall.expand.users);
      }
    }
  }, [roomDataCall?.id]);

  const hasRoomData = !!roomDataSub;
  console.log("RoomDataCall", roomDataCall);
  console.log("roomDataSub", roomDataSub);

  if (isLoading) {
    return <PokerBoardLoad />;
  }
  if (!hasRoomData) {
    return <CreateRoom refetch={refetch} />;
  }
  if (hasRoomData) {
    return (
      <PokerGame
        roomId={roomDataSub.id}
        roomRecord={roomDataSub}
        localVotersList={userListSub || []}
      />
    );
  }

  return <div>Error</div>;
};

export default Poker;
