import { doc, updateDoc } from "firebase/firestore"
import { firestoreDB } from "../utils/firebase"

import { UserData } from "../utils/types"

const useUpdateDoc = (roomId: string) => {
  const updateRoomData = async (data: any) => {
    const thisDocRef = doc(firestoreDB, "rooms", roomId)
    try {
      updateDoc(thisDocRef, data)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const updateVote = async (currentUser: UserData, vote: { vote: number }) => {
    const thisUser = doc(
      firestoreDB,
      `rooms/${roomId}/votes/${currentUser?.id}`
    )
    try {
      updateDoc(thisUser, vote)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }
  return { updateRoomData, updateVote }
}

export default useUpdateDoc
