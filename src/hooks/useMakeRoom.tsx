import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { useMutation } from "react-query";
import { v4 } from "uuid";
import { firestoreDB } from "../utils/firebase";
import { LocalStorageKeys, Room } from "../utils/types";
import useLocalStorage from "./useLocalStorage";

type Props = { roomId: string };

function useMakeRoom({ roomId }: Props) {
  const [currentUser] = useLocalStorage(LocalStorageKeys.User, {});
  const fetcher = async (name: string) => {
    const id = v4();
    const roomData: Room = {
      isVoting: false,
      name,
      id,
    };
    setDoc(doc(firestoreDB, "rooms", name), roomData).then((ref) => {
      return ref;
    });
  };
  return useMutation(["voter", roomId, currentUser], fetcher);
}

export default useMakeRoom;
