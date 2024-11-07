import { useQuery } from "react-query";

import { createBrowserClient } from "../utils/pocketbase";
import { PokerUserRecord, PokerUserResponse } from "pocketTypes";
import { ListResult } from "pocketbase";

type Props = { roomName?: string };

function useGetUserListByRoom({ roomName }: Props) {
  const pb = createBrowserClient();

  const fetcher = async (): Promise<
    ListResult<PokerUserResponse<PokerUserRecord>>
  > => {
    return await pb.collection("pokerUser").getList(1, 10, {
      filter: `pokerRoom.name="${roomName}"`,
      sort: "-created",
    });
  };

  return useQuery(["userListByRoom", roomName], fetcher, {
    enabled: true,
  });
}

export default useGetUserListByRoom;
