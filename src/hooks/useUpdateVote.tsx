import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useMutation } from "react-query";
import { firestoreDB } from "../utils/firebase";
import { LocalStorageKeys, UserData } from "../utils/types";
import useLocalStorage from "./useLocalStorage";
type MutateProps = {
  userId: string;
  roomId: string;
  vote: number;
};
function useUpdateVote() {
  const fetcher = async ({ roomId, userId, vote }: MutateProps) => {
    await updateDoc(doc(firestoreDB, `rooms/${roomId}/votes`, userId), {
      vote,
    });
  };
  return useMutation(["updateRoom"], fetcher);
}

export default useUpdateVote;
