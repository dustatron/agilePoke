import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { useQuery } from "react-query";
import { firestoreDB } from "../utils/firebase";
import { Room } from "../utils/types";

type Props = { roomId?: string | string[] };

function useGetRoom({ roomId }: Props) {
  const fetcher = async () => {
    if (typeof roomId === "string") {
      const docRef = doc(firestoreDB, "rooms", roomId);
      const docSnap = await getDoc(docRef);
      if (docSnap.data()) {
        const results = { ...docSnap.data(), id: docSnap.id } as Room;
        return results;
      }
      return null;
    }
  };
  return useQuery(["room", roomId], fetcher, { enabled: true });
}

export default useGetRoom;
