import { DocumentReference, doc, updateDoc } from "firebase/firestore"

import { UserData } from "../utils/types"

const useUpdateDoc = (firebaseApp: any, roomId: string) => {
  const updateRoomData = async (data: any) => {
    const thisDocRef = doc(firebaseApp, "rooms", roomId)
    try {
      updateDoc(thisDocRef, data)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  const updateVote = async (currentUser: UserData, vote: { vote: number }) => {
    const thisUser = doc(
      firebaseApp,
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
