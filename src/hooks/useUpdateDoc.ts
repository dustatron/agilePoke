import { DocumentReference, doc, updateDoc } from "firebase/firestore"

const useUpdateDoc = (docRef: DocumentReference<any>) => {
  return async (data: any) => {
    try {
      updateDoc(docRef, data)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }
}

export default useUpdateDoc
