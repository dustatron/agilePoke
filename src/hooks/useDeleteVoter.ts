import { deleteDoc, doc } from "firebase/firestore"
import { firestoreDB } from "../utils/firebase"

import { UserData } from "../utils/types"

const useDeleteVoters = (roomId: string) => {


  const deleteCurrentUser = async (voter: UserData) => {
    try {
      await deleteDoc(doc(firestoreDB, `rooms/${roomId}/votes`, voter.id))
    } catch (e) {
      console.error("Error removing currentUser", e)
    }
  }
  const deleteAllVoters = (voteData: UserData[]) => {
    voteData.forEach((voter) => {
      const docRef = doc(firestoreDB, `rooms/${roomId}/votes`, voter.id)
      try {
        deleteDoc(docRef)
      } catch (e) {
        console.error("Error adding document: ", e)
      }
    })
  }
  return { deleteCurrentUser, deleteAllVoters }
}

export default useDeleteVoters
