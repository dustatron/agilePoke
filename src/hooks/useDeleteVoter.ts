import { LocalStorageKeys, UserData } from "../utils/types";
import { PokerUserRecord } from "pocketTypes";
import { createBrowserClient } from "../utils/pocketbase";
import useLocalStorage from "./useLocalStorage";

const useDeleteVoters = (roomId: string) => {
  const [currentUser, setCurrentUser] = useLocalStorage<PokerUserRecord | null>(
    LocalStorageKeys.User,
    null
  );
  const pb = createBrowserClient();
  const deleteCurrentUser = async (voter?: PokerUserRecord) => {
    if (currentUser) {
      await pb.collection("pokerUser").delete(currentUser.id);
    } else if (voter) {
      await pb.collection("pokerUser").delete(voter.id);
    }
    setCurrentUser(null);
  };
  const deleteAllVoters = async (voteDataList: PokerUserRecord[]) => {
    const pb = createBrowserClient();
    for (let voter in voteDataList) {
      await pb.collection("pokerUser").delete(voteDataList[voter].id);
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { deleteCurrentUser, deleteAllVoters };
};

export default useDeleteVoters;
