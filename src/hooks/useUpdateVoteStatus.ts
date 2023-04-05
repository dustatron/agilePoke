import { doc, updateDoc } from "firebase/firestore"
import { useMutation } from "react-query"
import { firestoreDB } from "../utils/firebase"


type MutateProps = { roomId: string, isVoting: boolean }
const useUpdateVoteStatus = () => {
  const fetcher = async ({ roomId, isVoting }: MutateProps) => {
    await updateDoc(doc(firestoreDB, `rooms`, roomId),
      { isVoting })
  }
  return useMutation(['updateRoomVoteStatus'], fetcher)
}

export default useUpdateVoteStatus
