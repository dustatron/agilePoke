import PokerBoard from "../../components/PokerBoard"
import React from "react"
import { useRouter } from "next/router"
type Props = {
  params: string
}

const Poker = () => {
  const router = useRouter()
  const { query } = router
  return (
    <div>
      <PokerBoard roomName={query.id as string} />
    </div>
  )
}

export default Poker
