import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { v4 } from "uuid";
import { firestoreDB } from "../utils/firebase";
import { LocalStorageKeys, UserData } from "../utils/types";
import useLocalStorage from "./useLocalStorage";

type Props = {
  roomId: string;
  setUser: (user: UserData) => void;
  userId?: string;
  onSuccess?: () => void;
  onSettled?: () => void;
};

function useAddUser({ roomId, onSuccess, onSettled, setUser, userId }: Props) {
  const fetcher = async (name: string) => {
    const playerId = userId || v4();
    const newPlayer = {
      id: playerId,
      name: name,
      vote: null,
    } as UserData;

    await setDoc(doc(firestoreDB, `rooms/${roomId}/votes`, playerId), newPlayer)
      .then((ref) => {
        setUser(newPlayer);
        return { newPlayer, ref };
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  };
  return useMutation(["voter", roomId], fetcher, { onSuccess, onSettled });
}

export default useAddUser;
