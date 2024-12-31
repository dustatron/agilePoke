import { useQuery } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";

type Props = { roomId?: string | string[] };

function useGetRoom({ roomId }: Props) {
  const pb = createBrowserClient();

  const fetcher = async () => {
    const room = await pb
      .collection("pokerRoom")
      .getFirstListItem(`name="${roomId}"`, {
        expand: "users",
      });
    return room;
  };
  return useQuery(["room", roomId], fetcher, { enabled: true });
}

export default useGetRoom;
