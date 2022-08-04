import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore"

import { UserData } from "../utils/types"

const useDeleteVoters = (roomId: string) => {
  const firebaseApp = getFirestore()

  const deleteCurrentUser = async (voter: UserData) => {
    try {
      await deleteDoc(doc(firebaseApp, `rooms/${roomId}/votes`, voter.id))
    } catch (e) {
      console.error("Error removing currentUser", e)
    }
  }
  const deleteAllVoters = (voteData: UserData[]) => {
    voteData.forEach((voter) => {
      const docRef = doc(firebaseApp, `rooms/${roomId}/votes`, voter.id)
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
