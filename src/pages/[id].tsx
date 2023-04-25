import { useRouter } from "next/router";
import PokerGame from "../components/PokerGame";
import { create } from "zustand";
import useMakeRoom from "../hooks/useMakeRoom";
import { useGetRoom, useLocalStorage } from "../hooks";
import { Box, Button, Container, Spinner, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import PokerBoardLoad from "../components/PokerBoardLoad/PokerBoardLoad";

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

  if (isLoading) {
    return <PokerBoardLoad />;
  }
  if (roomId && !error && data) {
    return <PokerGame roomId={roomId as string} />;
  }
  if (!data) {
    return (
      <Container>
        <Box p="5" border="1px" rounded="md">
          <Text as="h2" textAlign="center" fontSize="xl" fontWeight="light">
            No Room Data
          </Text>
          <Text align="center">
            The room{" "}
            <Text
              fontWeight="black"
              display="inline"
              textTransform="capitalize"
            >
              {roomId}
            </Text>{" "}
            does not exist. would you like to created it?
          </Text>
          <Stack p="5">
            <Button
              onClick={() => {
                addRoom(roomId as string);
                refetch();
              }}
              colorScheme="green"
            >
              Make Room
            </Button>
          </Stack>
        </Box>
      </Container>
    );
  }
  return <div>Error</div>;
};

export default Poker;
