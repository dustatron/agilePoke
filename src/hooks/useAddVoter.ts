import {
  DocumentReference,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore"

import { UserData } from "../utils/types"
import { v4 } from "uuid"

const useAddVoter = () => {
  const firebaseApp = getFirestore()

  const addNewVoter = async (userName: string, roomId: string) => {
    const userId = v4()
    const newVoter: UserData = {
      id: userId,
      name: userName,
      vote: 0,
    }
    try {
      await setDoc(doc(firebaseApp, `rooms/${roomId}/votes`, userId), newVoter)
      return newVoter
    } catch (e) {
      console.error("Error adding vote: ", e)
    }
  }

  const addVoterByUserData = async (userData: UserData, roomId: string) => {
    try {
      await setDoc(
        doc(firebaseApp, `rooms/${roomId}/votes`, userData.id),
        userData
      )
    } catch (e) {
      console.error("Error adding vote: ", e)
    }
  }

  return { addNewVoter, addVoterByUserData }
}

export default useAddVoter
