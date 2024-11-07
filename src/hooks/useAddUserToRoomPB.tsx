import { useMutation } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";

type Props = { pokerRoom: string; userId: string };

export default function useAddUserToRoomPB({ pokerRoom, userId }: Props) {
  const pb = createBrowserClient();

  const fetcher = async ({ pokerRoom, userId }: Props) => {
    const data = {
      pokerRoom,
    };
    const record = await pb.collection("pokerUser").update(userId, data);

    return data;
  };
  return useMutation(["updateUserRoom", pokerRoom, userId], fetcher);
}
