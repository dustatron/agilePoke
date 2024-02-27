import { doc, updateDoc } from "firebase/firestore";
import { firestoreDB } from "../utils/firebase";

import { UserData } from "../utils/types";

const useResetAllVotes = (voteData: UserData[], roomId: string) => {
  return async () => {
    voteData.forEach((voter) => {
      const docRef = doc(firestoreDB, `rooms/${roomId}/votes`, voter.id);
      try {
        updateDoc(docRef, { vote: null });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    });
  };
};

export default useResetAllVotes;
