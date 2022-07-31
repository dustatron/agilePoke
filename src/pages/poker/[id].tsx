import PokerBoard from "../../components/PokerBoard"
import React from "react"
import { Room } from "../../utils/types"
import { doc } from "firebase/firestore"
import { getFirestore } from "../../utils/firebase"
import { useDocument } from "react-firebase-hooks/firestore"
import { useRouter } from "next/router"

const Poker = () => {
  const router = useRouter()
  const { query } = router
  const firebaseApp = getFirestore()

  const [roomData, loading, error] = useDocument(
    doc(firebaseApp, "rooms", `${query.id}`)
  )
  console.log("roomData", roomData?.data(), "loading", loading, "error", error)
  return (
    <div>
      {loading && <div>...loading</div>}
      {roomData?.data() && !loading && !error && (
        <PokerBoard
          roomId={query.id as string}
          roomData={roomData.data() as Room}
        />
      )}
    </div>
  )
}

export default Poker
