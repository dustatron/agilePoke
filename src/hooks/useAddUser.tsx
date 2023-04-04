import { doc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";
import { v4 } from "uuid";
import { firestoreDB } from "../utils/firebase";
import { LocalStorageKeys, UserData } from "../utils/types";
import useLocalStorage from "./useLocalStorage";

type Props = {
  roomId: string;
};

function useAddUser({ roomId }: Props) {
  const [currentUser, setCurrentUser] = useLocalStorage(
    LocalStorageKeys.User,
    {}
  );
  const fetcher = async (name: string) => {
    const playerId = currentUser.id || v4();
    const newPlayer = {
      id: playerId,
      name: name || currentUser.name,
      vote: null,
    } as UserData;

    await setDoc(
      doc(firestoreDB, `rooms/${roomId}/votes`, playerId),
      newPlayer
    );
    setCurrentUser(newPlayer);
    return newPlayer;
  };
  return useMutation(["voter", roomId, currentUser], fetcher);
}

export default useAddUser;
