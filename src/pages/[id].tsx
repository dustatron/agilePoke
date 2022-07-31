import React, { useCallback, useEffect } from "react"
import { doc, setDoc } from "firebase/firestore"

import PokerBoard from "../components/PokerBoard"
import { Room } from "../utils/types"
import { getFirestore } from "../utils/firebase"
import { useDocument } from "react-firebase-hooks/firestore"
import { useRouter } from "next/router"

const Poker = () => {
  const router = useRouter()
  const { query } = router
  const firebaseApp = getFirestore()

  const [roomData, loading, error] = useDocument(
    doc(firebaseApp, "rooms", `${query.id}`)
  )

  const roomDataReal = roomData?.data()

  const makeNewRoom = async () => {
    const newRoom: Room = {
      name: query.id as string,
      isVoting: true,
      users: [],
    }
    try {
      await setDoc(doc(firebaseApp, "rooms", query.id as string), newRoom)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const makeNewRoomMemo = useCallback(() => makeNewRoom(), [query.id])

  // Create room if room data return undefined
  useEffect(() => {
    if (!roomDataReal && !loading && !error) {
      makeNewRoomMemo()
    }
  }, [error, loading, makeNewRoomMemo, roomDataReal])

  return (
    <div>
      {/* {loading && <div>...loading</div>}
      {roomDataReal && !loading && !error && (
        <PokerBoard
          roomId={query.id as string}
          roomData={roomDataReal as Room}
        />
      )} */}
    </div>
  )
}

export default Poker
