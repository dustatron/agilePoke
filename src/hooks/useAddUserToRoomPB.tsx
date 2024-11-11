import { useMutation } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";

type Props = { pokerRoomId: string; userId: string };

export default function useAddUserToRoomPB({ pokerRoomId, userId }: Props) {
  const pb = createBrowserClient();

  const fetcher = async ({ pokerRoomId, userId }: Props) => {
    const data = {
      pokerRoom: pokerRoomId,
    };
    const record = await pb.collection("pokerUser").update(userId, data);

    await pb
      .collection("pokerRoom")
      .update(pokerRoomId, { users: [`${record.id}`] });

    return data;
  };
  return useMutation(["updateUserRoom", pokerRoomId, userId], fetcher);
}
