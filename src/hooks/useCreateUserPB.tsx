import { useMutation } from "react-query";
import { createBrowserClient } from "../utils/pocketbase";
import useLocalStorage from "./useLocalStorage";
import { PokerUserRecord } from "pocketTypes";
import { LocalStorageKeys } from "../utils/types";

type Props = { userName?: string; pokerRoom: string };

function useCreateUserPB({ userName, pokerRoom }: Props) {
  const pb = createBrowserClient();
  const [_, setLocalUserData] = useLocalStorage<PokerUserRecord>(
    LocalStorageKeys.User,
    null
  );

  const fetcher = async ({ userName, pokerRoom }: Props) => {
    const roomData = await pb.collection("pokerRoom").getOne(pokerRoom);
    const data = {
      name: userName,
      pokerRoom,
    };
    const record = await pb.collection("pokerUser").create(data);
    setLocalUserData(record);
    await pb
      .collection("pokerRoom")
      .update(pokerRoom, { users: [...roomData.users, `${record.id}`] });

    return record;
  };
  return useMutation(["thisUser", userName, pokerRoom], fetcher);
}

export default useCreateUserPB;
