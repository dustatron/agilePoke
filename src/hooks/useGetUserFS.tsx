import { useQuery } from "react-query";

import { createBrowserClient } from "../utils/pocketbase";

type Props = { userId?: string };

function useGetUserFS({ userId }: Props) {
  const pb = createBrowserClient();

  const fetcher = async () => {
    const room = await pb
      .collection("pokerUser")
      .getFirstListItem(`id="${userId}"`);
    return room;
  };
  return useQuery(["user", userId], fetcher, { enabled: !userId });
}

export default useGetUserFS;
