import {
  DocumentReference,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore"

import { UserData } from "../utils/types"

const useResetAllVotes = (voteData: UserData[], roomId: string) => {
  const firebaseApp = getFirestore()

  return async () => {
    voteData.forEach((voter) => {
      const docRef = doc(firebaseApp, `rooms/${roomId}/votes`, voter.id)
      try {
        updateDoc(docRef, { vote: 0 })
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    })
  }
}

export default useResetAllVotes
