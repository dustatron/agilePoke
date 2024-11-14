import { useMutation } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";
import useLocalStorage from "./useLocalStorage";
import { PokerUserRecord } from "pocketTypes";
import { LocalStorageKeys } from "../utils/types";

type Props = { pokerRoomId: string; userId: string; userName?: string };

export default function useAddUserToRoomPB({ pokerRoomId, userId }: Props) {
  const pb = createBrowserClient();
  const [currentUser, setCurrentUser] = useLocalStorage<PokerUserRecord>(
    LocalStorageKeys.User,
    null
  );

  const fetcher = async ({ pokerRoomId, userId, userName }: Props) => {
    try {
      const userData = await pb.collection("pokerUser").getOne(userId);

      if (userData) {
        const data = {
          name: userName,
          pokerRoom: pokerRoomId,
        };
        const record = await pb.collection("pokerUser").update(userId, data);
        await pb
          .collection("pokerRoom")
          .update(pokerRoomId, { users: [`${record.id}`] });

        return record;
      }
    } catch (error) {
      console.log("user error", error);
      setCurrentUser(null);
    }
  };

  return useMutation(["updateUserRoom", pokerRoomId, userId], fetcher);
}
