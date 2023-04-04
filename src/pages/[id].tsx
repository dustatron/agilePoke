import { useRouter } from "next/router";
import PokerGame from "../components/PokerGame";
import { create } from "zustand";
import useMakeRoom from "../hooks/useMakeRoom";
import { useGetRoom } from "../hooks";
import { Button, Spinner } from "@chakra-ui/react";

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
  const { id: roomId } = router.query;
  const { mutate: addRoom } = useMakeRoom({ roomId: roomId as string });
  const { data, isLoading, error, refetch } = useGetRoom({ roomId });
  console.log("data", data);

  if (isLoading) {
    return <Spinner />;
  }
  if (roomId && !error && data) {
    return <PokerGame roomId={roomId as string} />;
  }
  if (!data) {
    return (
      <div>
        No Room Data{" "}
        <Button
          onClick={() => {
            addRoom(roomId as string);
            refetch();
          }}
        >
          Make Room
        </Button>
      </div>
    );
  }
  return <div>Error</div>;
};

export default Poker;
