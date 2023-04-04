import {
  doc,
  setDoc,
} from "firebase/firestore"

import { UserData } from "../utils/types"
import { v4 } from "uuid"
import { firestoreDB } from "../utils/firebase"

const useAddVoter = () => {

  const addNewVoter = async (userName: string, roomId: string) => {
    const userId = v4()
    const newVoter: UserData = {
      id: userId,
      name: userName,
      vote: 0,
    }
    try {
      await setDoc(doc(firestoreDB, `rooms/${roomId}/votes`, userId), newVoter)
      return newVoter
    } catch (e) {
      console.error("Error adding vote: ", e)
    }
  }

  const addVoterByUserData = async (userData: UserData, roomId: string) => {
    try {
      await setDoc(
        doc(firestoreDB, `rooms/${roomId}/votes`, userData.id),
        userData
      )
    } catch (e) {
      console.error("Error adding vote: ", e)
    }
  }

  return { addNewVoter, addVoterByUserData }
}

export default useAddVoter
